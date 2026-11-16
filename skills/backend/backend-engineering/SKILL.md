---
name: backend-engineering
description: Projeta e implementa serviços de back-end com camadas bem definidas, regras de negócio isoladas, validação nas bordas, tratamento de erros, transações, autenticação e autorização. Use quando for criar ou alterar endpoints, casos de uso, jobs, filas ou regras de negócio no servidor, ou quando um serviço estiver acoplado, frágil ou difícil de testar.
---

# Engenharia de Back-end

Um serviço confiável mantém as regras de negócio independentes de framework, valida tudo que cruza uma fronteira e falha de forma previsível. Esta skill define como estruturar e implementar esse código.

## Quando usar

- Criar ou alterar endpoints, casos de uso, workers, tarefas agendadas e consumidores de fila.
- Implementar regra de negócio, autenticação, autorização ou processamento assíncrono.
- Reorganizar um serviço em que controller, regra e banco estão misturados.

Não use para desenhar o contrato público da API (use `api-design`) nem para modelar o esquema do banco (use `data-modeling`).

## Contexto a levantar

1. Linguagem, framework, ORM e versão. Leia o manifesto; não presuma.
2. A estrutura de pastas e o fluxo de uma funcionalidade já existente, do roteador ao banco.
3. Como o projeto trata erros, logs, configuração e transações hoje.
4. Quem chama este código e com que volume, e quais dados são sensíveis.

## Fluxo

1. **Escreva o caso de uso em uma frase**: ator, ação, resultado e regras. Exemplo: "Um atendente cancela um pedido ainda não enviado; o estoque é devolvido e o cliente é notificado."
2. **Liste invariantes e casos de borda** antes do código: estados inválidos, concorrência, repetição da mesma requisição, ausência de permissão.
3. **Posicione o código nas camadas**:
   - **Entrada** (controller, handler, consumidor): traduz protocolo em chamada, valida formato, não contém regra.
   - **Aplicação** (caso de uso): orquestra, abre a transação, aplica autorização, chama o domínio.
   - **Domínio**: regras e invariantes em código puro, sem dependência de framework, banco ou rede.
   - **Infraestrutura**: repositórios, clientes HTTP, filas, e-mail, atrás de interfaces definidas por quem as usa.
   Dependências apontam para dentro: o domínio não importa infraestrutura.
4. **Valide na borda.** Todo dado externo passa por um esquema que rejeita campos desconhecidos, impõe tipos, tamanhos e formatos. Dentro do domínio trabalhe com tipos já validados.
5. **Autorize explicitamente** em cada operação, no servidor, conferindo que o recurso pertence ao solicitante ou ao seu inquilino. Ver [references/authn-authz.md](references/authn-authz.md).
6. **Defina a fronteira da transação.** Uma operação de negócio é uma transação. Efeitos externos (e-mail, fila, chamada HTTP) não ficam dentro dela: use o padrão outbox ou execute após a confirmação.
7. **Trate erros por categoria**: erro de validação, regra de negócio violada, não encontrado, não autorizado, conflito e falha inesperada. Cada um com tipo próprio, mapeado para a resposta na camada de entrada.
8. **Teste**: regras de domínio com testes unitários; caso de uso com banco real em teste de integração; contrato do endpoint com teste de API.

## Padrões

- **Idempotência**: operações que criam ou cobram aceitam chave de idempotência; consumidores de fila toleram mensagem repetida.
- **Concorrência**: use restrições do banco e bloqueio otimista (coluna de versão) para proteger invariantes; verificar e depois gravar em passos separados é condição de corrida.
- **Configuração**: lida do ambiente, validada na inicialização; o serviço não sobe com configuração inválida.
- **Tempo e dinheiro**: datas em UTC com fuso aplicado só na apresentação; valores monetários em inteiros da menor unidade ou decimal exato, nunca ponto flutuante.
- **Trabalho demorado**: fora do ciclo da requisição, em fila, com repetição, limite de tentativas e fila de mensagens mortas.
- **Limites**: paginação obrigatória em listagens, tamanho máximo de payload, tempo limite em toda chamada externa.
- **Logs**: estruturados, com identificador de correlação, sem dados pessoais nem segredos.

## Evite

- Regra de negócio em controller, em gatilho de banco ou espalhada em consultas.
- Capturar exceção e seguir em silêncio, ou devolver detalhes internos ao cliente.
- Confiar em identificador de usuário ou de inquilino vindo do corpo da requisição.
- Consultas dentro de laços (N+1) e listagens sem limite.
- Abstrações criadas "para o futuro": interface com uma única implementação que não é fronteira de infraestrutura nem ponto de teste.
- Chamadas HTTP ou envio de mensagens dentro de transação de banco aberta.

## Critérios de pronto

- [ ] Regras de domínio testadas sem banco nem rede.
- [ ] Toda entrada externa validada por esquema; campos desconhecidos rejeitados.
- [ ] Autorização verificada por operação e por recurso, com teste do caso negado.
- [ ] Repetir a mesma requisição não duplica efeitos.
- [ ] Erros mapeados para respostas consistentes, sem vazar stack trace.
- [ ] Nenhuma consulta N+1 nova (verificado pelo log de consultas no teste de integração).
- [ ] Chamadas externas com tempo limite e tratamento de falha.

## Exemplo

Caso de uso "cancelar pedido": o handler valida o identificador e chama `cancelarPedido(usuario, pedidoId)`. O caso de uso carrega o pedido filtrando pelo inquilino do usuário, verifica a permissão, chama `pedido.cancelar()` (o domínio lança `PedidoJaEnviado` se a invariante for violada), devolve o estoque e grava o evento `PedidoCancelado` na tabela outbox, tudo na mesma transação. Um worker publica o evento e o serviço de notificação envia o e-mail. Testes: unitário para `pedido.cancelar()`, integração para a transação e para o caso de usuário de outro inquilino (deve responder como não encontrado).

## Skills relacionadas

- `api-design` para o contrato exposto.
- `data-modeling` para esquema, índices e migrações.
- `secure-coding` para os controles de segurança durante a implementação.
- `resilient-integrations` para chamadas a sistemas externos e webhooks.
- `observability` para logs, métricas e rastreamento.
- `stack-typescript-node` e `stack-python-django` para convenções de stack.
