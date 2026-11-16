# Convenções GraphQL

## Esquema

- Modele o grafo pelo domínio e pelas telas que o consomem, não pelas tabelas.
- Tipos e campos descritos na própria SDL: a descrição é a documentação.
- Nulabilidade é contrato: marque como não nulo apenas o que o servidor garante sempre. Um campo não nulo que falha invalida o objeto pai inteiro.
- Identificadores como `ID`, globalmente únicos quando houver cache normalizado no cliente.
- Enumerações para conjuntos fechados; escalares personalizados para data e hora, dinheiro e e-mail.

## Consultas e listas

- Toda lista é paginada. Use o padrão de conexões com cursor (`edges`, `node`, `pageInfo`) para listas grandes ou sem fim.
- Argumentos de filtro e ordenação em tipos de entrada dedicados.
- Não exponha campo que devolve lista ilimitada.

## Mutações

- Nomeadas como verbo e substantivo do domínio: `cancelarPedido`, não `atualizarPedido` genérico.
- Um argumento `input` único, com tipo de entrada próprio.
- Resposta com tipo de payload próprio, que devolve o objeto alterado para atualização do cache do cliente.
- Erros de negócio esperados fazem parte do esquema (campo de erros no payload ou união de resultados). O array `errors` de nível superior fica para falhas inesperadas.

```graphql
type Mutation {
  cancelarPedido(input: CancelarPedidoInput!): CancelarPedidoPayload!
}

input CancelarPedidoInput {
  pedidoId: ID!
  motivo: MotivoCancelamento!
}

type CancelarPedidoPayload {
  pedido: Pedido
  erros: [ErroDeNegocio!]!
}
```

## Desempenho

- Resolva o problema N+1 com carregamento em lote por requisição (padrão de data loader): um carregador por tipo de busca, criado a cada requisição para não vazar dados entre usuários.
- Limite profundidade e complexidade das consultas; atribua custo a campos caros e rejeite acima do teto.
- Tempo limite por requisição.
- Em API pública ou de alto volume, prefira consultas persistidas: o cliente envia um identificador de consulta previamente registrada.

## Segurança

- Autorização na camada de negócio, chamada pelos resolvedores, de modo que qualquer caminho pelo grafo até um objeto aplique a mesma regra. Autorizar apenas no campo de entrada deixa caminhos alternativos abertos.
- Desative introspecção e sugestões de campo em produção quando a API não for pública.
- Limite o número de operações por requisição em lote e o uso de apelidos repetidos, que multiplicam o custo.
- Mensagens de erro sem detalhes internos.

## Evolução

- O esquema evolui de forma aditiva, sem versões.
- Marque campos com `@deprecated(reason: "...")`, meça o uso por campo e remova apenas com uso zerado.
- Mudanças incompatíveis: remover campo ou tipo, mudar o tipo de um campo, adicionar argumento obrigatório e tornar anulável um campo de saída que era não nulo (clientes tipados deixam de tratar a ausência).
- Mudanças compatíveis: adicionar tipo, campo ou argumento opcional e tornar não nulo um campo de saída que era anulável.
- Verifique compatibilidade do esquema na integração contínua, comparando com a versão publicada.

## Quando não usar GraphQL

- Poucos consumidores com necessidades uniformes.
- Dependência forte de cache HTTP em borda.
- Transferência de arquivos ou fluxos binários.
- Equipe sem capacidade de operar limites de complexidade e observabilidade por campo.
