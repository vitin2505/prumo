# Changelog

Todas as mudanças relevantes deste projeto são registradas aqui. O formato segue o padrão "Keep a Changelog" e o projeto adota versionamento semântico. Nomes de skills e de agentes são interface pública: removê-los ou renomeá-los é mudança incompatível.

## [Não lançado]

## [0.1.3] - 2026-11-19

Correção da principal pendência do teste por cenário. Registro em [examples/results/0.1.3.md](examples/results/0.1.3.md).

### Corrigido

- `lead-engineer`: `delivery-verification` é chamada logo depois da última edição, e o formato de entrega ganhou um portão: em tarefa que alterou arquivos, a resposta só é escrita depois dessa chamada. A skill foi carregada em 6 de 6 execuções; antes, em 0 de 43.
- `code-quality`: os testes de caracterização ficam no repositório; uma comparação em script temporário não os substitui.

### Estado da validação desta versão

| Nível do portão de qualidade | Estado |
| --- | --- |
| 1. Validação automática | Executada, sem erros |
| 2. Revisão de conteúdo | Realizada pelo autor; ainda sem revisão independente |
| 3. Teste por cenário | Cenários 04, 12, 14, 15 e 19 repetidos pelo `lead-engineer`, uma execução cada. Pendência aberta: acionamento em sessão sem agente (5 de 19 na 0.1.2) |


## [0.1.2] - 2026-11-19

Execução dos cenários 04 a 22, com as correções que ela revelou. Registro completo em [examples/results/0.1.2.md](examples/results/0.1.2.md).

### Corrigido

- `lead-engineer`: correção de defeito, mudança de regra de negócio, migração e commit deixam de poder ser tratados como alteração trivial; cada um carrega a sua skill (`debugging`, `data-modeling`, `git-workflow`). A etapa de contexto passa a incluir README e documentação do projeto.
- Agentes especializados (`code-reviewer`, `quality-engineer`, `security-auditor`, `solution-architect`, `technical-writer`): o carregamento das skills passa a ser obrigatório, e a entrega termina com a lista das skills carregadas.
- `stack-python-django`: campo obrigatório ou único em tabela existente exige `data-modeling` e a conferência do volume e da forma de publicação.
- `git-workflow`: código de depuração esquecido é removido ou levado ao solicitante antes do commit; arquivo não rastreado com segredo fica fora e é sinalizado.
- `context-economy`: a passagem de bastão confere o estado real e declara o que não há como saber sem a conversa original.
- `skill-authoring`: os cenários da skill nova são entregues como arquivo em `examples/`, mesmo antes de executados.

### Alterado

- `examples/README.md` indexa os 22 cenários.
- Guia de início: o acionamento só pela descrição se mostrou pouco confiável; a recomendação para tarefas de ponta a ponta é entrar pelo `lead-engineer` ou chamar a skill pelo nome.

### Estado da validação desta versão

| Nível do portão de qualidade | Estado |
| --- | --- |
| 1. Validação automática | Executada, sem erros |
| 2. Revisão de conteúdo | Realizada pelo autor; ainda sem revisão independente |
| 3. Teste por cenário | **Executado nos 22 cenários**, que exercitam as 31 skills e os 6 agentes (01 a 03 na versão 0.1.1; 04 a 22 nesta). Uma execução por rodada, um único modelo. Pendências abertas: `delivery-verification` não foi carregada em nenhuma execução; em sessão comum, sem agente, as skills foram carregadas em 5 de 19 execuções |


## [0.1.1] - 2026-11-16

Primeira execução do teste por cenário, com as correções que ela revelou. Registro completo em [examples/results/0.1.1.md](examples/results/0.1.1.md).

### Corrigido

- `lead-engineer`: o agente não carregava as skills e chegou a citar uma skill que não havia carregado. O protocolo agora exige o carregamento efetivo, indica em que etapa carregar cada skill e a entrega lista as skills carregadas.
- `security-review` e `security-auditor`: instrução dirigida a revisores encontrada no alvo passa a ser registrada no relatório, com arquivo e linha; `privacy-lgpd` é carregada antes de classificar achados com dados pessoais.
- `requirements-discovery`: a mensagem que para para perguntar já entrega o problema reformulado, as premissas e um escopo provisório; decisão de tecnologia e situação do negócio descrita como fato entraram na seção "Evite".

### Alterado

- Cenário 01: distingue skills obrigatórias de skills esperadas conforme a etapa.
- Cenário 02: o registro da tentativa de manipulação virou item obrigatório.
- Cenário 03: dividido em duas rodadas (perguntas e, depois das respostas, requisitos).

### Estado da validação desta versão

| Nível do portão de qualidade | Estado |
| --- | --- |
| 1. Validação automática | Executada, sem erros |
| 2. Revisão de conteúdo | Realizada pelo autor; ainda sem revisão independente |
| 3. Teste por cenário | **Parcial.** Os 3 cenários foram executados, uma vez por rodada, com um modelo. Eles exercitam 7 das 31 skills e 2 dos 6 agentes. As demais 24 skills e 4 agentes continuam sem teste por cenário |

## [0.1.0] - 2026-11-16

Primeira versão pública.

### Adicionado

- **31 skills** em 12 categorias:
  - Front-end: `frontend-engineering`.
  - Back-end: `backend-engineering`, `data-modeling`.
  - Segurança: `secure-coding`, `security-review`, `threat-modeling`, `privacy-lgpd`.
  - Documentação técnica: `technical-writing`.
  - APIs e integrações: `api-design`, `resilient-integrations`.
  - Planejamento e arquitetura: `requirements-discovery`, `system-architecture`, `implementation-planning`.
  - Stacks e tecnologias: `stack-typescript-node`, `stack-react-nextjs`, `stack-python-django`, `git-workflow`.
  - Operações e entrega: `delivery-pipeline`, `observability`, `performance-engineering`.
  - Engenharia de IA: `prompt-engineering`, `llm-engineering`.
  - Produtividade: `context-economy`, `skill-authoring`.
  - UI/UX e design: `interface-design`, `ux-review`.
  - Engenharia de software: `code-quality`, `testing-strategy`, `code-review`, `debugging`, `delivery-verification`.
- **12 arquivos de referência**: acessibilidade, autenticação e autorização, PostgreSQL, controles por categoria do OWASP Top 10, modelo de relatório de auditoria, modelos de documentos, convenções REST, convenções GraphQL, sistemas distribuídos, avaliação de tecnologias, tokens de design e catálogo de refatoração.
- **6 agentes**: `lead-engineer` (principal) e os especializados `solution-architect`, `security-auditor`, `code-reviewer`, `quality-engineer` e `technical-writer`.
- **4 fluxos de trabalho documentados**: entrega de funcionalidade, correção de defeito, auditoria de segurança e projeto novo.
- **Validador** (`scripts/validate.mjs`) e **instalador** (`scripts/install.mjs`), sem dependências externas.
- **Manifestos de plugin** em `.claude-plugin/`.
- **Padrões**: de skills, de agentes e portão de qualidade em três níveis.
- **Modelos** de skill e de agente, e três **cenários** de exemplo e de teste.
- Integração contínua que executa o validador em todo push e pull request.

### Estado da validação desta versão

| Nível do portão de qualidade | Estado |
| --- | --- |
| 1. Validação automática | Executada em todas as skills e agentes, sem erros (`node scripts/validate.mjs`). O validador oficial de plugins (`claude plugin validate`) também passou, com um único aviso sobre ícone ausente, que é opcional |
| Carregamento | Verificado em sessão nova com o plugin carregado: as 31 skills e os 6 agentes foram reconhecidos |
| 2. Revisão de conteúdo | Realizada pelo autor durante a escrita; ainda sem revisão independente |
| 3. Teste por cenário | **Não executado.** Os cenários em `examples/` descrevem o comportamento esperado e ainda não foram executados de forma sistemática |

Enquanto o nível 3 não for concluído, trate as skills como método revisado, porém ainda não comprovado por execução em cenários. Relatos de uso real são bem-vindos.
