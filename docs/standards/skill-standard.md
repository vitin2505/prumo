# Padrão de skills

Regras que toda skill do Prumo cumpre. As marcadas com **[auto]** são verificadas por `scripts/validate.mjs`; as demais fazem parte da revisão.

## Estrutura de arquivos

```text
skills/<categoria>/<nome-da-skill>/
├── SKILL.md              obrigatório
├── references/           opcional: detalhe aberto sob demanda
│   └── <assunto>.md
└── scripts/              opcional: automação determinística
```

- **[auto]** O diretório da skill tem o mesmo nome do campo `name`.
- **[auto]** Todo arquivo em `references/` é citado por link no `SKILL.md`.
- **[auto]** Não há diretórios vazios.

## Frontmatter

```yaml
---
name: nome-da-skill
description: O que a skill faz. Use quando <situações de acionamento>.
---
```

| Regra | Verificação |
| --- | --- |
| Apenas os campos `name` e `description` | **[auto]** |
| `name` em kebab-case minúsculo, até 64 caracteres, único no repositório | **[auto]** |
| `name` em inglês, descrevendo a competência; prefixo `stack-` para tecnologia específica | revisão |
| `description` entre 150 e 800 caracteres, em uma linha | **[auto]** |
| `description` contém "Use quando" | **[auto]** |
| `description` sem os caracteres `<` e `>` | **[auto]** |
| `description` em terceira pessoa, com os termos que o usuário usaria | revisão |

A descrição é o único texto considerado para decidir se a skill será carregada. Uma descrição vaga faz a skill nunca acionar ou acionar sempre.

## Corpo do SKILL.md

| Regra | Verificação |
| --- | --- |
| Título de nível 1 | **[auto]** |
| Seções `## Quando usar`, `## Fluxo`, `## Evite`, `## Critérios de pronto` presentes e não vazias | **[auto]** |
| `## Fluxo` com passos numerados | **[auto]** |
| `## Critérios de pronto` como lista de verificação (`- [ ]`) | **[auto]** |
| Até 200 linhas | **[auto]** |
| Sem marcadores de pendência (`TODO`, `TBD`, `FIXME`) | **[auto]** |
| Links relativos válidos e dentro do repositório | **[auto]** |
| Skills citadas em `## Skills relacionadas` existem | **[auto]** |
| Arquivos de referência com até 300 linhas | **[auto]** |

### O que cada seção deve conter

- **Propósito** (logo abaixo do título): o resultado que a skill garante, em uma ou duas frases.
- **Quando usar**: situações concretas e o limite da skill, apontando a vizinha para o que fica fora.
- **Fluxo**: passos na ordem real do trabalho, cada um executável sem adivinhação. O último passo é uma verificação.
- **Padrões**: regras técnicas específicas, com o motivo quando não for óbvio.
- **Evite**: erros frequentes e específicos do tema, não genéricos.
- **Critérios de pronto**: itens que se respondem com sim ou não, com evidência.
- **Exemplo**: um caso concreto e curto.
- **Skills relacionadas**: quando recorrer a cada uma.

## Qualidade do conteúdo (revisão)

1. **Muda o comportamento.** Cada instrução acrescenta algo que um agente competente não faria sozinho. O que é óbvio sai.
2. **Específico.** "Use paginação por cursor em coleções grandes" em vez de "pagine adequadamente".
3. **Explica o porquê** das regras não óbvias, para que sejam aplicadas com critério.
4. **Verdadeiro e verificado.** Comandos e exemplos foram executados ou conferidos. Nada é afirmado sem base.
5. **Honesto sobre o que muda.** Versões, limites, preços e artigos de lei trazem a instrução de conferir a fonte vigente.
6. **Original.** Redação e exemplos próprios. Sem conteúdo copiado e sem menção a autores, produtos ou projetos de terceiros na identidade da skill. Padrões e normas reconhecidos (OWASP, WCAG, RFCs, legislação) são citados pelo nome.
7. **Enxuto.** Sem repetição, sem introdução longa, sem ênfase em maiúsculas.
8. **Sem sobreposição.** O escopo não repete o de outra skill; onde se tocam, uma aponta para a outra.
9. **Seguro.** Nenhuma instrução para desativar proteções, expor segredos, agir contra ambientes reais sem autorização ou executar ação destrutiva sem confirmação.

## Scripts em skills

- Apenas para operações determinísticas e repetitivas.
- Sem dependências externas sempre que possível; quando houver, declaradas e justificadas.
- Tratam erros com mensagem que orienta a correção.
- Não acessam rede nem alteram arquivos fora do escopo declarado.
- O `SKILL.md` informa quando executar e o que esperar.

## Como validar

```bash
node scripts/validate.mjs
```

Depois da validação automática, siga o [portão de qualidade](quality-gate.md), que inclui os testes por cenário.
