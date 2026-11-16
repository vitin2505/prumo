#!/usr/bin/env node
// Instalador do Prumo. Copia skills e agentes para um diretório .claude. Sem dependências externas.
//
// Exemplos:
//   node scripts/install.mjs --list
//   node scripts/install.mjs --target ../meu-projeto --all --agents
//   node scripts/install.mjs --target ../meu-projeto --skills api-design,secure-coding
//   node scripts/install.mjs --global --category security --dry-run

import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const HELP = `Uso: node scripts/install.mjs [destino] [seleção] [opções]

Destino (um deles):
  --target <dir>      instala em <dir>/.claude (padrão: diretório atual)
  --global            instala em ~/.claude (vale para todos os projetos)

Seleção (combine à vontade):
  --all               todas as skills
  --category <a,b>    todas as skills das categorias informadas
  --skills <a,b>      skills específicas, pelo nome
  --agents            todos os agentes

Opções:
  --force             sobrescreve skills e agentes já existentes no destino
  --dry-run           mostra o que seria feito, sem copiar
  --list              lista skills e agentes disponíveis e sai
  --help              mostra esta ajuda`;

function fail(message) {
  console.error(`Erro: ${message}\n`);
  console.error(HELP);
  process.exit(1);
}

const argv = process.argv.slice(2);
const flags = new Set();
const values = {};
for (let index = 0; index < argv.length; index += 1) {
  const arg = argv[index];
  if (["--target", "--category", "--skills"].includes(arg)) {
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) fail(`${arg} exige um valor`);
    values[arg] = value;
    index += 1;
  } else if (["--global", "--all", "--agents", "--force", "--dry-run", "--list", "--help"].includes(arg)) {
    flags.add(arg);
  } else {
    fail(`argumento desconhecido: ${arg}`);
  }
}

if (flags.has("--help")) {
  console.log(HELP);
  process.exit(0);
}

const isDir = (path) => existsSync(path) && statSync(path).isDirectory();
const dirs = (path) => readdirSync(path).filter((entry) => isDir(join(path, entry))).sort();

const skills = [];
for (const category of dirs(join(ROOT, "skills"))) {
  for (const name of dirs(join(ROOT, "skills", category))) {
    skills.push({ name, category, source: join(ROOT, "skills", category, name) });
  }
}
const agents = [];
for (const kind of ["core", "specialized"]) {
  const dir = join(ROOT, "agents", kind);
  for (const file of readdirSync(dir).filter((entry) => entry.endsWith(".md")).sort()) {
    agents.push({ name: file.replace(/\.md$/, ""), kind, source: join(dir, file) });
  }
}

if (flags.has("--list")) {
  console.log("Skills:");
  for (const skill of skills) console.log(`  ${skill.category}/${skill.name}`);
  console.log("\nAgentes:");
  for (const agent of agents) console.log(`  ${agent.kind}/${agent.name}`);
  process.exit(0);
}

if (flags.has("--global") && values["--target"]) fail("use --global ou --target, não os dois");

const split = (value) => value.split(",").map((item) => item.trim()).filter(Boolean);
const selected = new Map();

if (flags.has("--all")) for (const skill of skills) selected.set(skill.name, skill);
if (values["--category"]) {
  for (const category of split(values["--category"])) {
    const matches = skills.filter((skill) => skill.category === category);
    if (matches.length === 0) fail(`categoria inexistente: ${category}`);
    for (const skill of matches) selected.set(skill.name, skill);
  }
}
if (values["--skills"]) {
  for (const name of split(values["--skills"])) {
    const skill = skills.find((item) => item.name === name);
    if (!skill) fail(`skill inexistente: ${name}`);
    selected.set(name, skill);
  }
}

const selectedAgents = flags.has("--agents") ? agents : [];
if (selected.size === 0 && selectedAgents.length === 0) {
  fail("nada selecionado; use --all, --category, --skills ou --agents");
}

const base = flags.has("--global") ? homedir() : resolve(values["--target"] ?? process.cwd());
if (!isDir(base)) fail(`diretório de destino inexistente: ${base}`);
const destination = join(base, ".claude");
const dryRun = flags.has("--dry-run");
const force = flags.has("--force");

let copied = 0;
let skipped = 0;

function install(label, source, target, directory) {
  if (existsSync(target) && !force) {
    console.log(`ignorado  ${label} (já existe; use --force para sobrescrever)`);
    skipped += 1;
    return;
  }
  if (!dryRun) {
    mkdirSync(dirname(target), { recursive: true });
    cpSync(source, target, { recursive: directory, force: true });
  }
  console.log(`${dryRun ? "copiaria " : "copiado  "} ${label}`);
  copied += 1;
}

for (const skill of selected.values()) {
  install(`skill ${skill.name}`, skill.source, join(destination, "skills", skill.name), true);
}
for (const agent of selectedAgents) {
  install(`agente ${agent.name}`, agent.source, join(destination, "agents", `${agent.name}.md`), false);
}

console.log(`\nDestino: ${destination}`);
console.log(`${dryRun ? "Seriam copiados" : "Copiados"}: ${copied} · Ignorados: ${skipped}`);
