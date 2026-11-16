# Modelos de documentos

Copie o modelo, remova as seções que não se aplicam e nunca deixe seção vazia.

## README de projeto

```markdown
# <Nome do projeto>

<Uma frase: o que é e para quem.>

## Visão geral

<O problema que resolve e as principais capacidades, em poucas linhas.>

## Pré-requisitos

- <Ferramenta> <versão>

## Como executar

1. <passo>
2. <passo>

Resultado esperado: <como saber que funcionou>.

## Configuração

| Variável | Obrigatória | Descrição | Exemplo |
| --- | --- | --- | --- |

## Testes

<comando e o que ele cobre>

## Arquitetura

<Diagrama de alto nível e link para a documentação detalhada.>

## Como contribuir

<Link para o guia de contribuição.>

## Licença

<Nome da licença e link para o arquivo.>
```

## ADR (registro de decisão arquitetural)

Arquivo: `docs/adr/NNNN-titulo-em-kebab-case.md`. Um ADR registra uma decisão. ADR aceito não é editado: uma nova decisão o substitui e os dois são vinculados.

```markdown
# NNNN. <Título como decisão: "Usar X para Y">

- **Status:** proposto | aceito | substituído por NNNN | descontinuado
- **Data:** AAAA-MM-DD
- **Decisores:** <papéis>

## Contexto

<Situação, forças em jogo, restrições e requisitos de qualidade relevantes. Fatos, não a solução.>

## Opções consideradas

1. <Opção A>: <resumo>
2. <Opção B>: <resumo>

## Decisão

<A opção escolhida e o motivo principal, em voz ativa: "Adotaremos...".>

## Consequências

- **Positivas:** <o que fica melhor>
- **Negativas:** <o que fica pior ou mais caro>
- **Riscos e mitigação:** <o que pode dar errado e como será acompanhado>

## Critério de revisão

<Condição que deve provocar a reavaliação desta decisão.>
```

Registre em ADR o que for difícil de reverter, afetar mais de um módulo ou contrariar a expectativa de quem chega depois. Escolhas triviais não precisam de ADR.

## Runbook operacional

```markdown
# Runbook: <sintoma ou alerta>

- **Severidade típica:** <nível>
- **Dono:** <equipe>
- **Última validação:** AAAA-MM-DD

## Sintoma

<O que o alerta ou o usuário relata.>

## Impacto

<Quem é afetado e como.>

## Diagnóstico

1. <Verificação> → se <resultado>, vá para <seção>.
2. <Verificação>

## Mitigação

1. <Ação segura e reversível primeiro.>

## Reversão

<Como desfazer a mitigação.>

## Escalonamento

<Quando e para quem.>

## Pós-incidente

<O que registrar e onde.>
```

## Especificação técnica

```markdown
# Especificação: <funcionalidade>

- **Status:** rascunho | em revisão | aprovada
- **Autores e revisores:** <papéis>

## Problema

<Qual dor, de quem, com que evidência.>

## Objetivos e não objetivos

- Objetivo: <resultado mensurável>
- Não objetivo: <o que fica explicitamente fora>

## Requisitos

| ID | Requisito | Tipo | Critério de aceite |
| --- | --- | --- | --- |
| RF-01 | <descrição> | funcional | Dado..., quando..., então... |
| RNF-01 | <descrição> | não funcional | <métrica e limite> |

## Solução proposta

<Desenho, fluxos, contratos, modelo de dados. Diagramas quando ajudarem.>

## Alternativas descartadas

<Opção e motivo.>

## Riscos e questões em aberto

| Item | Impacto | Encaminhamento |
| --- | --- | --- |

## Plano de entrega e reversão

<Etapas, sinalizadores, migrações, como desfazer.>

## Verificação

<Como será demonstrado que os critérios de aceite foram atendidos.>
```

## Entrada de changelog

Formato por versão, mais recente no topo, agrupado por tipo de mudança:

```markdown
## [1.2.0] - AAAA-MM-DD

### Adicionado
- <capacidade nova, do ponto de vista de quem usa>

### Alterado
- <mudança de comportamento>

### Corrigido
- <defeito corrigido>

### Removido
- <o que deixou de existir; destaque mudanças incompatíveis>
```
