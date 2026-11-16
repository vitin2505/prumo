# Política de segurança

## Escopo

Este repositório contém instruções em Markdown para assistentes de IA e dois scripts em Node.js sem dependências (`scripts/validate.mjs` e `scripts/install.mjs`). São consideradas falhas de segurança, por exemplo:

- instrução em skill ou agente que leve um assistente a executar ação destrutiva, expor segredos, desativar proteções ou agir contra sistemas de terceiros sem autorização;
- conteúdo que funcione como injeção de instruções (texto oculto, caracteres invisíveis, instruções disfarçadas em exemplos);
- comportamento dos scripts que escreva fora do destino informado, sobrescreva arquivos sem `--force` ou execute código não previsto;
- falha no workflow de integração contínua que permita execução de código não confiável com privilégios.

Recomendações técnicas incorretas ou desatualizadas que enfraqueçam a segurança de quem as segue também são tratadas como falha de conteúdo e têm prioridade.

## Como relatar

Use o relato privado de vulnerabilidades do GitHub: na página do repositório, aba **Security**, opção **Report a vulnerability**.

Não abra issue pública para falha de segurança ainda não corrigida.

Inclua no relato:

1. O arquivo e o trecho afetado.
2. O comportamento que a falha provoca e em que condições.
3. Passos para reproduzir, com dados fictícios.
4. Sugestão de correção, se houver.

## O que esperar

- Confirmação de recebimento e avaliação inicial assim que possível. Este é um projeto mantido de forma voluntária e não há prazo contratual de resposta.
- Correção publicada em nova versão, com registro no `CHANGELOG.md`.
- Crédito ao relator, se desejado.

## Versões com suporte

Apenas a versão mais recente do ramo principal recebe correções.

## Orientações de uso seguro

- **Revise antes de instalar.** Skills são instruções que um assistente seguirá. Leia o conteúdo de qualquer skill, deste ou de outro repositório, antes de ativá-la.
- **Revise antes de aprovar.** Skills e agentes orientam o assistente, mas não substituem a revisão humana de comandos, alterações e publicações.
- **Mantenha as confirmações ativas** para ações destrutivas, externas ou irreversíveis na ferramenta que você usa.
- **Auditorias são somente leitura.** As skills e os agentes de segurança deste repositório instruem a não testar contra ambientes reais e a não executar código do alvo fora de ambiente isolado.
- **Sem garantia.** Seguir as skills reduz riscos, mas não certifica que um sistema é seguro nem que atende a obrigações legais.
