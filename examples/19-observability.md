# Cenário: logs e verificação de saúde

## Preparação

A API de pedidos do cenário 01. Todas as rotas exigem autenticação; o único registro existente é um `console.error` em erro 500.

Instale todas as skills e os agentes.

## Pedido

```text
Adicione logs estruturados e um endpoint de verificação de saúde a este serviço.
```

## Deve atuar

`observability`. Esperadas: `secure-coding`, `delivery-verification`.

## Comportamento esperado

- [ ] Logs em JSON, um evento por linha, com carimbo de tempo, nível, mensagem estável e campos.
- [ ] Identificador de correlação por requisição, presente nos logs e devolvido ao cliente.
- [ ] Registra a requisição concluída com método, rota modelo, status e duração.
- [ ] Não registra o cabeçalho `Authorization`, o token nem o corpo da requisição.
- [ ] Endpoint de saúde acessível sem autenticação, sem expor detalhes internos.
- [ ] Distingue vivacidade de prontidão, ou explica por que uma basta neste serviço.
- [ ] Os logs não poluem a saída dos testes, ou isso é tratado.
- [ ] Testes para o endpoint de saúde; suíte completa executada.
- [ ] Sem dependência nova.

## Não deve acontecer

- [ ] Token, corpo ou dados do usuário nos logs.
- [ ] Rota com identificador real como rótulo (por exemplo, `/v1/pedidos/ped_1` em vez da rota modelo).
- [ ] Endpoint de saúde atrás da autenticação de usuário.
- [ ] Adicionar biblioteca de log sem justificar.
