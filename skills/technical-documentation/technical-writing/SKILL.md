---
name: technical-writing
description: Produz e revisa documentação técnica de software, incluindo README, guias, referência de API, especificações, ADRs, runbooks e diagramas Mermaid, escolhendo o tipo de documento pelo objetivo do leitor. Use quando for criar, atualizar ou revisar documentação de projeto, registrar uma decisão arquitetural, documentar uma API ou explicar um sistema por meio de diagramas.
---

# Documentação Técnica

Documentação existe para que alguém consiga fazer algo ou decidir algo. Cada documento tem um leitor, um objetivo e uma forma de verificar se continua verdadeiro.

## Quando usar

- Criar ou atualizar README, guia de instalação, manual, referência de API ou especificação.
- Registrar uma decisão arquitetural (ADR).
- Escrever runbook operacional ou guia de contribuição.
- Representar arquitetura, fluxo ou modelo de dados em diagrama.

## Fluxo

1. **Identifique o leitor e a tarefa.** Quem vai ler, o que já sabe e o que precisa conseguir ao terminar. Se houver dois públicos, são dois documentos.
2. **Escolha o tipo de documento** pela necessidade:

   | Necessidade do leitor | Tipo | Característica |
   | --- | --- | --- |
   | Aprender fazendo | Tutorial | Caminho único, do zero ao resultado, sem escolhas |
   | Resolver uma tarefa específica | Guia prático | Passos numerados, pré-requisitos, resultado esperado |
   | Consultar um detalhe exato | Referência | Completa, uniforme, sem narrativa |
   | Entender o porquê | Explicação | Contexto, alternativas, trade-offs |
   | Saber por que foi decidido assim | ADR | Contexto, decisão, consequências |
   | Operar ou reagir a incidente | Runbook | Sintoma, diagnóstico, ação, reversão |

   Não misture tipos no mesmo documento: tutorial com referência no meio perde o leitor.
3. **Colete os fatos na fonte**: código, configuração, comandos executados. Não documente de memória. Todo comando e exemplo incluído deve ter sido executado.
4. **Estruture antes de escrever**: títulos que permitem encontrar a resposta sem ler tudo; o mais importante primeiro.
5. **Escreva** seguindo os padrões de redação abaixo.
6. **Adicione diagrama** quando a relação entre partes for difícil de descrever em texto. Use Mermaid, versionado junto ao documento.
7. **Verifique** executando o documento como um leitor novo: siga os passos em ambiente limpo, confira links e exemplos.
8. **Posicione** o documento perto do que descreve e vincule-o a partir do README ou do índice.

Modelos prontos de README, ADR, runbook e especificação em [references/templates.md](references/templates.md).

## Padrões

**Redação**
- Frases curtas, voz ativa, imperativo nas instruções ("Execute", "Configure").
- Um termo por conceito, do início ao fim. Defina siglas no primeiro uso.
- Específico em vez de vago: "responde em até 200 ms no p95" em vez de "rápido".
- Sem adjetivos promocionais, sem "simplesmente" e "basta".
- Cada passo contém uma ação e, quando útil, o resultado esperado.

**Blocos de código**
- Sempre com a linguagem declarada; comandos copiáveis, sem prompt de terminal.
- Marque valores a substituir de forma inequívoca: `<seu-token>`.
- Nunca inclua segredos reais.

**Diagramas Mermaid**

| Objetivo | Tipo |
| --- | --- |
| Componentes e dependências | `flowchart` |
| Interação entre partes ao longo do tempo | `sequenceDiagram` |
| Modelo de dados | `erDiagram` |
| Ciclo de vida de uma entidade | `stateDiagram-v2` |
| Estrutura de classes ou módulos | `classDiagram` |

Um diagrama responde a uma pergunta. Limite a cerca de quinze elementos; acima disso, divida por nível (contexto, contêineres, componentes). Rotule as setas com o que trafega.

**Referência de API**
- Gerada a partir do contrato (OpenAPI ou esquema GraphQL) sempre que possível, para não divergir.
- Para cada operação: finalidade, autenticação, parâmetros, exemplo de requisição e resposta, erros possíveis.

**Manutenção**
- Documentação muda no mesmo pull request que o comportamento.
- Prefira gerar a partir da fonte a duplicar. O que não puder ser mantido deve ser removido.

## Evite

- Documentar o óbvio do código e omitir o porquê.
- Parágrafos longos onde caberia lista ou tabela; tabela onde caberia uma frase.
- Capturas de tela para conteúdo textual (não são pesquisáveis e envelhecem rápido).
- Exemplos que nunca foram executados.
- Seções vazias com "a definir".
- Afirmar comportamento que não foi verificado no código.

## Critérios de pronto

- [ ] Leitor e objetivo identificáveis na primeira tela.
- [ ] Todos os comandos e exemplos executados com sucesso em ambiente limpo.
- [ ] Links internos e externos conferidos.
- [ ] Diagramas renderizam e refletem o código atual.
- [ ] Nenhum segredo, dado pessoal ou endereço interno.
- [ ] Terminologia consistente com o código e com os demais documentos.

## Exemplo

Pedido: "Documente como rodar o projeto localmente."

Tipo: guia prático. Estrutura: pré-requisitos com versões lidas dos arquivos de configuração; passos numerados (clonar, configurar variáveis a partir do arquivo de exemplo, subir dependências, aplicar migrações, iniciar); resultado esperado ao final ("a aplicação responde em `http://localhost:3000/health` com status 200"); seção de problemas comuns apenas com os que foram de fato observados. Verificação: seguir o guia em um clone novo.

## Skills relacionadas

- `system-architecture` para o conteúdo de decisões e diagramas de arquitetura.
- `api-design` para o contrato que a referência documenta.
- `requirements-discovery` para especificações de requisitos.
- `git-workflow` para descrições de pull request e mensagens de commit.
