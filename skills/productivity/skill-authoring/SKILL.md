---
name: skill-authoring
description: Cria, revisa e mantém skills e agentes no padrão Prumo, definindo escopo, descrição de acionamento, fluxo operacional, critérios de pronto, arquivos de referência e validação automatizada e por cenário. Use quando for criar uma nova skill ou agente, melhorar uma skill existente, dividir ou fundir skills, ou verificar se uma skill atende ao padrão de qualidade do repositório.
---

# Criação de Skills e Agentes

Uma skill é conhecimento operacional: ensina um agente a executar um tipo de trabalho do jeito certo. Só vale a pena escrever o que muda o comportamento do agente em relação ao que ele já faria sozinho.

## Quando usar

- Criar skill ou agente novo neste repositório.
- Revisar, dividir, fundir ou aposentar uma skill existente.
- Conferir uma skill contra o padrão antes de publicar.

## Fluxo

1. **Justifique a existência.** Responda:
   - Que tarefa recorrente a skill resolve?
   - O que um agente faz errado ou de forma inconsistente sem ela?
   - Já existe skill que cobre isso? Consulte o catálogo em `docs/catalog.md`. Se a sobreposição for grande, amplie a existente em vez de criar outra.
2. **Defina o escopo em uma frase** e escreva também o que fica de fora, apontando para a skill vizinha.
3. **Colete o conhecimento** na fonte: prática comprovada, documentação oficial, código real. Registre o que não pôde ser verificado; não preencha lacuna com suposição.
4. **Escreva três cenários de teste** antes do conteúdo: pedidos realistas em que a skill deve atuar, e o que se espera observar no resultado. Inclua um cenário em que ela **não** deve ser acionada.
5. **Escreva a descrição** (campo `description`): o que a skill faz, seguido de "Use quando..." com as situações e os termos que o usuário empregaria. É o único texto lido para decidir o acionamento.
6. **Escreva o `SKILL.md`** a partir de `templates/skill/SKILL.md`, com as seções obrigatórias.
7. **Mova o detalhe para `references/`**: tabelas extensas, modelos, catálogos e conteúdo usado só em parte dos casos. O `SKILL.md` diz quando abrir cada referência.
8. **Valide automaticamente**: `node scripts/validate.mjs`.
9. **Valide por cenário**: execute os três cenários com a skill instalada e compare com o esperado. Ajuste e repita.
10. **Atualize o ecossistema**: catálogo (`node scripts/validate.mjs --write-catalog`), `CHANGELOG.md` e a tabela de roteamento do agente principal quando a skill for nova.

## Padrões

**Nome**
- `kebab-case` em inglês, igual ao nome do diretório, estável ao longo do tempo. O conteúdo é em português.
- Descreve a competência, não a ferramenta nem a ação pontual. Skills de tecnologia específica usam o prefixo `stack-`.

**Descrição**
- Terceira pessoa, em uma linha, entre 150 e 800 caracteres.
- Primeiro o que faz; depois "Use quando" com gatilhos concretos.
- Sem promessas genéricas ("melhora a qualidade").

**Seções obrigatórias do `SKILL.md`**

| Seção | Conteúdo |
| --- | --- |
| Título e propósito | Uma ou duas frases com o resultado que a skill garante |
| `## Quando usar` | Situações de uso e os limites, com a skill vizinha para o que fica fora |
| `## Fluxo` | Passos numerados e executáveis, na ordem real do trabalho |
| `## Evite` | Erros frequentes e específicos do tema |
| `## Critérios de pronto` | Lista verificável; cada item pode ser respondido com sim ou não, com evidência |

Seções recomendadas: contexto a levantar, `## Padrões`, `## Exemplo`, `## Skills relacionadas`.

**Redação**
- Imperativo, direto, específico. Explique o motivo das regras que não são óbvias.
- Diga o que fazer; reserve proibições para riscos reais.
- Um exemplo concreto vale mais que um parágrafo abstrato.
- Não repita o que qualquer agente competente já sabe.
- Dados que mudam (versões, limites, preços, artigos de lei) são acompanhados da instrução de conferir a fonte vigente.
- Sem conteúdo copiado de terceiros; redação e exemplos próprios.

**Tamanho e divulgação progressiva**
- `SKILL.md` com até 200 linhas. Acima disso, mova conteúdo para `references/`.
- Referências com um nível de profundidade: o `SKILL.md` aponta para o arquivo; o arquivo não aponta para outro que precise ser lido em seguida.
- Arquivos de referência com mais de 300 linhas são divididos por assunto.

**Scripts**
- Inclua script apenas quando a operação for determinística e repetitiva. Sem dependências externas sempre que possível, com tratamento de erro e mensagem clara.
- A skill informa quando executar o script e o que esperar da saída.

**Agentes**
- Parta de `templates/agent/AGENT.md`. Um agente tem papel, não tema: ele combina skills para cumprir uma responsabilidade.
- A descrição diz quando delegar ao agente. As ferramentas são as mínimas para o papel (revisores e auditores não editam).
- O agente declara quais skills usa, o formato do que entrega e os limites do que não faz.

**Ciclo de vida**
- Mudança de comportamento da skill entra no `CHANGELOG.md`.
- Skill sem uso ou absorvida por outra é removida, não acumulada.

## Evite

- Skill que é uma lista de boas práticas genéricas sem fluxo.
- Duas skills para o mesmo problema.
- Descrição vaga, que aciona sempre ou nunca.
- `SKILL.md` gigante que carrega tudo em toda execução.
- Critérios de pronto que não podem ser verificados ("código de qualidade").
- Publicar sem executar os cenários.
- Declarar resultado de teste que não foi executado.

## Critérios de pronto

- [ ] Escopo sem sobreposição relevante com outra skill do catálogo.
- [ ] `node scripts/validate.mjs` sem erros.
- [ ] Descrição com o que faz e "Use quando".
- [ ] Fluxo executável do início ao fim, sem passo que dependa de adivinhação.
- [ ] Exemplos e comandos conferidos.
- [ ] Três cenários executados, com o resultado registrado no pull request.
- [ ] Catálogo, changelog e roteamento do agente principal atualizados.

## Skills relacionadas

- `prompt-engineering` para a redação de instruções para modelos.
- `technical-writing` para clareza e estrutura.
- `context-economy` para manter a skill enxuta.
