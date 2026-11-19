# Guia de início

Do zero ao primeiro uso, em linguagem direta.

## 1. Conceitos em um minuto

- **Skill**: uma pasta com um arquivo `SKILL.md` que ensina o assistente a fazer um tipo de trabalho de um jeito específico. O assistente só carrega a skill quando ela é útil para o pedido, ou quando você a chama pelo nome.
- **Agente**: um papel (revisor, auditor, arquiteto) com instruções, ferramentas e limites próprios, que usa as skills.
- **Guardar não é instalar.** Clonar este repositório não ativa nada. Uma skill só passa a valer depois de copiada para a pasta `.claude/skills/` do projeto (ou do usuário), ou de instalada como plugin.

## 2. Escolha a forma de instalar

| Situação | Forma recomendada |
| --- | --- |
| Quero tudo, em todos os projetos | Plugin |
| Quero só algumas skills em um projeto | Instalador com `--skills` |
| Quero testar uma skill | Cópia manual |

As instruções de cada forma estão no [README](../../README.md#instalação).

## 3. Conjuntos sugeridos

Instale o conjunto base e acrescente o que o projeto usa. Menos skills instaladas significa menos contexto ocupado em cada sessão.

**Base (qualquer projeto de software)**

```bash
node prumo/scripts/install.mjs --target . --skills code-quality,testing-strategy,debugging,delivery-verification,git-workflow,secure-coding
```

**Acrescente conforme o projeto**

| Projeto | Skills adicionais |
| --- | --- |
| Aplicação web com React ou Next.js | `frontend-engineering`, `stack-react-nextjs`, `interface-design` |
| API em Node.js ou NestJS | `backend-engineering`, `stack-typescript-node`, `api-design`, `data-modeling` |
| Aplicação Django ou automação em Python | `backend-engineering`, `stack-python-django`, `data-modeling` |
| Sistema com dados pessoais | `privacy-lgpd`, `threat-modeling` |
| Integração com serviços externos | `resilient-integrations`, `observability` |
| Recurso com modelo de linguagem | `llm-engineering`, `prompt-engineering` |
| Projeto novo, ainda em definição | `requirements-discovery`, `system-architecture`, `implementation-planning` |
| Preparação para produção | `delivery-pipeline`, `observability`, `performance-engineering` |
| Landing page ou redesenho | `interface-design`, `ux-review`, `frontend-engineering` |

Para instalar os agentes junto, acrescente `--agents`.

## 4. Confirme que funcionou

1. Abra o assistente na pasta do projeto.
2. Pergunte quais skills estão disponíveis, ou digite `/` e procure o nome.
3. Se a pasta `.claude/skills` não existia quando a sessão começou, recarregue as skills ou reinicie a sessão.

## 5. Primeiro uso

**Deixe a skill ser acionada pelo pedido** (funciona melhor em pedidos que usam os termos da descrição; no teste por cenário da versão 0.1.2, sessões sem agente carregaram skill em 5 de 19 execuções):

```text
Crie o endpoint de cancelamento de pedido, com testes.
```

**Ou chame pelo nome:**

```text
/code-review revise as alterações pendentes
```

**Use o agente principal para tarefas de ponta a ponta** (é a forma recomendada: ele seleciona e carrega as skills pelo protocolo):

```bash
claude --agent lead-engineer
```

**Ou delegue a um especialista:**

```text
Use o agente security-auditor para auditar src/auth.
```

## 6. Bons hábitos

- **Dê contexto no pedido**: o objetivo, o que já existe e como saber que deu certo.
- **Leia o relato final.** Toda entrega traz o que foi verificado e o que não foi. O que está em "não verificado" é responsabilidade sua conferir.
- **Revise antes de aprovar** comandos, alterações e publicações. As skills orientam o assistente, mas a decisão é sua.
- **Não ative dois métodos concorrentes.** Se o projeto já usa outro conjunto de skills para a mesma tarefa (por exemplo, outro fluxo de TDD), escolha um.
- **Mantenha atualizado.** Em instalação por cópia, repita o instalador com `--force` depois de atualizar o repositório. Skills que você alterou localmente serão sobrescritas: guarde suas mudanças antes.

## 7. Problemas comuns

| Sintoma | Causa provável | Solução |
| --- | --- | --- |
| A skill não aparece na lista | Copiada com a pasta da categoria, ou fora de `.claude/skills/` | O caminho deve ser `.claude/skills/<nome>/SKILL.md` |
| A skill não é acionada sozinha | O modelo decide pela descrição e muitas vezes resolve sem carregar nada | Entre com `claude --agent lead-engineer` ou chame a skill pelo nome |
| Link de referência não abre | Só o `SKILL.md` foi copiado | Copie a pasta inteira, com `references/` |
| O agente diz que a skill não está disponível | Agentes instalados sem as skills que usam | Instale as skills citadas na seção "Skills" do agente |
| Nomes com prefixo `prumo:` | Instalação por plugin | Use `/prumo:nome-da-skill` e `prumo:lead-engineer` |

## 8. Próximos passos

- Conheça todas as skills no [catálogo](../catalog.md).
- Veja como os agentes se encadeiam em [fluxos de trabalho](../workflows/README.md).
- Crie a sua skill com o [padrão de skills](../standards/skill-standard.md).
