# Fluxo: correção de defeito

Para erros, regressões e comportamentos inesperados. A regra central é: nenhuma correção antes de entender a causa.

```mermaid
flowchart TD
  A[Relato do defeito] --> B[Reproduzir de forma confiável]
  B -- não reproduz --> C[Coletar mais evidência: logs, ambiente, dados]
  C --> B
  B -- reproduz --> D[Localizar: bisseção no histórico, no fluxo ou na entrada]
  D --> E[Hipótese refutável]
  E --> F{Experimento confirma?}
  F -- não --> D
  F -- sim --> G[Teste de regressão que falha]
  G --> H[Corrigir a causa raiz]
  H --> I[Suíte completa e cenário original]
  I -- falhou --> D
  I -- passou --> J[Buscar o mesmo problema em outros pontos]
  J --> K[delivery-verification e registro]
```

## Etapas

| # | Etapa | Responsável | Skills | Entrega |
| --- | --- | --- | --- | --- |
| 1 | Reproduzir | `lead-engineer` ou `quality-engineer` | `debugging` | Caso mínimo de reprodução |
| 2 | Diagnosticar | `lead-engineer` | `debugging`, `observability` (se faltar visibilidade) | Causa raiz com evidência |
| 3 | Proteger | `quality-engineer` | `testing-strategy` | Teste de regressão que falha |
| 4 | Corrigir | `lead-engineer` | Skill de área e de stack, `secure-coding` (se tocar entrada externa) | Menor mudança que resolve |
| 5 | Verificar | `lead-engineer` | `delivery-verification` | Relato com evidência |
| 6 | Integrar | `lead-engineer` | `git-workflow` | Commit `fix:` com a causa descrita |

## Critérios de saída

- O defeito foi reproduzido antes da correção.
- A causa raiz está explicada, com arquivo e linha.
- O teste de regressão falhava antes e passa depois.
- A suíte completa passa e o cenário original foi exercitado.
- Outras ocorrências do mesmo problema foram procuradas.
- A instrumentação temporária foi removida.

## Quando escalar

- Três hipóteses refutadas em sequência: reavalie as premissas antes de continuar.
- Várias correções falharam: o problema pode ser de desenho; envolva o `solution-architect`.
- A correção exige mudança incompatível, migração de dados ou acesso a produção: pare e peça autorização.
