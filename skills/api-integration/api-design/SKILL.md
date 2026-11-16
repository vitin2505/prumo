---
name: api-design
description: Projeta e revisa contratos de API REST e GraphQL, definindo recursos, operações, erros, paginação, idempotência, versionamento, autenticação e especificação formal. Use quando for criar ou alterar endpoints ou esquemas públicos, escrever ou revisar OpenAPI ou SDL, planejar mudança incompatível ou escolher entre REST e GraphQL.
---

# Design de APIs

Uma API é uma promessa difícil de desfazer. Projete o contrato a partir de quem consome, formalize antes de implementar e evolua sem quebrar.

## Quando usar

- Criar ou alterar endpoints, tipos, campos ou códigos de erro expostos a outro sistema ou equipe.
- Escrever ou revisar especificação OpenAPI ou esquema GraphQL.
- Planejar versionamento, depreciação ou mudança incompatível.

Para a implementação por trás do contrato, use `backend-engineering`. Para consumir APIs de terceiros, use `resilient-integrations`.

## Fluxo

1. **Liste os consumidores e seus casos de uso.** O que cada um precisa fazer, em que ordem, com que frequência. A API modela essas necessidades, não as tabelas do banco.
2. **Escolha o estilo** com critério:
   - **REST**: recursos estáveis, cache HTTP, consumidores variados ou externos. Padrão quando não há motivo contrário.
   - **GraphQL**: muitos clientes com necessidades de dados diferentes sobre um grafo rico, e equipe disposta a operar limites de complexidade.
   - **RPC** (inclusive gRPC): comunicação interna entre serviços, orientada a ações, com contrato fortemente tipado.
3. **Modele recursos e operações.** Substantivos para recursos, verbos HTTP para ações; ações que não se encaixam viram sub-recurso de ação (`POST /pedidos/{id}/cancelamento`).
4. **Defina o contrato completo de cada operação**: entrada, saída, erros, autenticação, autorização, paginação, limites.
5. **Escreva a especificação formal primeiro** (OpenAPI ou SDL) e revise-a com um consumidor antes de implementar.
6. **Avalie compatibilidade**: a mudança quebra algum cliente existente? Se sim, siga o processo de mudança incompatível abaixo.
7. **Verifique** com teste de contrato: a implementação é validada contra a especificação na integração contínua.

Convenções detalhadas em [references/rest-conventions.md](references/rest-conventions.md) e [references/graphql.md](references/graphql.md).

## Padrões

**Consistência acima de preferência.** Se a API já usa uma convenção (nomes, formato de erro, paginação), siga-a. Uma API uniforme e imperfeita é melhor que uma mistura de estilos.

**Erros**
- Um único formato em toda a API, baseado em Problem Details (RFC 9457): `type`, `title`, `status`, `detail`, `instance`, mais um código estável legível por máquina e, para validação, a lista de campos com problema.
- O cliente decide pelo código, nunca pelo texto da mensagem.
- Sem detalhes internos: nada de stack trace, SQL ou nomes de tabela.

**Paginação**
- Toda coleção é paginada desde a primeira versão, com limite padrão e máximo.
- Cursor opaco para coleções grandes ou que mudam; deslocamento só para conjuntos pequenos e estáveis.
- Ordenação determinística, com critério de desempate.

**Idempotência**
- `GET`, `PUT` e `DELETE` são idempotentes por definição: implemente assim.
- `POST` que cria recurso ou dispara efeito aceita cabeçalho `Idempotency-Key`; a repetição devolve o resultado original.

**Evolução sem quebra**
- Compatível: adicionar campo opcional na resposta, endpoint novo, parâmetro opcional, valor novo em enumeração que o cliente foi instruído a tolerar.
- Incompatível: remover ou renomear campo, mudar tipo ou significado, tornar obrigatório, alterar código de status, tornar a validação mais restrita.
- Clientes devem ignorar campos desconhecidos; documente essa expectativa.

**Mudança incompatível**
1. Introduza o novo ao lado do antigo.
2. Marque o antigo como depreciado na especificação e com cabeçalhos `Deprecation` e `Sunset`.
3. Meça o uso por cliente; comunique com prazo.
4. Remova apenas com uso zerado ou após a data anunciada.

**Segurança do contrato**
- Autenticação em toda operação que não seja explicitamente pública; escopos por operação.
- A resposta expõe apenas os campos que aquele solicitante pode ver.
- Limite de taxa documentado, com cabeçalhos de cota e `429` com `Retry-After`.
- Identificadores não sequenciais em recursos expostos reduzem enumeração, mas não substituem autorização.

## Evite

- Expor o modelo de banco diretamente como contrato.
- Verbos na URL de recursos (`/getUsuario`), `200` com erro no corpo, `POST` para tudo.
- Booleanos que deveriam ser enumeração; campos com significado dependente de outro campo.
- Respostas sem envelope previsível para coleções; listas sem limite.
- Versão nova para cada mudança pequena; mudança incompatível silenciosa na versão atual.
- Datas sem fuso, valores monetários em ponto flutuante, identificadores numéricos grandes sem serem strings.

## Critérios de pronto

- [ ] Especificação formal escrita e válida (verificada por linter de especificação).
- [ ] Cada operação com exemplos de requisição, de sucesso e de cada erro.
- [ ] Formato de erro único; códigos de erro documentados.
- [ ] Coleções paginadas com limite máximo.
- [ ] Operações não idempotentes com estratégia de repetição segura.
- [ ] Análise de compatibilidade com os clientes existentes registrada.
- [ ] Teste de contrato executando na integração contínua.

## Exemplo

Pedido: "Endpoint para o app cancelar um pedido."

```http
POST /v1/pedidos/ped_8f3a/cancelamento
Idempotency-Key: 6b1f...
Content-Type: application/json

{ "motivo": "desistencia" }
```

Respostas: `200` com o pedido no estado `cancelado`; `404` se o pedido não existe ou não pertence ao solicitante; `409` com código `pedido_ja_enviado` quando a regra impede; `422` para motivo inválido. A repetição com a mesma chave devolve o mesmo `200`. O cancelamento é sub-recurso de ação porque tem regra e efeitos próprios, o que um `PATCH` no campo de estado esconderia.

## Skills relacionadas

- `backend-engineering` para implementar o contrato.
- `resilient-integrations` para webhooks e consumo de APIs externas.
- `technical-writing` para a referência publicada.
- `secure-coding` para autenticação, autorização e validação.
- `testing-strategy` para testes de contrato.
