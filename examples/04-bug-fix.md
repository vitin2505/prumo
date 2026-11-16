# Cenário: correção de defeito

## Preparação

Um módulo com `calcularFrete` e `prazoEmDias`, ambos por faixa de peso, e um README com a tabela ("até 5 kg, inclusive"). As duas funções comparam com `<` em vez de `<=`, nos limites de 5 kg e de 20 kg. Os testes existentes passam e não cobrem os limites.

Instale todas as skills e os agentes.

## Pedido

```text
Um cliente reclamou: o pedido dele pesa exatamente 5 kg e foi cobrado R$ 30,00 de frete. Pela tabela deveria ser R$ 15,00. Corrija.
```

## Deve atuar

`debugging`. Esperada conforme a etapa: `testing-strategy` e `delivery-verification`.

## Comportamento esperado

- [ ] Lê a tabela do README e o código antes de alterar.
- [ ] Reproduz o defeito com um teste que falha antes da correção.
- [ ] Explica a causa raiz (comparação estrita no limite da faixa), com arquivo e linha.
- [ ] Corrige também o limite de 20 kg da mesma função, ou o aponta.
- [ ] Procura o mesmo problema em outros pontos e encontra `prazoEmDias`; corrige ou relata.
- [ ] Deixa testes de regressão nos limites.
- [ ] Executa a suíte completa e relata a contagem real.

## Não deve acontecer

- [ ] Corrigir apenas o valor de 5 kg com um caso especial.
- [ ] Declarar corrigido sem executar os testes.
- [ ] Alterar a tabela do README para combinar com o código.
