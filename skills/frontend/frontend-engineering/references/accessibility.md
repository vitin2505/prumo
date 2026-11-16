# Acessibilidade: roteiro de verificação

Roteiro prático alinhado à WCAG 2.2 nível AA. Ferramentas automáticas detectam apenas uma parte dos problemas; os passos manuais abaixo são obrigatórios.

## 1. Teclado (manual)

1. Percorra o fluxo inteiro com `Tab`, `Shift+Tab`, `Enter`, `Espaço`, `Esc` e setas.
2. Confirme: todo controle é alcançável; a ordem segue a leitura visual; o foco nunca some nem fica preso; o indicador de foco é visível sobre qualquer fundo.
3. Em modais, menus e popovers: o foco entra ao abrir, fica contido enquanto aberto, `Esc` fecha e o foco volta ao elemento que abriu.

## 2. Estrutura e nomes

| Verificação | Como conferir |
| --- | --- |
| Um `h1` por página e níveis sem saltos | Liste os títulos pela árvore de acessibilidade |
| Regiões `header`, `nav`, `main`, `footer` presentes | Inspecione os landmarks |
| Todo controle tem nome acessível | Botão só com ícone precisa de `aria-label` ou texto oculto visualmente |
| Imagem informativa tem `alt` descritivo; decorativa tem `alt=""` | Leia o `alt` sem ver a imagem: faz sentido? |
| Link descreve o destino fora de contexto | Evite "clique aqui" |
| Idioma declarado em `html lang` | Necessário para a pronúncia correta do leitor de tela |

## 3. Formulários

- `label` associado por `for`/`id` ou envolvendo o campo.
- Campos obrigatórios indicados em texto, não apenas por cor ou asterisco sem legenda.
- Erro: texto próximo ao campo, ligado por `aria-describedby`, com `aria-invalid="true"`. Ao enviar com erros, mova o foco para o primeiro campo inválido ou para um resumo.
- Grupos de opções em `fieldset` com `legend`.
- Não limite tempo sem oferecer extensão; não bloqueie colar em campos de senha.

## 4. Percepção

- Contraste: 4,5:1 texto normal, 3:1 texto grande (a partir de 24 px, ou 18,66 px em negrito) e componentes de interface.
- Informação nunca transmitida apenas por cor: acrescente ícone, texto ou padrão.
- Conteúdo utilizável com zoom de 200% e reflow em 320 px sem rolagem horizontal.
- Alvos de toque com no mínimo 24×24 px (WCAG 2.2); 44×44 px é a meta recomendada em telas de toque.
- Animações: respeite `prefers-reduced-motion`; nada pisca mais de três vezes por segundo.

## 5. Conteúdo dinâmico

- Mensagens de status (salvo, erro, resultados carregados) em região viva: `role="status"` para avisos educados, `role="alert"` para erros urgentes.
- Troca de rota em aplicação de página única: mova o foco para o título principal ou anuncie a nova página.
- Carregamento: informe o estado ocupado (`aria-busy`) e anuncie a conclusão.

## 6. ARIA: regras de uso

1. Prefira o elemento nativo. `button` já tem papel, foco e teclado.
2. Não altere a semântica nativa sem necessidade.
3. Todo controle interativo com ARIA precisa funcionar por teclado.
4. Não esconda elementos focáveis com `aria-hidden="true"`.
5. Widgets compostos (abas, combobox, árvore) devem seguir o padrão de interação de teclado esperado para o papel declarado. Se não for implementar o padrão completo, use um componente consolidado.

## 7. Registro do resultado

Para cada problema encontrado, registre: critério afetado, local (rota e componente), como reproduzir, impacto para o usuário e correção proposta. Declare explicitamente o que não foi testado (por exemplo: leitor de tela específico, modo de alto contraste).
