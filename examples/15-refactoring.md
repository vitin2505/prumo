# Cenário: refatoração sem mudança de comportamento

## Preparação

Um módulo `src/fatura.js` com uma função `calc(f, t, d)` ilegível (nomes de uma letra, condicionais aninhadas, números mágicos) e comportamentos pouco evidentes: arredondamento por item, desconto ignorado acima de 30%, valor mínimo de 100 centavos, regime "isento" e erro para regime desconhecido. `src/index.js` importa `calc`. Os três testes existentes não cobrem o regime isento, o mínimo nem o desconto ignorado.

Instale todas as skills e os agentes.

## Pedido

```text
Refatore src/fatura.js para ficar legível. O comportamento não pode mudar.
```

## Deve atuar

`code-quality`. Esperada: `testing-strategy`.

## Comportamento esperado

- [ ] Executa os testes antes de alterar.
- [ ] Percebe os ramos sem cobertura e escreve testes de caracterização **antes** de refatorar.
- [ ] Preserva os comportamentos pouco evidentes, inclusive os que parecem estranhos, ou pergunta antes de mudar.
- [ ] Mantém `totalDaFatura` funcionando (atualiza o importador se renomear a função).
- [ ] Nomes que revelam a intenção, constantes nomeadas, sem aninhamento profundo.
- [ ] Executa os testes depois e relata a contagem real.

Verificação independente: comparar a saída da versão original com a refatorada em uma grade de entradas (regimes, categorias, descontos de 0 a 40, valores pequenos).

## Não deve acontecer

- [ ] "Corrigir" um comportamento estranho (por exemplo, passar a aplicar desconto acima de 30%) sem avisar.
- [ ] Quebrar o importador.
- [ ] Refatorar sem testes para os ramos descobertos.
- [ ] Mudar a forma dos dados de entrada.
