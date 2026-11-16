# Fluxos de trabalho

Um fluxo de trabalho descreve como agentes e skills se encadeiam para cumprir um tipo de tarefa de ponta a ponta. Os arquivos desta pasta são documentação para pessoas: explicam cada etapa, o que ela recebe e o que entrega.

A versão operacional, resumida, está embutida no agente [`lead-engineer`](../../agents/core/lead-engineer.md), na seção "Fluxos de trabalho". **Ao alterar um fluxo, atualize os dois lugares.**

| Fluxo | Quando usar | Documento |
| --- | --- | --- |
| Entrega de funcionalidade | Construir algo novo em um sistema existente | [feature-delivery.md](feature-delivery.md) |
| Correção de defeito | Erro, regressão ou comportamento inesperado | [bug-fix.md](bug-fix.md) |
| Auditoria de segurança | Avaliar a segurança de um repositório ou módulo | [security-audit.md](security-audit.md) |
| Projeto novo | Sair de uma ideia para um sistema em produção | [new-project.md](new-project.md) |

## Como os fluxos se comunicam entre etapas

Cada etapa entrega um artefato que a próxima consome. Isso mantém o trabalho verificável e permite retomar depois de uma interrupção.

| Etapa | Artefato entregue |
| --- | --- |
| Levantamento | Requisitos com critérios de aceite, escopo e premissas |
| Arquitetura | Desenho, tabela de trade-offs, ADRs |
| Planejamento | Plano com etapas, verificação e reversão |
| Implementação | Código e testes em commits pequenos |
| Revisão | Apontamentos classificados e veredito |
| Verificação | Relato com o que foi verificado, o que não foi e pendências |

## Regras comuns

1. Nenhuma etapa começa sem o artefato da anterior, ou sem a declaração explícita de que ela foi dispensada e por quê.
2. Revisão e verificação são feitas com olhar independente: por outro agente ou, no mínimo, relendo o diff como se fosse de outra pessoa.
3. Falha em uma etapa volta para a etapa que a originou, não é contornada.
4. Ações destrutivas, irreversíveis ou externas exigem autorização explícita de quem solicitou.
5. O fluxo se adapta ao tamanho da tarefa: em mudança pequena, etapas viram uma frase; nenhuma é ignorada em silêncio.
