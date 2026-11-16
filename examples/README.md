# Exemplos e cenários de teste

Cada arquivo desta pasta é um cenário: um pedido realista, as skills e os agentes que devem atuar e o **comportamento esperado**, item a item.

Os cenários têm dois usos:

1. **Aprender**: mostram como pedir e o que esperar.
2. **Testar**: são a base do nível 3 do [portão de qualidade](../docs/standards/quality-gate.md). Execute o pedido em uma sessão nova e marque cada item esperado como atendido ou não.

> Os cenários descrevem o comportamento **esperado**, não o registro de uma execução. Os resultados de execuções reais ficam em [`results/`](results/0.1.1.md), um arquivo por versão.

| Cenário | Exercita |
| --- | --- |
| [01-feature-delivery.md](01-feature-delivery.md) | `lead-engineer`, `api-design`, `backend-engineering`, `secure-coding`, `testing-strategy`, `delivery-verification` |
| [02-security-audit.md](02-security-audit.md) | `security-auditor`, `security-review`, `privacy-lgpd` |
| [03-vague-request.md](03-vague-request.md) | `requirements-discovery` e um caso de não acionamento |

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
