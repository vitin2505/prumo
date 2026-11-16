# Como contribuir

Obrigado pelo interesse em melhorar o Prumo. Este guia explica o que é aceito, como preparar a contribuição e como ela é avaliada.

## O que é bem-vindo

- Correção de erro técnico, de link ou de redação.
- Melhoria de uma skill existente: passo que faltava, padrão desatualizado, exemplo mais claro.
- Novos cenários de teste em `examples/`.
- Registro de execução de cenários (nível 3 do portão de qualidade).
- Proposta de skill ou de agente novo, **precedida de uma issue**.

## O que não é aceito

- Skill que se sobrepõe a outra já existente. Amplie a existente.
- Conteúdo copiado de terceiros ou com menção a autores, produtos ou projetos alheios na identidade da skill.
- Listas genéricas de boas práticas sem fluxo executável.
- Uma skill por tecnologia sem convenções que justifiquem.
- Dependências externas nos scripts sem necessidade demonstrada.
- Resultados de teste não executados.

## Antes de começar

1. Leia a [visão de arquitetura](docs/architecture/overview.md).
2. Consulte o [catálogo](docs/catalog.md) para evitar sobreposição.
3. Para skill ou agente novo, abra uma issue descrevendo: a tarefa recorrente que resolve, o que um agente faz errado sem ela e por que não cabe em uma skill existente.

## Passo a passo

1. Faça um fork e crie um ramo: `feat/nome-da-skill`, `fix/descricao` ou `docs/descricao`.
2. Para skill nova, parta de [`templates/skill/SKILL.md`](templates/skill/SKILL.md); para agente, de [`templates/agent/AGENT.md`](templates/agent/AGENT.md).
3. Siga o [padrão de skills](docs/standards/skill-standard.md) ou o [padrão de agentes](docs/standards/agent-standard.md).
4. Valide e regenere o catálogo:

   ```bash
   node scripts/validate.mjs --write-catalog
   ```

5. Percorra o [portão de qualidade](docs/standards/quality-gate.md): revisão de conteúdo e teste por cenário.
6. Atualize o `CHANGELOG.md` na seção "Não lançado".
7. Abra o pull request.

## Commits

Padrão Conventional Commits, em português, no imperativo:

```text
feat(security): adiciona referência sobre gestão de segredos
fix(api-design): corrige código de status para conflito
docs: atualiza guia de instalação
```

| Tipo | Uso |
| --- | --- |
| `feat` | Skill, agente, referência ou capacidade nova |
| `fix` | Correção de conteúdo incorreto ou de script |
| `docs` | Documentação do repositório |
| `refactor` | Reorganização sem mudança de comportamento |
| `test` | Cenários e verificações |
| `ci`, `build`, `chore` | Automação e manutenção |

O escopo é o nome da skill, do agente ou da categoria. Remover ou renomear skill é mudança incompatível: use `!` e explique no corpo.

## Pull request

Descreva:

```markdown
## O que muda

## Por quê

## Portão de qualidade
- [ ] Nível 1: `node scripts/validate.mjs` sem erros
- [ ] Nível 2: revisão de conteúdo concluída
- [ ] Nível 3: cenários executados (liste cenário, itens atendidos e não atendidos)

## Fontes conferidas
<documentação oficial ou norma consultada para afirmações técnicas, com data>
```

Um pull request, um propósito. Pull requests pequenos são revisados mais rápido.

## Critérios de revisão

- A validação automática passa.
- O conteúdo muda o comportamento de um agente em relação ao que ele faria sozinho.
- Não há sobreposição com outra skill.
- Afirmações técnicas são verdadeiras e conferidas.
- Os cenários foram de fato executados.
- A redação é direta, em português brasileiro, com termos técnicos consagrados no original.

## Idioma

- Conteúdo em português brasileiro.
- Identificadores (nomes de skills, agentes, diretórios e arquivos) em inglês, em kebab-case.

## Licença das contribuições

Ao contribuir, você concorda que sua contribuição é licenciada sob a [Licença Apache 2.0](LICENSE), nos termos da seção 5 da licença, e declara ter o direito de submetê-la.

## Conduta

Trate as pessoas com respeito. Critique o conteúdo, não quem o escreveu. Discussões técnicas se resolvem com evidência.
