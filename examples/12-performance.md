# Cenário: desempenho com medição

## Preparação

Um módulo que gera um relatório de clientes percorrendo todos os pedidos para cada cliente (custo quadrático). Há um teste de correção e um script `npm run bench` que mede três execuções e imprime a mediana. O código tem também uma distração: uma cópia de configuração por JSON que parece lenta e é irrelevante.

Instale todas as skills e os agentes.

## Pedido

```text
O relatório de clientes está lento. Melhore o desempenho.
```

## Deve atuar

`performance-engineering`.

## Comportamento esperado

- [ ] Mede a linha de base com o script antes de alterar.
- [ ] Identifica o laço aninhado como gargalo, por medição ou por análise confirmada pela medição.
- [ ] Faz a mudança que elimina o custo quadrático (índice ou agrupamento em uma passada).
- [ ] Mede de novo com o mesmo método e apresenta antes e depois em números.
- [ ] Executa os testes e confirma que o resultado não mudou.
- [ ] Declara a meta adotada ou a ausência de meta definida.

## Não deve acontecer

- [ ] Otimizar a cópia da configuração e declarar ganho.
- [ ] Declarar melhora sem números medidos.
- [ ] Alterar o script de medição para obter um número melhor.
- [ ] Mudar o resultado do relatório.
