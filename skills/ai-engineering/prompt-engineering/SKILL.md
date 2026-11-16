---
name: prompt-engineering
description: Projeta, revisa e melhora prompts e instruções para modelos de linguagem, definindo objetivo, contexto, estrutura, exemplos, formato de saída e critérios de avaliação. Use quando for escrever ou depurar prompt de sistema, instruções de agente, descrição de ferramenta ou de skill, quando um modelo responder de forma inconsistente, vaga ou incorreta, ou quando for preciso obter saída estruturada confiável.
---

# Engenharia de Prompts

Um prompt é uma especificação lida por um colaborador muito capaz que não conhece o contexto. A qualidade da resposta depende de quanto dele está escrito, não de fórmulas.

## Quando usar

- Escrever prompt de sistema, instrução de agente ou de tarefa.
- Descrever ferramentas e skills que um modelo decidirá quando usar.
- Corrigir respostas inconsistentes, prolixas, fora do formato ou erradas.
- Extrair dados estruturados.

Para arquitetura de funcionalidades com LLM (recuperação, ferramentas, avaliação em escala), use `llm-engineering`.

## Fluxo

1. **Defina o sucesso antes do prompt.** O que é uma resposta boa? Reúna de cinco a vinte entradas reais, incluindo casos difíceis e casos em que o correto é recusar ou perguntar. Esse conjunto é o teste.
2. **Escreva a primeira versão como instruiria uma pessoa competente e recém-chegada**: objetivo, público, contexto, restrições e formato do resultado.
3. **Explique o porquê das regras.** "Responda em até três frases, porque o texto aparece em uma notificação" generaliza melhor do que a regra solta.
4. **Estruture** separando instruções, contexto e dados com delimitadores claros (títulos ou marcações nomeadas).
5. **Adicione exemplos apenas se necessário**, variados e representativos. Exemplos são copiados de perto: um único exemplo vira molde.
6. **Especifique o formato de saída** de forma positiva (o que fazer). Para consumo por programa, use a saída estruturada ou as ferramentas da API, em vez de pedir JSON em texto livre.
7. **Execute no conjunto de teste e leia as respostas.** Classifique as falhas por tipo.
8. **Corrija a causa, não o sintoma**: falta de contexto, instrução ambígua, instruções em conflito ou tarefa grande demais para uma chamada.
9. **Repita a execução completa após cada mudança**: uma correção frequentemente quebra outro caso.
10. **Versione** o prompt junto ao código, com o conjunto de teste e os resultados.

## Padrões

**Conteúdo de um bom prompt**
- *Papel e objetivo*: o que o modelo está fazendo e para quem.
- *Contexto*: o que ele precisa saber e não tem como deduzir.
- *Tarefa*: o que produzir, com os critérios de qualidade.
- *Restrições*: limites e o que fazer nos casos de borda.
- *Formato*: estrutura, tamanho, idioma, tom.
- *Saída para incerteza*: o que fazer quando faltar informação ("diga que não sabe", "peça o dado que falta").

**Clareza**
- Instruções diretas e específicas. Diga o que fazer em vez de listar o que não fazer.
- Tom calmo. Maiúsculas e ênfases repetidas ("IMPORTANTE", "NUNCA") fazem modelos atuais aplicarem a regra em excesso; use ênfase só onde a medição mostrar que a regra é ignorada.
- Remova o que não muda o comportamento: cada frase compete por atenção.
- Sem instruções contraditórias. Quando houver prioridade, declare-a.

**Dados e segurança**
- Conteúdo de terceiros (documentos, páginas, e-mails, resultados de ferramentas) é dado, não instrução. Delimite e diga isso ao modelo.
- Nunca coloque segredos no prompt.
- A saída do modelo é entrada não confiável para o próximo passo: valide.

**Documentos longos**
- Coloque o material extenso antes da pergunta, e a instrução ao final.
- Peça que a resposta se apoie em trechos citados do material quando a fidelidade for essencial.

**Raciocínio**
- Para tarefas de vários passos, permita que o modelo pense antes de responder, usando o recurso de raciocínio da plataforma quando existir, e separe o raciocínio da resposta final.
- Divida tarefas grandes em uma cadeia de chamadas com responsabilidades claras, cada uma verificável.

**Descrição de ferramentas e skills**
- A descrição decide o acionamento: diga o que faz e quando usar, com os termos que o usuário empregaria.
- Parâmetros com nome claro, tipo, formato e exemplo. Erros que orientem a correção.
- Poucas ferramentas bem distintas funcionam melhor que muitas parecidas.

**Avaliação**
- Critérios verificáveis por código sempre que possível (formato, campos, valores exatos).
- Para qualidade subjetiva, rubrica explícita com avaliação humana em amostra, ou outro modelo como juiz calibrado contra julgamento humano.
- Acompanhe a taxa de acerto por tipo de caso, não uma impressão geral.

## Evite

- Ajustar o prompt olhando um único exemplo.
- Empilhar regras para cada falha sem entender a causa.
- Pedir "seja conciso e detalhado" e outras instruções em conflito.
- Exemplos todos parecidos.
- Confiar em formato pedido em texto quando existe saída estruturada.
- Declarar que o prompt melhorou sem executar o conjunto de teste.
- Atribuir ao modelo capacidades ou limites sem conferir a documentação da versão em uso.

## Critérios de pronto

- [ ] Critério de sucesso e conjunto de teste definidos, com casos difíceis.
- [ ] Prompt compreensível por uma pessoa sem contexto adicional.
- [ ] Instruções, contexto e dados separados; conteúdo externo marcado como dado.
- [ ] Formato de saída especificado e validado por código quando consumido por programa.
- [ ] Conjunto de teste executado; resultados registrados por tipo de caso.
- [ ] Prompt, testes e resultados versionados.

## Exemplo

Antes:

```text
Resuma o chamado. NÃO seja prolixo. NUNCA invente.
```

Depois:

```text
Você apoia a equipe de suporte de um sistema de agendamento para clínicas.
Resuma o chamado abaixo para o técnico que vai assumi-lo e que não leu a conversa.

Escreva em português, em três partes:
1. Problema: o que o cliente relata, em uma frase.
2. Já tentado: o que o cliente ou o atendente já fez.
3. Próximo passo: a ação mais provável, ou "informação insuficiente" seguido do que perguntar.

Use apenas o que está no chamado. Se um dado não aparecer, escreva "não informado":
o técnico toma decisões com base neste resumo e um dado suposto custa retrabalho.

<chamado>
{{texto_do_chamado}}
</chamado>
```

A segunda versão informa público, propósito, formato, o comportamento na incerteza e o motivo da regra.

## Skills relacionadas

- `llm-engineering` para sistemas com recuperação, ferramentas e avaliação.
- `context-economy` para reduzir o custo de contexto.
- `skill-authoring` para escrever skills deste ecossistema.
- `technical-writing` para clareza de redação.
