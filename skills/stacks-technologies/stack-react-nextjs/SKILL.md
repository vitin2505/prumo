---
name: stack-react-nextjs
description: Aplica convenções de React e Next.js com App Router, cobrindo componentes de servidor e de cliente, busca de dados, ações de servidor, cache, roteamento, estado e efeitos. Use quando for escrever ou revisar componentes React, páginas, layouts, rotas ou ações em Next.js, decidir entre renderização no servidor e no cliente ou diagnosticar erros de hidratação, renderizações repetidas e problemas de cache.
---

# Stack: React e Next.js

Convenções de stack. Arquitetura de interface, acessibilidade e performance estão em `frontend-engineering`; aqui fica o que é específico de React e Next.js.

## Quando usar

- Componentes, hooks, páginas, layouts, rotas e ações em React e Next.js.
- Decisão sobre onde renderizar e onde buscar dados.
- Erros de hidratação, laços de efeito, cache inesperado.

## Antes de escrever

1. Confirme as versões de `react` e `next` no `package.json` e o roteador em uso (diretório `app` ou `pages`).
2. **O comportamento do Next.js muda entre versões principais**, em especial o cache de requisições e de rotas, a forma de acessar parâmetros e as convenções de arquivos. Consulte a documentação da versão instalada antes de afirmar como algo se comporta. Não aplique de memória regra de outra versão.
3. Siga os padrões já presentes no projeto para dados, estilos e formulários.

## Fluxo

1. **Divida a tela em componentes** e marque quais precisam de interatividade.
2. **Comece no servidor.** No App Router, componentes são de servidor por padrão. Adicione `"use client"` apenas onde houver estado, efeito, evento ou API do navegador, o mais perto possível das folhas da árvore.
3. **Busque dados onde são usados**, no servidor, em paralelo quando independentes. Use `Suspense` para transmitir partes lentas sem bloquear a página.
4. **Mutações por ação de servidor ou rota de API**, com validação e autorização dentro da própria ação.
5. **Declare a estratégia de cache** de cada dado de forma explícita e revalide após mutações.
6. **Trate carregamento e erro** com os arquivos de convenção da rota (`loading`, `error`, `not-found`).
7. **Verifique** na aplicação em execução, com build de produção: o comportamento de cache difere do modo de desenvolvimento.

## Padrões

**React**
- Componentes e hooks são puros: mesma entrada, mesma saída, sem mutação de props ou estado.
- Estado mínimo. O que pode ser calculado a partir de props ou de outro estado não é guardado.
- Efeitos servem para sincronizar com sistemas externos (assinaturas, DOM imperativo, rede fora do framework). Não use efeito para derivar estado, reagir a evento do usuário ou encadear atualizações.
- Todo efeito que assina, agenda ou busca tem função de limpeza.
- `key` estável e única em listas, vinda do dado. Índice como chave quebra o estado quando a lista muda. Trocar a `key` é a forma correta de reiniciar o estado de um componente.
- Suba o estado até o ancestral comum mais próximo, não mais. Contexto para o que é realmente transversal e muda pouco.
- Composição com `children` em vez de props que configuram tudo.
- Memoização manual (`memo`, `useMemo`, `useCallback`) só com problema medido. Se o projeto usa o compilador do React, não memoize à mão.
- Formulários: controle apenas o que precisa de validação a cada tecla; use os recursos de ações e de estado pendente da versão instalada.

**Componentes de servidor e de cliente**
- Componente de servidor pode acessar banco, segredos e sistema de arquivos; seu código não vai ao navegador.
- Componente de cliente não importa módulo exclusivo de servidor. Proteja módulos sensíveis com o pacote `server-only`.
- Props que cruzam do servidor para o cliente precisam ser serializáveis e **são visíveis ao usuário**: não passe o objeto inteiro do banco, apenas os campos necessários.
- Um componente de servidor pode ser passado como `children` para um de cliente; o inverso por importação não é possível.
- Provedores de contexto são componentes de cliente posicionados o mais fundo possível.

**Ações de servidor**
- Toda ação de servidor é um endpoint público alcançável por qualquer pessoa. Dentro de cada uma: autentique, autorize sobre o recurso e valide a entrada por esquema.
- Devolva resultado tipado para erros esperados; revalide o cache dos dados afetados.

**Dados e cache**
- Evite cascata: dispare requisições independentes em paralelo.
- Dados por usuário nunca em cache compartilhado.
- Deduplicação por requisição para dados usados em vários componentes.
- Variáveis de ambiente: só as com prefixo `NEXT_PUBLIC_` chegam ao navegador, e são públicas.

**Roteamento e metadados**
- Layouts para o que persiste entre páginas; grupos de rotas para organizar sem afetar a URL.
- Metadados pela API de metadados; `next/image` com dimensões; `next/font` para evitar deslocamento de layout; `next/link` para navegação interna.
- Estado de filtro, busca e paginação na URL.

**Hidratação**
- O HTML do servidor e a primeira renderização do cliente devem ser idênticos. Causas comuns de divergência: data e hora atuais, valores aleatórios, `window` ou `localStorage` durante a renderização, formatação dependente de localidade, HTML inválido (por exemplo, `div` dentro de `p`).

## Evite

- `"use client"` no topo da árvore, transformando a aplicação inteira em cliente.
- Buscar em efeito no cliente o que pode ser buscado no servidor.
- Ação de servidor sem verificação de autorização.
- Segredo em componente de cliente ou em variável `NEXT_PUBLIC_`.
- Efeito que atualiza estado derivado de outro estado.
- Definir componente dentro de outro componente (recria e perde o estado a cada renderização).
- Suprimir aviso de hidratação em vez de corrigir a causa.
- Afirmar comportamento de cache sem conferir a versão.

## Critérios de pronto

- [ ] Build de produção concluído sem erros nem avisos novos.
- [ ] Verificação de tipos e lint limpos, incluindo as regras de hooks.
- [ ] Sem erros de hidratação no console.
- [ ] `"use client"` restrito aos componentes interativos.
- [ ] Toda ação de servidor e rota com autenticação, autorização e validação.
- [ ] Estados de carregamento e erro presentes na rota.
- [ ] Cache e revalidação exercitados no build de produção.

## Skills relacionadas

- `frontend-engineering` para arquitetura, acessibilidade e performance.
- `stack-typescript-node` para tipagem e código de servidor.
- `interface-design` para sistema visual.
- `secure-coding` para ações de servidor e dados expostos.
- `testing-strategy` para testes de componente e ponta a ponta.
