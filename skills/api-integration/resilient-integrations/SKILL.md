---
name: resilient-integrations
description: Implementa integrações confiáveis entre sistemas, com tempo limite, repetição com recuo, idempotência, disjuntor, outbox, envio e recebimento de webhooks com verificação de assinatura e reconciliação. Use quando for consumir API de terceiros, publicar ou receber webhooks, integrar por fila ou eventos, sincronizar dados entre sistemas ou quando uma integração apresentar falhas intermitentes, duplicidade ou perda de mensagens.
---

# Integrações Resilientes

Toda chamada entre sistemas falha em algum momento: a rede cai, o outro lado demora, a mensagem chega duas vezes ou fora de ordem. Uma integração bem feita presume essas falhas e continua correta.

## Quando usar

- Consumir API externa ou de outro serviço interno.
- Enviar ou receber webhooks.
- Trocar mensagens por fila ou barramento de eventos.
- Sincronizar ou importar dados entre sistemas.

Para desenhar a API que você expõe, use `api-design`.

## Contexto a levantar

1. Documentação oficial do sistema externo: limites de taxa, garantias de entrega, política de repetição, ambiente de testes. Não presuma o comportamento.
2. O que acontece no negócio se a operação falhar, atrasar ou duplicar.
3. Quem é a fonte da verdade de cada dado.

## Fluxo

1. **Classifique a operação**: é leitura ou tem efeito? É idempotente no destino? Precisa ser síncrona para o usuário ou pode ser assíncrona?
2. **Isole o sistema externo atrás de um adaptador** com interface definida pelo seu domínio. O restante do código não conhece o formato do terceiro. O adaptador traduz dados e erros.
3. **Defina tempos limite** para conexão e para resposta em toda chamada. Chamada sem tempo limite é um vazamento de recursos esperando para acontecer.
4. **Defina a política de repetição**:
   - repita apenas falhas transitórias (tempo esgotado, conexão, `429`, `502`, `503`, `504`);
   - não repita erros do cliente (`400`, `401`, `403`, `404`, `422`);
   - recuo exponencial com variação aleatória, limite de tentativas e de tempo total;
   - respeite `Retry-After`;
   - só repita operação com efeito se ela for idempotente no destino.
5. **Garanta idempotência**: envie chave de idempotência ao chamar; ao receber, registre o identificador da mensagem e ignore repetições, na mesma transação do efeito.
6. **Desacople efeitos externos da transação local** com outbox: grave o evento na mesma transação da mudança de estado; um processo separado publica e marca como enviado.
7. **Proteja-se do destino degradado**: disjuntor que abre após falhas consecutivas, limite de concorrência por destino e comportamento de contingência definido (fila, resposta parcial, erro claro).
8. **Trate o que não pôde ser processado**: fila de mensagens mortas com alerta e procedimento de reprocessamento.
9. **Reconcilie**: rotina periódica que compara o estado local com a fonte da verdade e corrige divergências. Webhooks e eventos se perdem; a reconciliação é a rede de segurança.
10. **Teste as falhas**, não só o sucesso: tempo esgotado, resposta `500`, mensagem duplicada, mensagem fora de ordem, corpo inesperado.

## Padrões

**Receber webhooks**
- Verifique a assinatura sobre o corpo bruto, antes de qualquer análise, com comparação em tempo constante.
- Rejeite mensagens com carimbo de tempo fora de uma janela curta, para impedir repetição maliciosa.
- Responda `2xx` rapidamente após persistir a mensagem; processe de forma assíncrona.
- Deduplique pelo identificador do evento. Não presuma ordem: use versão ou data do recurso, ou busque o estado atual na API de origem.
- Endpoint dedicado, com limite de tamanho de corpo.

**Enviar webhooks**
- Assine cada entrega com segredo por destinatário (HMAC) e inclua carimbo de tempo e identificador único do evento.
- Repita com recuo por um período definido; desative destinos que falham de forma persistente e avise o dono.
- Valide a URL de destino contra endereços internos antes de chamar.
- Ofereça histórico de entregas e reenvio manual.
- Payload com tipo de evento, versão do formato e data de criação.

**Mensageria**
- Presuma entrega pelo menos uma vez: o consumidor é idempotente.
- Confirme a mensagem somente depois de concluir o processamento.
- Evento descreve um fato no passado e carrega versão do esquema; evolua de forma aditiva.
- Ordem só é garantida dentro de uma mesma chave de partição, quando a plataforma oferece.

**Dados de terceiros**
- Valide toda resposta externa por esquema, como qualquer entrada não confiável.
- Tolere campos novos; falhe de forma clara quando faltar campo obrigatório.

**Credenciais**
- Em cofre ou variável de ambiente, com escopo mínimo e rotação possível sem publicação de código.

**Observabilidade**
- Por integração: taxa de erro, latência, repetições, estado do disjuntor, tamanho das filas e idade da mensagem mais antiga.

## Evite

- Chamada externa dentro de transação de banco aberta.
- Repetição imediata, infinita ou em todas as camadas ao mesmo tempo (multiplica a carga sobre um destino que já está falhando).
- Usar o webhook como única fonte de verdade.
- Processar o webhook de forma síncrona antes de responder.
- Espalhar tipos e códigos de erro do terceiro pelo domínio.
- Registrar em log corpos com credenciais ou dados pessoais.

## Critérios de pronto

- [ ] Toda chamada externa com tempo limite explícito.
- [ ] Política de repetição limitada, com recuo e apenas para falhas transitórias.
- [ ] Reprocessar a mesma mensagem não duplica efeito (teste automatizado).
- [ ] Assinatura de webhook verificada; teste com assinatura inválida e com carimbo de tempo antigo.
- [ ] Mensagens não processáveis vão para fila de mensagens mortas com alerta.
- [ ] Rotina de reconciliação definida para dados sincronizados.
- [ ] Testes cobrindo tempo esgotado, erro do servidor e resposta malformada.

## Exemplo

Integração com provedor de pagamentos. Criação da cobrança: o caso de uso grava o pedido como `aguardando_pagamento` e um registro outbox na mesma transação; o worker chama o provedor com `Idempotency-Key` igual ao identificador do pedido, tempo limite de 10 s e até 5 tentativas com recuo. Confirmação: o endpoint de webhook valida a assinatura e o carimbo de tempo, grava o evento bruto e responde `200`; o consumidor ignora eventos já vistos e, em vez de confiar na ordem, consulta o estado atual da cobrança no provedor. Uma rotina horária reconcilia pedidos pendentes há mais de 30 minutos.

## Skills relacionadas

- `api-design` para o contrato dos seus próprios endpoints e eventos.
- `backend-engineering` para transações e camadas.
- `secure-coding` para validação e proteção contra SSRF.
- `observability` para métricas e alertas da integração.
- `system-architecture` para decisões entre comunicação síncrona e assíncrona.
