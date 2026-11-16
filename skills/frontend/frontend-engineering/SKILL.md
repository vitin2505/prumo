---
name: frontend-engineering
description: Constrói e revisa interfaces web com arquitetura de componentes, gestão de estado, busca de dados, responsividade, acessibilidade e performance. Use quando for criar ou alterar telas, componentes, formulários ou fluxos de navegação, ou quando uma interface estiver lenta, inacessível ou difícil de manter.
---

# Engenharia de Front-end

Entregar interfaces que funcionam para todo usuário, em qualquer tela, com código que outra pessoa consegue alterar sem medo. A ordem de prioridade é: correção funcional, acessibilidade, estados completos, performance percebida, refinamento visual.

## Quando usar

- Criar ou alterar páginas, componentes, formulários e navegação.
- Integrar a interface a uma API (carregamento, erro, cache, mutações).
- Corrigir problemas de responsividade, acessibilidade ou lentidão no cliente.

Não use para decidir identidade visual ou tokens (use `interface-design`) nem para convenções específicas de React/Next.js (use `stack-react-nextjs` em conjunto).

## Contexto a levantar antes de escrever código

1. Framework, versão e roteador em uso (leia o manifesto de dependências; não presuma).
2. Biblioteca de componentes, sistema de estilos e tokens existentes.
3. Como o projeto busca dados e guarda estado hoje. Siga o padrão existente antes de propor outro.
4. Um componente parecido já implementado, para copiar convenções de nome, pasta e teste.

## Fluxo

1. **Descreva a tela como estados, não como layout.** Para cada bloco de dados liste: vazio, carregando, sucesso, erro, parcial e sem permissão. O que não foi listado vira bug.
2. **Desenhe a árvore de componentes.** Separe componentes de apresentação (recebem props, não buscam dados) dos que orquestram dados. Um componente tem um motivo para mudar.
3. **Decida onde vive cada estado**, do mais local para o mais global:
   - estado derivável: não guarde, calcule;
   - estado de UI (aberto, aba ativa): local ao componente;
   - estado compartilhável por link (filtro, página, ordenação): URL;
   - estado do servidor: camada de cache de dados, nunca copiado para estado global;
   - estado global de cliente: só o que é realmente transversal (sessão, tema).
4. **Implemente em HTML semântico primeiro.** Elemento nativo correto (`button`, `a`, `label`, `nav`, `main`, `table`) antes de qualquer `div` com evento. ARIA só quando não existe elemento nativo.
5. **Estilize mobile-first.** Layout fluido com grid/flex e unidades relativas; pontos de quebra definidos pelo conteúdo, não por modelos de aparelho.
6. **Ligue os dados.** Trate cancelamento, corrida entre requisições, repetição e invalidação de cache. Mutações precisam de estado pendente, tratamento de erro e prevenção de duplo envio.
7. **Verifique** com os critérios de pronto abaixo, usando a aplicação em execução, não apenas a leitura do código.

## Padrões

**Formulários**
- Todo campo tem `label` associado; erro vinculado por `aria-describedby` e anunciado.
- Valide no cliente para ajudar e no servidor para proteger. A validação do cliente nunca é a única.
- Preserve o que o usuário digitou em caso de erro. Use `autocomplete` e `inputmode` corretos.

**Acessibilidade (alvo WCAG 2.2 nível AA)**
- Tudo operável por teclado, com foco visível e ordem lógica.
- Contraste mínimo 4,5:1 para texto normal e 3:1 para texto grande e elementos de interface.
- Modais prendem o foco e o devolvem ao fechar; conteúdo dinâmico usa regiões vivas.
- Respeite `prefers-reduced-motion`. Detalhes em [references/accessibility.md](references/accessibility.md).

**Performance**
- Meça antes de otimizar. Metas de referência de Core Web Vitals no percentil 75: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1.
- Imagens com dimensões declaradas, formato moderno e carregamento tardio fora da primeira dobra.
- Divida o código por rota; adie o que não é necessário para a primeira interação.
- Listas longas: paginação ou virtualização. Evite renderização repetida causada por identidade instável de props.

**Segurança no cliente**
- Nunca injete HTML não sanitizado. Nada de segredos no bundle: tudo que vai ao navegador é público.
- Autorização é decidida no servidor; esconder um botão não protege a ação.

## Evite

- Copiar estado do servidor para estado global e sincronizar manualmente.
- Efeitos colaterais usados para derivar dados que poderiam ser calculados na renderização.
- `div` clicável, ícone sem nome acessível, placeholder no lugar de label.
- Componentes "genéricos" com dezenas de props booleanas; prefira composição.
- Otimização (memoização, virtualização) sem medição que a justifique.
- Tratar só o caminho feliz: sem estado de erro, vazio ou carregamento.

## Critérios de pronto

- [ ] Todos os estados listados no passo 1 existem e foram exercitados.
- [ ] Fluxo principal concluído apenas com teclado, com foco visível.
- [ ] Layout íntegro em 320 px de largura e com zoom de 200%.
- [ ] Nenhum erro ou aviso novo no console durante o fluxo.
- [ ] Formulários: erro do servidor exibido, dados preservados, duplo envio impedido.
- [ ] Verificador de acessibilidade automatizado sem violações novas (cobre só parte dos problemas; não substitui o teste por teclado).
- [ ] Testes de componente cobrindo comportamento observável, não detalhes de implementação.

## Exemplo

Pedido: "Crie a tela de listagem de pedidos com filtro por status."

Decisões esperadas: filtro e página na URL (link compartilhável); lista como estado de servidor em cache com chave que inclui o filtro; estados vazio ("nenhum pedido com este status" com ação para limpar filtro), carregando (esqueleto com as dimensões finais para não gerar CLS) e erro (mensagem com botão de tentar de novo); tabela semântica com `th scope`, que vira lista de cartões abaixo do ponto de quebra; teste que filtra e verifica as linhas exibidas.

## Skills relacionadas

- `interface-design` para tokens, hierarquia visual e microinterações.
- `stack-react-nextjs` para convenções de React e Next.js.
- `api-design` quando o contrato consumido precisa mudar.
- `performance-engineering` para investigação de lentidão com medição.
- `testing-strategy` para decidir o que testar e em que nível.
