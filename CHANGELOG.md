# Changelog

Todas as mudanças relevantes deste projeto são registradas aqui. O formato segue o padrão "Keep a Changelog" e o projeto adota versionamento semântico. Nomes de skills e de agentes são interface pública: removê-los ou renomeá-los é mudança incompatível.

## [Não lançado]

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
