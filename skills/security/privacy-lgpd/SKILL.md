---
name: privacy-lgpd
description: Aplica privacidade desde a concepção e os requisitos da LGPD (Lei 13.709/2018) ao desenho e à implementação de software, cobrindo inventário de dados pessoais, base legal, minimização, direitos do titular, retenção, compartilhamento e resposta a incidentes. Use quando o sistema coletar, armazenar, exibir, exportar ou compartilhar dados pessoais, ou quando pedirem análise de conformidade com a LGPD.
---

# Privacidade e LGPD

Traduzir obrigações de proteção de dados em decisões de engenharia verificáveis.

> Esta skill é orientação técnica, não parecer jurídico. Enquadramento de base legal, contratos e comunicação com a autoridade devem ser validados pelo encarregado e pelo jurídico da organização. Confirme a redação vigente da lei e dos regulamentos da ANPD antes de citar prazos e artigos em documento formal.

## Quando usar

- Funcionalidade que coleta ou processa dados de pessoa natural identificada ou identificável.
- Integração que envia dados pessoais a terceiros.
- Revisão de retenção, exclusão, exportação, logs ou analytics.
- Pedido de avaliação de conformidade.

## Conceitos mínimos

- **Dado pessoal**: informação relacionada a pessoa natural identificada ou identificável. Inclui identificadores indiretos (IP, identificador de dispositivo, cookie) quando permitem identificar.
- **Dado pessoal sensível** (art. 5º, II): origem racial ou étnica, convicção religiosa, opinião política, filiação sindical ou a organização religiosa, filosófica ou política, saúde, vida sexual, dado genético ou biométrico. Exige base legal específica (art. 11) e proteção reforçada.
- **Crianças e adolescentes** (art. 14): tratamento no melhor interesse; para crianças, consentimento específico e destacado de um dos pais ou responsável.
- **Controlador** decide sobre o tratamento; **operador** trata em nome do controlador; **encarregado** é o canal com titulares e com a ANPD.
- **Princípios** (art. 6º): finalidade, adequação, necessidade, livre acesso, qualidade, transparência, segurança, prevenção, não discriminação, responsabilização e prestação de contas.

## Fluxo

1. **Inventarie os dados.** Para cada dado pessoal da funcionalidade: qual é, de quem, de onde vem, para que serve, onde fica, quem acessa, com quem é compartilhado e por quanto tempo é mantido.
2. **Vincule cada finalidade a uma base legal** (art. 7º; art. 11 para sensíveis): consentimento, obrigação legal ou regulatória, execução de políticas públicas, estudos por órgão de pesquisa, execução de contrato, exercício regular de direitos, proteção da vida, tutela da saúde, legítimo interesse, proteção do crédito. Registre a hipótese proposta e encaminhe para validação. Consentimento não é a base padrão: só use quando o titular puder de fato recusar e revogar.
3. **Minimize.** Para cada campo, pergunte: a finalidade é atingida sem ele? Com menos precisão? Com dado agregado ou pseudonimizado? Remova o que não passar.
4. **Projete os direitos do titular** (art. 18) como funcionalidades: confirmação e acesso, correção, anonimização ou eliminação de dados desnecessários, portabilidade, eliminação de dados tratados com consentimento, informação sobre compartilhamento, revogação do consentimento.
5. **Defina retenção e exclusão.** Prazo por categoria de dado e por finalidade; rotina automatizada de eliminação ou anonimização; tratamento de backups e de cópias em sistemas derivados (busca, cache, analytics, logs).
6. **Proteja.** Controle de acesso por necessidade, cifragem em trânsito e em repouso, pseudonimização onde couber, trilha de auditoria de acesso a dados sensíveis.
7. **Controle o compartilhamento.** Liste operadores e terceiros, o dado enviado e a finalidade. Transferência internacional exige um dos mecanismos do art. 33.
8. **Avalie a necessidade de relatório de impacto** (RIPD) para tratamento de alto risco: dados sensíveis em escala, perfilamento, decisões automatizadas, vigilância, crianças.
9. **Prepare a resposta a incidentes**: detecção, contenção, avaliação de risco aos titulares e fluxo de comunicação à ANPD e aos titulares no prazo regulamentar vigente (art. 48 e regulamento de comunicação de incidentes).

## Padrões de implementação

- **Consentimento**: granular por finalidade, registrado com data, versão do texto e origem; revogação tão simples quanto a concessão; sem caixas pré-marcadas.
- **Logs e monitoramento**: sem dados pessoais em texto claro; use identificadores internos. Mascarar documentos, e-mails e telefones.
- **Ambientes de teste**: dados sintéticos ou anonimizados; nunca cópia de produção sem tratamento.
- **Exclusão**: propaga para índices de busca, caches, armazenamento de arquivos e operadores. Registre apenas o fato da exclusão, sem reter o dado.
- **Anonimização**: só é anonimização se a reidentificação não for possível com esforço razoável. Remover o nome e manter documento, data de nascimento e CEP é pseudonimização.
- **Exportação e portabilidade**: formato estruturado e legível por máquina, com autenticação reforçada antes da entrega.
- **Decisões automatizadas**: registre os critérios e permita a revisão solicitada pelo titular (art. 20).
- **Cookies e rastreadores**: os não essenciais só são ativados após escolha do usuário.

## Evite

- Coletar "porque pode ser útil depois".
- Usar consentimento para tratamento que é condição do serviço ou obrigação legal.
- Exclusão lógica apresentada ao titular como eliminação.
- Dados pessoais em URL, em mensagem de erro, em analytics de terceiros ou em prompt enviado a serviço externo sem base e contrato.
- Reaproveitar dados para finalidade nova sem reavaliar a base legal.
- Citar prazos ou artigos de memória em documento formal sem conferir a fonte oficial.

## Critérios de pronto

- [ ] Inventário preenchido para todos os dados pessoais da mudança.
- [ ] Cada finalidade com hipótese de base legal registrada e encaminhada para validação.
- [ ] Campos desnecessários removidos; justificativa para cada dado sensível.
- [ ] Caminho implementado e testado para acesso, correção e eliminação.
- [ ] Retenção definida e rotina de eliminação automatizada, incluindo sistemas derivados.
- [ ] Nenhum dado pessoal em logs (verificado por busca nos registros gerados em teste).
- [ ] Operadores e transferências internacionais listados.

## Exemplo

Funcionalidade: cadastro em lista de espera de uma clínica.

| Dado | Finalidade | Base legal proposta | Retenção | Observação |
| --- | --- | --- | --- | --- |
| Nome, telefone | Contatar quando houver vaga | Procedimentos preliminares a contrato, a pedido do titular | Até o agendamento ou 90 dias sem resposta | Eliminação automática |
| Motivo da consulta | Triagem | Dado de saúde: base específica do art. 11 a validar | Igual ao anterior | Campo opcional; acesso restrito à equipe clínica |
| Data de nascimento | Nenhuma nesta etapa | - | - | Removido: coletar apenas no agendamento |

## Skills relacionadas

- `data-modeling` para retenção, exclusão e anonimização no esquema.
- `secure-coding` para os controles de proteção.
- `threat-modeling` para riscos sobre os dados inventariados.
- `observability` para registros sem dados pessoais.
