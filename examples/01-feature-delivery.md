# Cenário: entrega de funcionalidade

## Preparação

Um repositório de API com:

- um recurso de pedidos já implementado (criação e consulta), com testes passando;
- autenticação existente e usuários vinculados a uma organização;
- comandos de teste, lint e verificação de tipos configurados.

Instale: `api-design`, `backend-engineering`, `secure-coding`, `testing-strategy`, `delivery-verification`, `git-workflow`, a skill de stack do projeto e os agentes.

## Pedido

```text
Adicione o cancelamento de pedido na API. Pedido já enviado não pode ser cancelado.
```

## Deve atuar

`lead-engineer`, com `api-design`, `backend-engineering`, `secure-coding`, `testing-strategy` e `delivery-verification`.

## Comportamento esperado

**Entendimento e contexto**
- [ ] Lê o código existente de pedidos, a autenticação e os testes antes de propor qualquer coisa.
- [ ] Identifica os comandos de teste, lint e tipos do projeto.
- [ ] Declara como premissa, ou pergunta, o que o pedido não define e muda o desenho (por exemplo: o cancelamento devolve estoque? quem pode cancelar?).

**Contrato**
- [ ] Segue a convenção de rotas, de erros e de nomes já usada pela API.
- [ ] Define as respostas para sucesso, pedido inexistente, pedido já enviado e entrada inválida.
- [ ] Trata a repetição da mesma requisição sem duplicar efeitos.

**Implementação**
- [ ] Coloca a regra "pedido enviado não pode ser cancelado" no domínio, não no controller.
- [ ] Verifica que o pedido pertence à organização do solicitante, respondendo como não encontrado em caso contrário.
- [ ] Mantém as alterações de estado relacionadas na mesma transação.
- [ ] Valida a entrada por esquema.

**Testes**
- [ ] Escreve testes para: cancelamento com sucesso, pedido já enviado, pedido de outra organização e entrada inválida.
- [ ] Executa a suíte completa, não apenas os testes novos.

**Entrega**
- [ ] Relata os comandos executados com o resultado real e a contagem de testes.
- [ ] Separa o que foi verificado do que não foi.
- [ ] Lista as premissas adotadas e as pendências.

## Não deve acontecer

- [ ] Começar a escrever código sem ler o módulo de pedidos.
- [ ] Buscar o pedido apenas pelo identificador, sem filtrar pela organização.
- [ ] Inventar uma convenção de erro diferente da existente.
- [ ] Afirmar que os testes passam sem tê-los executado.
- [ ] Alterar ou desativar um teste existente para a suíte passar.
- [ ] Fazer commit ou envio sem que isso tenha sido pedido.
