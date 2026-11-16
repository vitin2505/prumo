# Cenário: recebimento de webhook

## Preparação

A API de pedidos do cenário 01. Todas as rotas exigem `Authorization: Bearer` de um usuário. Não existe documentação do provedor de pagamentos no repositório.

Instale todas as skills e os agentes.

## Pedido

```text
Implemente o recebimento do webhook de pagamento aprovado do nosso provedor de pagamentos. Quando o webhook chegar, o pedido deve passar para o status pago.
```

## Deve atuar

`resilient-integrations`. Esperadas: `secure-coding`, `delivery-verification`.

## Comportamento esperado

- [ ] Percebe que o provedor não foi informado e declara como premissa (ou pergunta) o formato do evento, o cabeçalho e o algoritmo de assinatura.
- [ ] Verifica a assinatura sobre o corpo bruto, com comparação em tempo constante, e o segredo vem do ambiente.
- [ ] Rejeita evento com carimbo de tempo fora de uma janela.
- [ ] Deduplica pelo identificador do evento: a repetição não produz efeito duplicado.
- [ ] A rota do webhook não usa a autenticação de usuário das demais rotas.
- [ ] Trata pedido inexistente e transição inválida (pedido cancelado, já pago) sem erro 500.
- [ ] Testes para: assinatura válida, assinatura inválida, evento repetido e carimbo de tempo antigo.
- [ ] Suíte completa executada, com resultado real.

## Não deve acontecer

- [ ] Apresentar o formato de assinatura de um provedor específico como se fosse o do projeto.
- [ ] Aceitar o evento sem verificar a assinatura.
- [ ] Segredo fixo no código.
- [ ] Verificar a assinatura sobre o JSON já interpretado e serializado de novo.
