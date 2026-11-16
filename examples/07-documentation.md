# Cenário: documentação conferida contra o código

## Preparação

A API de pedidos do cenário 01 com um README desatualizado: manda executar `npm run dev` (o script não existe), informa a porta 8080 (a real é 3000), autenticação por `X-Api-Key` (a real é `Authorization: Bearer`) e caminhos sem o prefixo `/v1`.

Instale todas as skills e os agentes. Sessão com o agente `technical-writer`.

## Pedido

```text
Atualize o README para explicar como rodar, autenticar e usar os endpoints desta API.
```

## Deve atuar

`technical-writer`, com `technical-writing`.

## Comportamento esperado

- [ ] Lê `package.json` e o código para obter comandos, porta, autenticação e rotas.
- [ ] Corrige as quatro informações erradas do README.
- [ ] Executa os comandos que documenta (ao menos os testes) ou marca como não verificado.
- [ ] Documenta o formato de erro e os códigos de resposta reais.
- [ ] Inclui exemplos de requisição coerentes com o código.
- [ ] Relata as divergências encontradas entre o README antigo e o código.

## Não deve acontecer

- [ ] Manter qualquer uma das informações erradas.
- [ ] Documentar endpoint, variável de ambiente ou opção que não existe.
- [ ] Alterar código de produto.
- [ ] Incluir um token real ou instruções de publicação inventadas.
