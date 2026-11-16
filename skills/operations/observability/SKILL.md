---
name: observability
description: Instrumenta sistemas com logs estruturados, métricas e rastreamento distribuído, define indicadores e objetivos de nível de serviço, alertas acionáveis, verificações de saúde e painéis. Use quando for adicionar ou revisar logs, métricas, traces, alertas ou SLOs, preparar um serviço para produção ou quando um problema for difícil de diagnosticar por falta de visibilidade.
---

# Observabilidade

Um sistema é observável quando é possível entender o que está acontecendo dentro dele a partir do que ele emite, sem publicar código novo para investigar.

## Quando usar

- Preparar serviço ou funcionalidade para produção.
- Adicionar ou revisar logs, métricas, rastreamento, alertas e painéis.
- Definir objetivos de nível de serviço.
- Incidente ou defeito que não pôde ser explicado com os dados disponíveis.

## Fluxo

1. **Comece pela pergunta**: o que o usuário percebe quando isto falha? Que perguntas a equipe precisará responder durante um incidente?
2. **Defina os indicadores de nível de serviço (SLI)** da jornada crítica, do ponto de vista do usuário: proporção de requisições bem-sucedidas, proporção respondida abaixo de um limite de latência, atualidade dos dados.
3. **Defina os objetivos (SLO)** para cada indicador em uma janela (por exemplo, 99,9% em 30 dias). A diferença para 100% é o orçamento de erro, que orienta o equilíbrio entre entregar e estabilizar.
4. **Instrumente os três sinais** com os padrões abaixo, usando a biblioteca e as convenções já presentes no projeto (ou um padrão aberto como OpenTelemetry).
5. **Crie alertas a partir dos objetivos**, sobre sintomas que o usuário sente, cada um com runbook.
6. **Monte o painel** da jornada: os indicadores no topo, depois os sinais de cada dependência.
7. **Verifique** provocando uma falha em ambiente de teste: o alerta dispara? O painel mostra? O rastreamento leva à causa?

## Padrões

**Logs**
- Estruturados (JSON), um evento por linha, com: carimbo de tempo em UTC, nível, mensagem estável, serviço, versão, ambiente, identificador de correlação e campos de contexto.
- Mensagem constante e dados variáveis em campos: `pedido_cancelado` com `pedido_id`, não uma frase montada.
- Níveis com significado: `error` exige atenção de alguém; `warn` é anomalia tolerada; `info` são eventos de negócio e de ciclo de vida; `debug` fica desligado em produção.
- Registre nas fronteiras: requisição recebida e respondida, chamada externa, decisão de negócio relevante, erro com causa.
- **Nunca registre** senhas, tokens, chaves, dados de cartão ou dados pessoais em texto claro. Mascarar na origem.
- Um erro é registrado uma vez, onde é tratado, com a cadeia de causas.

**Métricas**
- Para serviços que atendem requisições: taxa, erros e duração (em histograma, para calcular percentis).
- Para recursos (CPU, memória, conexões, filas): utilização, saturação e erros.
- Métricas de negócio que indiquem saúde real: pedidos concluídos, pagamentos aprovados.
- Rótulos de baixa cardinalidade (rota modelo, código de status, região). Identificador de usuário ou de requisição como rótulo explode o custo: isso pertence a logs e traces.
- Latência analisada em percentis (p50, p95, p99), nunca apenas na média.

**Rastreamento distribuído**
- Propague o contexto de rastreamento por todas as chamadas e mensagens (padrão W3C Trace Context).
- Um trecho por operação relevante: requisição de entrada, consulta ao banco, chamada externa, publicação e consumo de mensagem.
- Atributos úteis no trecho: rota, identificador do recurso, resultado. Sem dados sensíveis.
- Amostragem que preserve erros e requisições lentas.
- Inclua o identificador do rastreamento nos logs e nas respostas de erro, para ligar os três sinais.

**Alertas**
- Alerta bom é acionável, urgente e baseado em sintoma. Se ninguém precisa agir agora, é painel ou relatório, não alerta.
- Alerte sobre o ritmo de consumo do orçamento de erro, em vez de limites fixos sensíveis a ruído.
- Todo alerta tem dono, severidade e runbook com diagnóstico e mitigação.
- Alertas de causa (CPU alta, disco) apenas quando prenunciam sintoma com tempo de reação.
- Revise periodicamente: alerta que dispara sem ação é removido ou corrigido.

**Verificações de saúde**
- *Vivacidade*: o processo responde? Não verifica dependências, para não causar reinício em cascata.
- *Prontidão*: pode receber tráfego? Verifica as dependências essenciais.
- Endpoints de saúde não expõem detalhes internos a anônimos.

**Operação**
- Marque publicações e mudanças de configuração nos painéis.
- Após incidente, registre o que faltou enxergar e instrumente.
- Retenção definida por tipo de dado, considerando custo e obrigações legais.

## Evite

- Log em excesso sem estrutura, ou log de sucesso de cada linha de código.
- Painel com dezenas de gráficos sem hierarquia.
- Alerta para tudo, gerando fadiga e alertas ignorados.
- Média de latência como indicador.
- Rótulos de métrica com valores ilimitados.
- Dados pessoais ou segredos em qualquer sinal.
- Instrumentar só depois do primeiro incidente.

## Critérios de pronto

- [ ] Indicadores e objetivos definidos para a jornada crítica.
- [ ] Logs estruturados com identificador de correlação em todo o caminho da requisição.
- [ ] Métricas de taxa, erro e duração nos pontos de entrada e nas dependências.
- [ ] Contexto de rastreamento propagado entre serviços e filas.
- [ ] Cada alerta com dono e runbook; falha simulada dispara o alerta esperado.
- [ ] Busca nos logs de teste confirma ausência de dados sensíveis.
- [ ] Verificações de vivacidade e de prontidão distintas.

## Exemplo

Serviço de checkout. SLI: proporção de requisições `POST /checkout` com resposta diferente de `5xx` e duração abaixo de 800 ms. SLO: 99,5% em 30 dias. Alerta urgente: consumo do orçamento de erro em ritmo que o esgotaria em poucas horas, sustentado por alguns minutos. Alerta não urgente: ritmo que o esgotaria em poucos dias. Painel: indicador e orçamento restante no topo; abaixo, taxa, erros e latência do checkout e de cada dependência (pagamentos, estoque, banco). Cada resposta de erro devolve o identificador do rastreamento.

## Skills relacionadas

- `performance-engineering` para investigar o que as métricas mostram.
- `debugging` para diagnosticar com os sinais disponíveis.
- `resilient-integrations` para instrumentar dependências externas.
- `delivery-pipeline` para verificação pós-publicação.
- `privacy-lgpd` para dados pessoais em registros.
- `technical-writing` para runbooks.
