---
name: llm-engineering
description: Projeta e implementa funcionalidades baseadas em modelos de linguagem, cobrindo escolha de arquitetura (chamada única, cadeia, recuperação, agente com ferramentas), saída estruturada, recuperação de contexto (RAG), avaliação automatizada, custo, latência e proteção contra injeção de prompt. Use quando for construir ou revisar chatbot, assistente, extração de dados, classificação, busca semântica, agente ou qualquer recurso que chame uma API de LLM.
---

# Engenharia de Aplicações com LLM

Um recurso com LLM é software probabilístico: funciona na demonstração e falha de formas novas em produção. O que torna o recurso confiável é a avaliação sistemática, não o prompt inspirado.

## Quando usar

- Construir ou revisar funcionalidade que chama um modelo de linguagem.
- Decidir entre chamada única, cadeia, recuperação ou agente.
- Problemas de qualidade, custo, latência ou segurança em recurso com LLM.

Para a redação do prompt em si, use `prompt-engineering`.

## Antes de escrever

Modelos, limites, preços e parâmetros mudam com frequência. Consulte a documentação atual do provedor para identificadores de modelo, janela de contexto, recursos disponíveis e preços. Não cite de memória.

## Fluxo

1. **Confirme que LLM é a ferramenta certa.** Regra determinística, expressão regular, busca tradicional ou modelo clássico resolvem com mais previsibilidade e menos custo quando o problema permite.
2. **Defina a tarefa e o critério de sucesso** com exemplos reais de entrada e de saída esperada. Monte o conjunto de avaliação antes de implementar.
3. **Escolha a arquitetura mais simples que atende**, nesta ordem:
   1. *Chamada única* com bom prompt e saída estruturada.
   2. *Cadeia* de chamadas com passos fixos, quando a tarefa se decompõe em etapas conhecidas.
   3. *Roteamento*, quando entradas de tipos diferentes pedem tratamentos diferentes.
   4. *Recuperação de contexto (RAG)*, quando a resposta depende de conhecimento externo ou privado.
   5. *Agente com ferramentas*, quando os passos não podem ser previstos e o modelo precisa decidir o caminho. É a opção mais flexível, mais cara e mais difícil de testar.
4. **Implemente com fronteiras claras**: o modelo propõe, o código valida e executa. Toda saída do modelo é verificada antes de produzir efeito.
5. **Avalie** no conjunto, com métricas por tipo de caso. Leia as falhas.
6. **Itere** mudando uma coisa por vez e reavaliando o conjunto inteiro.
7. **Prepare para produção**: limites de custo, tempo limite, repetição, contingência, registro e monitoramento.
8. **Acompanhe em produção**: amostre interações reais, colete sinais de qualidade e alimente o conjunto de avaliação com os casos novos.

## Padrões

**Saída estruturada**
- Use o recurso de saída estruturada ou de chamada de ferramenta da API, com esquema. Valide mesmo assim e trate a falha de validação.
- Esquemas simples, com nomes e descrições claras e enumerações para conjuntos fechados.

**Recuperação de contexto (RAG)**
- A qualidade da resposta é limitada pela qualidade da recuperação: avalie a recuperação separadamente (o trecho correto está entre os recuperados?).
- Divida os documentos respeitando a estrutura (seções, parágrafos), preservando o contexto necessário para o trecho fazer sentido sozinho.
- Combine busca semântica e por palavras-chave; reordene os candidatos antes de montar o contexto.
- Aplique as permissões do usuário na recuperação: o modelo só recebe o que aquele usuário pode ver.
- Instrua o modelo a responder apenas com base no contexto, a citar a fonte e a dizer quando o contexto não contém a resposta.
- Mantenha o índice sincronizado com a origem, inclusive em exclusões.

**Ferramentas e agentes**
- Ferramentas com propósito único, descrição precisa e parâmetros validados. Erros de ferramenta devolvem mensagem que permita ao modelo se corrigir.
- Menor privilégio: a ferramenta opera com as permissões do usuário, nunca com as do sistema.
- Ações irreversíveis ou de alto impacto exigem confirmação humana.
- Limite o número de passos, o tempo e o custo por tarefa. Registre cada passo.
- Prefira fluxo fixo a agente sempre que os passos forem conhecidos.

**Segurança**
- **Injeção de prompt**: todo conteúdo que o modelo lê e que não vem do desenvolvedor ou do usuário autenticado (documentos, páginas, e-mails, saídas de ferramentas) pode conter instruções hostis. Não existe filtro perfeito; a defesa é estrutural: limite o que o modelo pode fazer quando lê conteúdo não confiável, separe privilégios e exija confirmação para ações sensíveis.
- A saída do modelo é entrada não confiável: codifique antes de renderizar, use parâmetros em consultas, nunca execute diretamente.
- Não coloque no contexto segredos nem dados de outros usuários.
- Dados pessoais enviados a provedor externo exigem base legal e contrato: ver `privacy-lgpd`.
- Limite de uso por usuário, para conter abuso e custo.

**Custo e latência**
- Use o menor modelo que atinge a meta de qualidade na avaliação; reserve modelos maiores para os passos que precisam.
- Cache de prompt para prefixos longos e estáveis; cache de respostas para entradas repetidas.
- Resposta em fluxo para reduzir a latência percebida.
- Processamento em lote assíncrono para tarefas sem urgência.
- Limite o tamanho de entrada e de saída; meça tokens por requisição.

**Confiabilidade**
- Tempo limite e repetição com recuo para erros transitórios e de limite de taxa.
- Contingência definida: modelo alternativo, resposta degradada ou mensagem clara.
- Fixe a versão do modelo; trate a troca de modelo como mudança que exige reavaliação.

**Avaliação**
- Três tipos de verificação: por código (formato, correspondência exata, presença de termos), por modelo juiz com rubrica (calibrado contra avaliação humana) e por pessoas em amostra.
- O conjunto inclui casos comuns, de borda, adversariais e de recusa correta.
- Execute a avaliação na integração contínua para toda mudança de prompt, de modelo ou de recuperação.

**Observabilidade**
- Registre por chamada: versão do prompt, modelo, tokens de entrada e de saída, latência, custo, ferramentas chamadas e resultado da validação, respeitando as regras de dados pessoais.

## Evite

- Começar por agente ou por estrutura complexa quando uma chamada resolve.
- Publicar sem conjunto de avaliação.
- Confiar que o modelo seguirá o formato sem validar.
- Dar ao modelo ferramentas com privilégio amplo.
- Tratar instrução de sistema como barreira de segurança.
- Enviar o documento inteiro quando um trecho basta.
- Afirmar comportamento de modelo ou de API sem consultar a documentação vigente.

## Critérios de pronto

- [ ] Conjunto de avaliação versionado, com casos de borda, adversariais e de recusa.
- [ ] Resultado da avaliação registrado e acima da meta definida.
- [ ] Saída validada por esquema; falha de validação tratada.
- [ ] Conteúdo não confiável isolado; ações sensíveis com confirmação.
- [ ] Permissões do usuário aplicadas na recuperação e nas ferramentas.
- [ ] Limites de custo, tempo e passos configurados; contingência testada.
- [ ] Registro de tokens, latência e custo por chamada.

## Exemplo

Recurso: responder dúvidas de clientes com base na central de ajuda.

Arquitetura: recuperação e uma chamada, sem agente. Conjunto de avaliação: 60 perguntas reais, das quais 10 não têm resposta na base e 5 tentam extrair instruções. Métricas: o artigo correto está entre os cinco recuperados; a resposta é fiel ao artigo (juiz com rubrica, conferido por pessoas em amostra); as perguntas sem resposta são recusadas com encaminhamento para atendimento. Produção: limite por usuário, tempo limite de 20 s com mensagem de contingência, registro de versão do prompt e custo, e revisão semanal de amostra de conversas.

## Skills relacionadas

- `prompt-engineering` para a redação das instruções.
- `secure-coding` para tratar a saída do modelo como entrada não confiável.
- `privacy-lgpd` para dados pessoais enviados a provedores.
- `observability` para registro e monitoramento.
- `resilient-integrations` para a chamada à API do provedor.
- `testing-strategy` para integrar avaliação aos testes.
