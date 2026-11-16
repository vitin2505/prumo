---
name: interface-design
description: Projeta a camada visual e de interação de interfaces, definindo hierarquia, tipografia, cor, espaçamento, tokens de design, sistema de componentes com estados, microinterações e páginas de conversão. Use quando for criar ou redesenhar telas, landing pages ou componentes, estruturar ou evoluir um design system, definir tokens e temas ou quando uma interface parecer genérica, inconsistente ou confusa.
---

# Design de Interfaces

Boa interface comunica o que importa, na ordem certa, com o menor esforço para o usuário. Consistência vem de um sistema de decisões (tokens e componentes), não de ajustes tela a tela.

## Quando usar

- Criar ou redesenhar tela, fluxo, landing page ou componente.
- Criar ou evoluir design system, tokens e temas.
- Definir estados, microinterações e animações.

Para avaliar uma interface existente, use `ux-review`. Para a implementação em código, use `frontend-engineering`.

## Contexto a levantar

1. Quem usa, em que dispositivo e situação, e qual tarefa principal precisa concluir.
2. Identidade existente: marca, tokens, biblioteca de componentes. Trabalhe dentro do sistema antes de propor algo novo.
3. O conteúdo real. Projetar com texto de preenchimento esconde os problemas.

## Fluxo

1. **Defina o objetivo da tela em uma frase** e a ação principal. Uma tela, uma ação principal.
2. **Organize o conteúdo por prioridade** antes de qualquer decisão visual: o que o usuário precisa ver primeiro, depois e sob demanda.
3. **Estruture o layout** em escala de cinza: grade, agrupamento por proximidade, alinhamento. Se a hierarquia não funciona sem cor, a cor não vai salvá-la.
4. **Aplique o sistema**: tipografia, espaçamento, cor e elevação a partir dos tokens. Valores avulsos são exceção justificada.
5. **Desenhe todos os estados** de cada componente e de cada tela: padrão, foco, sobre, pressionado, desabilitado, carregando, vazio, erro, sucesso.
6. **Adicione movimento com propósito**: retorno a uma ação, continuidade entre estados, direção da atenção.
7. **Adapte** para telas pequenas e grandes, temas claro e escuro, textos longos, idiomas mais extensos e zoom.
8. **Verifique** contraste, alvos de toque, navegação por teclado e a tela com dados reais nos extremos (vazio, um item, mil itens, nome muito longo).

Estrutura de tokens e exemplos em [references/design-tokens.md](references/design-tokens.md).

## Padrões

**Hierarquia**
- Três níveis de ênfase bastam na maioria das telas: principal, secundário e de apoio.
- Crie hierarquia por tamanho, peso e contraste, nessa ordem de economia. Não use tudo ao mesmo tempo.
- Um único botão de ação principal por contexto; os demais são secundários ou de texto.
- Espaço em branco agrupa e separa: elementos relacionados ficam próximos; grupos distintos, afastados.

**Tipografia**
- Uma família para interface, no máximo duas no produto. Escala modular com poucos tamanhos.
- Texto corrido com no mínimo 16 px, altura de linha em torno de 1,5 e comprimento de 45 a 75 caracteres.
- Títulos com altura de linha menor. Números tabulares em tabelas e valores.

**Cor**
- Paleta com papéis, não com nomes: superfície, texto, borda, ação, e estados de sucesso, alerta e erro.
- Cor de destaque usada com parcimônia, para o que é interativo ou prioritário.
- Contraste mínimo de 4,5:1 para texto e 3:1 para elementos de interface. Nunca transmita informação só pela cor.
- Tema escuro é projetado, não invertido: superfícies em tons distintos, cores menos saturadas.

**Espaçamento e layout**
- Escala baseada em múltiplos de 4 px. Poucos valores, usados com consistência.
- Largura máxima para conteúdo de leitura. Grade fluida com pontos de quebra definidos pelo conteúdo.
- Alvos de toque de no mínimo 44×44 px em telas de toque.

**Componentes**
- Cada componente tem anatomia, variantes, tamanhos, estados e regras de uso documentados.
- Prefira composição de componentes pequenos a um componente com dezenas de opções.
- Antes de criar um componente novo, confirme que os existentes não resolvem.

**Formulários**
- Rótulo sempre visível acima do campo; texto de ajuda antes do erro; mensagem de erro que diz como corrigir.
- Uma coluna para a maioria dos formulários. Peça apenas o necessário.
- Valide ao sair do campo ou ao enviar, não a cada tecla desde o primeiro caractere.

**Movimento**
- Duração curta: cerca de 100 a 200 ms para retorno imediato, 200 a 400 ms para transições de maior área.
- Curvas de aceleração de saída para o que entra, de entrada para o que sai.
- Anime `transform` e `opacity`; evite animar propriedades que recalculam o layout.
- Respeite a preferência de movimento reduzido, oferecendo alternativa sem deslocamento.
- Movimento nunca atrasa a tarefa do usuário.

**Estados vazios, de carregamento e de erro**
- Vazio: explica o que apareceria ali e oferece a primeira ação.
- Carregamento: esqueleto com as dimensões finais; indicador de progresso para esperas longas.
- Erro: o que aconteceu, em linguagem simples, e o que fazer agora.

**Landing pages e conversão**
- A primeira dobra responde: o que é, para quem e por que importa, com uma chamada para ação clara.
- Uma página, um objetivo de conversão. A mesma chamada repetida nos pontos de decisão.
- Prova concreta perto da afirmação: números, depoimentos reais, demonstração. **Nunca invente depoimentos, clientes ou métricas.**
- Benefício antes de recurso; texto específico em vez de superlativo.
- Formulário curto; cada campo a mais reduz a conversão.
- Desempenho faz parte do design: página lenta perde o visitante antes da proposta.

## Evite

- Aparência genérica de modelo pronto: gradiente e cartões sem relação com o conteúdo.
- Vários elementos disputando o papel principal.
- Texto cinza claro sobre fundo branco; ícone sem rótulo para ação não universal.
- Valores de cor e de espaçamento avulsos fora do sistema.
- Animação decorativa, longa ou em laço.
- Projetar apenas o estado ideal, com dados perfeitos.
- Padrões que enganam o usuário: urgência falsa, opção pré-marcada, cancelamento escondido.

## Critérios de pronto

- [ ] Ação principal identificável em poucos segundos.
- [ ] Hierarquia legível em escala de cinza.
- [ ] Todos os valores vêm de tokens; exceções justificadas.
- [ ] Todos os estados desenhados, incluindo vazio, carregamento e erro.
- [ ] Contraste e alvos de toque conferidos com ferramenta.
- [ ] Funciona em 320 px, em tela larga, nos dois temas e com conteúdo extremo.
- [ ] Movimento com alternativa para preferência de movimento reduzido.
- [ ] Nenhuma informação de prova social inventada.

## Skills relacionadas

- `ux-review` para avaliar usabilidade e conversão.
- `frontend-engineering` para implementar com acessibilidade e performance.
- `stack-react-nextjs` para componentes em React.
- `technical-writing` para documentar o design system.
