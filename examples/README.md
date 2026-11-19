# Exemplos e cenários de teste

Cada arquivo desta pasta é um cenário: um pedido realista, as skills e os agentes que devem atuar e o **comportamento esperado**, item a item.

Os cenários têm dois usos:

1. **Aprender**: mostram como pedir e o que esperar.
2. **Testar**: são a base do nível 3 do [portão de qualidade](../docs/standards/quality-gate.md). Execute o pedido em uma sessão nova e marque cada item esperado como atendido ou não.

> Os cenários descrevem o comportamento **esperado**, não o registro de uma execução. Os resultados de execuções reais ficam em `results/`, um arquivo por versão: [0.1.1](results/0.1.1.md) (cenários 01 a 03) e [0.1.2](results/0.1.2.md) (cenários 04 a 22).

| Cenário | Exercita |
| --- | --- |
| [01-feature-delivery.md](01-feature-delivery.md) | `lead-engineer`, `api-design`, `backend-engineering`, `secure-coding`, `testing-strategy`, `delivery-verification` |
| [02-security-audit.md](02-security-audit.md) | `security-auditor`, `security-review`, `privacy-lgpd` |
| [03-vague-request.md](03-vague-request.md) | `requirements-discovery` e um caso de não acionamento |
| [04-bug-fix.md](04-bug-fix.md) | `debugging`, `testing-strategy`, `delivery-verification` |
| [05-code-review.md](05-code-review.md) | `code-reviewer`, `code-review` |
| [06-test-creation.md](06-test-creation.md) | `quality-engineer`, `testing-strategy` |
| [07-documentation.md](07-documentation.md) | `technical-writer`, `technical-writing` |
| [08-architecture.md](08-architecture.md) | `solution-architect`, `system-architecture`, `threat-modeling` ou `privacy-lgpd` |
| [09-frontend.md](09-frontend.md) | `frontend-engineering`, `stack-react-nextjs` |
| [10-schema-migration.md](10-schema-migration.md) | `data-modeling`, `stack-python-django` |
| [11-delivery-pipeline.md](11-delivery-pipeline.md) | `delivery-pipeline` |
| [12-performance.md](12-performance.md) | `performance-engineering` |
| [13-llm.md](13-llm.md) | `prompt-engineering`, `llm-engineering` |
| [14-webhook.md](14-webhook.md) | `resilient-integrations`, `secure-coding` |
| [15-refactoring.md](15-refactoring.md) | `code-quality`, `testing-strategy` |
| [16-commit.md](16-commit.md) | `git-workflow` |
| [17-ux-design.md](17-ux-design.md) | `ux-review`, `interface-design` |
| [18-planning-threats.md](18-planning-threats.md) | `implementation-planning`, `threat-modeling`, `privacy-lgpd` |
| [19-observability.md](19-observability.md) | `observability` |
| [20-typescript-review.md](20-typescript-review.md) | `stack-typescript-node` |
| [21-handoff.md](21-handoff.md) | `context-economy` |
| [22-skill-authoring.md](22-skill-authoring.md) | `skill-authoring` |

Juntos, os 22 cenários exercitam as 31 skills e os 6 agentes ao menos uma vez.

## Como executar um cenário

1. Prepare o repositório de teste descrito em "Preparação".
2. Instale as skills e os agentes indicados.
3. Abra uma sessão nova e envie o pedido exatamente como está, sem dicas adicionais.
4. Compare o que o assistente fez com a lista de comportamento esperado.
5. Registre: data, ferramenta e modelo usados, itens atendidos, itens não atendidos e observações.

## Como escrever um cenário

```markdown
# Cenário: <nome>

## Preparação
<estado do repositório e o que instalar>

## Pedido
<texto exato enviado ao assistente>

## Deve atuar
<skills e agentes esperados>

## Comportamento esperado
- [ ] <item observável>

## Não deve acontecer
- [ ] <comportamento incorreto que o cenário detecta>
```

Bons cenários incluem uma armadilha: algo que um assistente sem método faria errado, como presumir uma regra de negócio, esquecer a autorização ou declarar sucesso sem executar os testes.
