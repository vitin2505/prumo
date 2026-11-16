#!/usr/bin/env node
// Validador do repositório Prumo. Sem dependências externas.
//
// Uso:
//   node scripts/validate.mjs                  valida skills, agentes, manifestos, links e catálogo
//   node scripts/validate.mjs --write-catalog  regenera docs/catalog.md antes de validar
//
// Código de saída: 0 sem erros, 1 com erros.

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const WRITE_CATALOG = process.argv.includes("--write-catalog");

const LIMITS = {
  skillLines: 200,
  referenceLines: 300,
  nameMax: 64,
  descriptionMin: 150,
  descriptionMax: 800,
  agentDescriptionMin: 100,
};

const NAME_RE = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const SKILL_KEYS = ["name", "description"];
const AGENT_KEYS = ["name", "description", "tools", "model"];
const SKILL_SECTIONS = ["Quando usar", "Fluxo", "Evite", "Critérios de pronto"];
const RESERVED_WORDS = ["anthropic", "claude"];
const PLACEHOLDER_RE = /\b(?:TODO|TBD|FIXME)\b|lorem ipsum/;
const IGNORED_DIRS = new Set([".git", "node_modules"]);

const CATEGORY_TITLES = {
  "frontend": "Front-end",
  "backend": "Back-end",
  "security": "Segurança",
  "technical-documentation": "Documentação técnica",
  "api-integration": "APIs e integrações",
  "planning-architecture": "Planejamento e arquitetura",
  "stacks-technologies": "Stacks e tecnologias",
  "operations": "Operações e entrega",
  "ai-engineering": "Engenharia de IA",
  "productivity": "Produtividade e otimização",
  "ui-ux": "UI/UX e design",
  "software-engineering": "Engenharia de software",
};

const errors = [];
const warnings = [];
const error = (file, message) => errors.push(`${file}: ${message}`);
const warn = (file, message) => warnings.push(`${file}: ${message}`);

// ---------- utilidades ----------

const rel = (path) => relative(ROOT, path).split(sep).join("/");
const read = (path) => readFileSync(path, "utf8").replace(/\r\n/g, "\n");
const isDir = (path) => existsSync(path) && statSync(path).isDirectory();
const listDirs = (path) =>
  isDir(path) ? readdirSync(path).filter((entry) => isDir(join(path, entry))).sort() : [];
const listFiles = (path, ext) =>
  isDir(path)
    ? readdirSync(path).filter((entry) => entry.endsWith(ext) && !isDir(join(path, entry))).sort()
    : [];

function walk(dir, visit) {
  for (const entry of readdirSync(dir)) {
    if (IGNORED_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (isDir(full)) {
      visit(full, true);
      walk(full, visit);
    } else {
      visit(full, false);
    }
  }
}

function parseFrontmatter(text) {
  if (!text.startsWith("---\n")) return { problem: "frontmatter ausente (o arquivo deve começar com ---)" };
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) return { problem: "frontmatter sem linha de fechamento ---" };
  const data = {};
  for (const line of text.slice(4, end).split("\n")) {
    if (!line.trim()) continue;
    const match = /^([A-Za-z][\w-]*):\s?(.*)$/.exec(line);
    if (!match) return { problem: `linha de frontmatter inválida: "${line}"` };
    data[match[1]] = match[2].trim();
  }
  return { data, body: text.slice(end + 5) };
}

const stripFences = (text) => text.replace(/^```[\s\S]*?^```\s*$/gm, "");
const stripInlineCode = (text) => text.replace(/`[^`\n]*`/g, "");

function sections(body) {
  const result = new Map();
  let current = null;
  for (const line of stripFences(body).split("\n")) {
    const heading = /^##\s+(.+?)\s*$/.exec(line);
    if (heading) {
      current = heading[1];
      result.set(current, "");
    } else if (current !== null) {
      result.set(current, `${result.get(current)}${line}\n`);
    }
  }
  return result;
}

function identifiers(text) {
  const found = new Set();
  for (const match of text.matchAll(/`([^`\n]+)`/g)) {
    if (NAME_RE.test(match[1])) found.add(match[1]);
  }
  return found;
}

function checkLinks(file, text) {
  const clean = stripInlineCode(stripFences(text));
  const linked = new Set();
  for (const match of clean.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|#)/.test(target)) continue;
    const path = resolve(dirname(file), decodeURIComponent(target.split("#")[0]));
    if (!path.startsWith(ROOT + sep) && path !== ROOT) {
      error(rel(file), `link aponta para fora do repositório: ${target}`);
    } else if (!existsSync(path)) {
      error(rel(file), `link quebrado: ${target}`);
    } else {
      linked.add(path);
    }
  }
  return linked;
}

const firstSentence = (description) => description.split(/\s+Use (?:quando|para)\b/)[0].trim();
const cell = (text) => text.replace(/\|/g, "\\|");

// ---------- skills ----------

const skills = new Map();
const skillsRoot = join(ROOT, "skills");

for (const category of listDirs(skillsRoot)) {
  if (!CATEGORY_TITLES[category]) {
    error(`skills/${category}`, "categoria sem título em CATEGORY_TITLES (scripts/validate.mjs)");
  }
  const skillDirs = listDirs(join(skillsRoot, category));
  if (skillDirs.length === 0) error(`skills/${category}`, "categoria sem skills");

  for (const dirName of skillDirs) {
    const dir = join(skillsRoot, category, dirName);
    const file = join(dir, "SKILL.md");
    const id = rel(file);
    if (!existsSync(file)) {
      error(rel(dir), "diretório de skill sem SKILL.md");
      continue;
    }
    const text = read(file);
    const { data, body, problem } = parseFrontmatter(text);
    if (problem) {
      error(id, problem);
      continue;
    }

    for (const key of Object.keys(data)) {
      if (!SKILL_KEYS.includes(key)) error(id, `campo de frontmatter não permitido: ${key}`);
    }
    const name = data.name ?? "";
    const description = data.description ?? "";

    if (name !== dirName) error(id, `name "${name}" difere do diretório "${dirName}"`);
    if (!NAME_RE.test(name)) error(id, `name "${name}" deve estar em kebab-case minúsculo`);
    if (name.length > LIMITS.nameMax) error(id, `name excede ${LIMITS.nameMax} caracteres`);
    if (RESERVED_WORDS.some((word) => name.includes(word))) error(id, "name contém palavra reservada");
    if (skills.has(name)) error(id, `name duplicado (também em ${skills.get(name).id})`);

    if (description.length < LIMITS.descriptionMin || description.length > LIMITS.descriptionMax) {
      error(id, `description com ${description.length} caracteres (permitido: ${LIMITS.descriptionMin} a ${LIMITS.descriptionMax})`);
    }
    if (!/\bUse quando\b/.test(description)) error(id, 'description deve conter "Use quando"');
    if (/[<>]/.test(description)) error(id, "description não pode conter < ou >");

    if (!/^# \S/m.test(stripFences(body))) error(id, "falta o título de nível 1");
    const parts = sections(body);
    for (const required of SKILL_SECTIONS) {
      if (!parts.has(required)) error(id, `seção obrigatória ausente: "## ${required}"`);
      else if (!parts.get(required).trim()) error(id, `seção vazia: "## ${required}"`);
    }
    if (parts.has("Fluxo") && !/^\s*1\.\s/m.test(parts.get("Fluxo"))) {
      error(id, 'a seção "## Fluxo" deve conter passos numerados');
    }
    if (parts.has("Critérios de pronto") && !/^- \[ \] /m.test(parts.get("Critérios de pronto"))) {
      error(id, 'a seção "## Critérios de pronto" deve ser uma lista de verificação (- [ ])');
    }

    const lines = text.trimEnd().split("\n").length;
    if (lines > LIMITS.skillLines) {
      error(id, `${lines} linhas (máximo ${LIMITS.skillLines}); mova conteúdo para references/`);
    }
    if (PLACEHOLDER_RE.test(text)) error(id, "contém marcador de pendência (TODO, TBD, FIXME ou lorem ipsum)");

    const linked = checkLinks(file, text);
    const referencesDir = join(dir, "references");
    const references = listFiles(referencesDir, ".md");
    if (isDir(referencesDir) && references.length === 0) error(rel(referencesDir), "diretório references/ vazio");
    for (const reference of references) {
      const referencePath = join(referencesDir, reference);
      if (!linked.has(referencePath)) {
        error(rel(referencePath), "referência não é citada por link no SKILL.md");
      }
      const referenceLines = read(referencePath).trimEnd().split("\n").length;
      if (referenceLines > LIMITS.referenceLines) {
        error(rel(referencePath), `${referenceLines} linhas (máximo ${LIMITS.referenceLines}); divida por assunto`);
      }
    }

    skills.set(name, { id, name, category, description, references: references.length, related: parts.get("Skills relacionadas") ?? "" });
  }
}

for (const skill of skills.values()) {
  for (const token of identifiers(skill.related)) {
    if (token === skill.name) error(skill.id, "a skill cita a si mesma em Skills relacionadas");
    else if (!skills.has(token)) error(skill.id, `skill relacionada inexistente: ${token}`);
  }
}

// ---------- agentes ----------

const agents = new Map();

for (const kind of ["core", "specialized"]) {
  const dir = join(ROOT, "agents", kind);
  for (const fileName of listFiles(dir, ".md")) {
    const file = join(dir, fileName);
    const id = rel(file);
    const text = read(file);
    const { data, body, problem } = parseFrontmatter(text);
    if (problem) {
      error(id, problem);
      continue;
    }
    for (const key of Object.keys(data)) {
      if (!AGENT_KEYS.includes(key)) error(id, `campo de frontmatter não permitido: ${key}`);
    }
    const name = data.name ?? "";
    const description = data.description ?? "";
    if (name !== basename(fileName, ".md")) error(id, `name "${name}" difere do nome do arquivo`);
    if (!NAME_RE.test(name)) error(id, `name "${name}" deve estar em kebab-case minúsculo`);
    if (agents.has(name) || skills.has(name)) error(id, `name "${name}" já está em uso`);
    if (description.length < LIMITS.agentDescriptionMin) {
      error(id, `description curta demais (${description.length} caracteres)`);
    }
    if (!/\bUse (?:para|quando)\b/.test(description)) error(id, 'description deve dizer quando delegar ("Use para" ou "Use quando")');
    if (PLACEHOLDER_RE.test(text)) error(id, "contém marcador de pendência");
    checkLinks(file, text);
    agents.set(name, { id, name, kind, description, tools: data.tools ?? "todas (herdadas)", parts: sections(body) });
  }
}

const requireSection = (agent, options) => {
  const found = options.find((title) => agent.parts.has(title));
  if (!found) error(agent.id, `seção obrigatória ausente: "## ${options.join('" ou "## ')}"`);
  return found ? agent.parts.get(found) : "";
};

for (const agent of agents.values()) {
  const skillsText = requireSection(agent, ["Skills", "Seleção de skills"]);
  requireSection(agent, ["Limites", "Limites e segurança"]);
  requireSection(agent, ["Entrega", "Formato de entrega"]);

  const cited = identifiers(skillsText);
  if (cited.size === 0) error(agent.id, "o agente não declara nenhuma skill");
  for (const token of cited) {
    if (!skills.has(token)) error(agent.id, `skill inexistente citada: ${token}`);
  }

  if (agent.kind === "core") {
    for (const skill of skills.keys()) {
      if (!cited.has(skill)) error(agent.id, `skill ausente da tabela de seleção: ${skill}`);
    }
    for (const token of identifiers(agent.parts.get("Fluxos de trabalho") ?? "")) {
      if (!skills.has(token)) error(agent.id, `skill inexistente em Fluxos de trabalho: ${token}`);
    }
    const delegation = identifiers(agent.parts.get("Delegação a especialistas") ?? "");
    for (const token of delegation) {
      if (!agents.has(token)) error(agent.id, `agente inexistente em Delegação: ${token}`);
    }
    for (const other of agents.values()) {
      if (other.kind === "specialized" && !delegation.has(other.name)) {
        error(agent.id, `agente especializado ausente da tabela de delegação: ${other.name}`);
      }
    }
  }
}

if (![...agents.values()].some((agent) => agent.kind === "core")) error("agents/core", "nenhum agente principal encontrado");

for (const fileName of listFiles(join(ROOT, "docs", "workflows"), ".md")) {
  const file = join(ROOT, "docs", "workflows", fileName);
  for (const token of identifiers(stripFences(read(file)))) {
    if (!skills.has(token) && !agents.has(token)) {
      error(rel(file), `identificador que não é skill nem agente: ${token}`);
    }
  }
}

// ---------- catálogo ----------

function buildCatalog() {
  const categories = listDirs(skillsRoot);
  const out = [
    "# Catálogo",
    "",
    "> Arquivo gerado por `node scripts/validate.mjs --write-catalog`. Não edite à mão.",
    "",
    `**${skills.size} skills** em ${categories.length} categorias · **${agents.size} agentes**`,
    "",
    "## Skills",
    "",
  ];
  for (const category of categories) {
    out.push(`### ${CATEGORY_TITLES[category] ?? category}`, "", `Diretório: \`skills/${category}/\``, "");
    out.push("| Skill | O que faz | Referências |", "| --- | --- | --- |");
    for (const skill of [...skills.values()].filter((item) => item.category === category)) {
      out.push(`| [\`${skill.name}\`](../${skill.id}) | ${cell(firstSentence(skill.description))} | ${skill.references || "-"} |`);
    }
    out.push("");
  }
  out.push("## Agentes", "", "| Agente | Tipo | Papel | Ferramentas |", "| --- | --- | --- | --- |");
  for (const agent of agents.values()) {
    const kind = agent.kind === "core" ? "Principal" : "Especializado";
    out.push(`| [\`${agent.name}\`](../${agent.id}) | ${kind} | ${cell(firstSentence(agent.description))} | ${cell(agent.tools)} |`);
  }
  out.push("");
  return out.join("\n");
}

const catalogPath = join(ROOT, "docs", "catalog.md");
const catalog = buildCatalog();
if (WRITE_CATALOG) {
  writeFileSync(catalogPath, catalog, "utf8");
  console.log(`Catálogo escrito em ${rel(catalogPath)}`);
} else if (!existsSync(catalogPath)) {
  error("docs/catalog.md", "catálogo ausente; execute: node scripts/validate.mjs --write-catalog");
} else if (read(catalogPath) !== catalog) {
  error("docs/catalog.md", "catálogo desatualizado; execute: node scripts/validate.mjs --write-catalog");
}

// ---------- manifestos ----------

function readJson(path) {
  try {
    return JSON.parse(read(path));
  } catch (cause) {
    error(rel(path), `JSON inválido ou ausente: ${cause.message}`);
    return null;
  }
}

const samePath = (value) => value.replace(/^\.\//, "").replace(/\/$/, "");
const pluginPath = join(ROOT, ".claude-plugin", "plugin.json");
const plugin = readJson(pluginPath);
const marketplace = readJson(join(ROOT, ".claude-plugin", "marketplace.json"));
const pkg = readJson(join(ROOT, "package.json"));

if (plugin) {
  const id = rel(pluginPath);
  const declaredSkills = new Set((plugin.skills ?? []).map(samePath));
  const expectedSkills = new Set(listDirs(skillsRoot).map((category) => `skills/${category}`));
  for (const path of expectedSkills) if (!declaredSkills.has(path)) error(id, `categoria não declarada em "skills": ${path}`);
  for (const path of declaredSkills) if (!expectedSkills.has(path)) error(id, `caminho inexistente em "skills": ${path}`);

  const declaredAgents = new Set((plugin.agents ?? []).map(samePath));
  const expectedAgents = new Set([...agents.values()].map((agent) => agent.id));
  for (const path of expectedAgents) if (!declaredAgents.has(path)) error(id, `agente não declarado em "agents": ${path}`);
  for (const path of declaredAgents) if (!expectedAgents.has(path)) error(id, `caminho inexistente em "agents": ${path}`);

  for (const path of [...(plugin.skills ?? []), ...(plugin.agents ?? [])]) {
    if (!path.startsWith("./")) error(id, `caminho deve começar com "./": ${path}`);
  }
  if (pkg && plugin.version !== pkg.version) error(id, `version ${plugin.version} difere de package.json (${pkg.version})`);
  const changelog = join(ROOT, "CHANGELOG.md");
  if (existsSync(changelog) && !read(changelog).includes(`## [${plugin.version}]`)) {
    error("CHANGELOG.md", `falta a entrada da versão ${plugin.version}`);
  }
  const listed = marketplace?.plugins?.some((entry) => entry.name === plugin.name);
  if (marketplace && !listed) error(".claude-plugin/marketplace.json", `plugin "${plugin.name}" não listado`);
}

// ---------- repositório ----------

const markdownOutsideSkills = [];
walk(ROOT, (path, directory) => {
  if (directory) {
    if (readdirSync(path).length === 0) error(rel(path), "diretório vazio");
    return;
  }
  if (!path.endsWith(".md")) return;
  const inSkillOrAgent = /^(?:skills\/|agents\/(?:core|specialized)\/)/.test(rel(path));
  if (!inSkillOrAgent || !path.endsWith("SKILL.md")) markdownOutsideSkills.push(path);
});
for (const path of markdownOutsideSkills) {
  if (/^agents\/(?:core|specialized)\//.test(rel(path))) continue; // já verificado
  checkLinks(path, read(path));
}

for (const required of ["README.md", "LICENSE", "CONTRIBUTING.md", "CHANGELOG.md", "SECURITY.md"]) {
  if (!existsSync(join(ROOT, required))) error(required, "arquivo institucional ausente");
}

// ---------- resultado ----------

console.log(`Skills: ${skills.size} · Agentes: ${agents.size} · Categorias: ${listDirs(skillsRoot).length}`);
for (const message of warnings) console.log(`AVISO  ${message}`);
for (const message of errors) console.log(`ERRO   ${message}`);
console.log(errors.length === 0 ? "Validação concluída sem erros." : `Validação falhou: ${errors.length} erro(s).`);
process.exit(errors.length === 0 ? 0 : 1);
