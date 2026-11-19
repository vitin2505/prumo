---
name: code-quality
description: Orienta a escrita e a refatoração de código legível e sustentável, aplicando nomes claros, funções coesas, módulos profundos, princípios SOLID, padrões de projeto com critério e refatoração segura em passos pequenos. Use quando for escrever código novo que precisa durar, refatorar, reduzir duplicação ou complexidade, decidir se um padrão de projeto se aplica ou quando o código estiver difícil de entender, testar ou alterar.
---

# Qualidade de Código

Código é lido muito mais vezes do que é escrito. Qualidade é o que torna a próxima mudança barata e segura: clareza para quem lê, baixo acoplamento para quem altera e testes para quem refatora.

## Quando usar

- Escrever código que será mantido.
- Refatorar para viabilizar uma mudança ou reduzir complexidade.
- Avaliar se um princípio ou padrão de projeto se aplica.
- Código difícil de entender, de testar ou de alterar sem quebrar outra parte.

Para avaliar o código de outra pessoa, use `code-review`.

## Fluxo

**Ao escrever código novo**

1. Leia o código vizinho e siga as convenções existentes: consistência local vale mais que preferência pessoal.
2. Escreva primeiro a interface (assinatura, tipos, contrato) pensando em quem chama.
3. Implemente a solução mais simples que atende ao requisito atual.
4. Releia como se fosse de outra pessoa: os nomes dizem a intenção? Há algo surpreendente?
5. Simplifique antes de concluir: remova o que não é usado, desfaça abstrações que não se pagaram.

**Ao refatorar**

1. **Defina o objetivo**: que mudança futura fica mais fácil? Refatoração sem objetivo não termina.
2. **Garanta a rede de proteção.** Há testes cobrindo o comportamento atual? Se não, escreva testes de caracterização antes de tocar no código. Esses testes ficam no repositório, cobrindo os ramos sem cobertura; uma comparação em script temporário ajuda, mas não substitui a rede que protege a próxima alteração.
3. **Separe de mudança de comportamento.** Commits de refatoração não alteram o que o código faz.
4. **Avance em passos pequenos**, cada um deixando os testes verdes. Catálogo em [references/refactoring-catalog.md](references/refactoring-catalog.md).
5. **Execute os testes a cada passo.** Falhou: reverta o passo, não depure em cima.
6. **Pare quando o objetivo for atingido.** Melhorias fora do escopo são registradas, não incluídas.

## Padrões

**Nomes**
- Revelam a intenção e usam o vocabulário do domínio. Se precisa de comentário para explicar, o nome está errado.
- Funções são verbos, valores são substantivos, booleanos são afirmações (`estaAtivo`, `podeCancelar`).
- Comprimento proporcional ao escopo. Sem abreviações que não sejam universais.
- Um conceito, uma palavra em toda a base.

**Funções**
- Fazem uma coisa, em um único nível de abstração.
- Poucos parâmetros; vários parâmetros relacionados viram um objeto. Parâmetro booleano que muda o comportamento indica duas funções.
- Sem efeito colateral escondido: o nome diz o que ela faz, inclusive o que altera.
- Retornos antecipados para casos de borda, deixando o caminho principal sem aninhamento.
- Separe consulta (devolve valor) de comando (altera estado).

**Módulos**
- Interface pequena escondendo implementação substancial: um módulo é bom quando quem usa precisa saber pouco.
- Alta coesão: o que muda junto fica junto. Baixo acoplamento: depender de poucas coisas, e estáveis.
- Dependências explícitas, recebidas de fora, em uma só direção. Sem ciclos.
- Estado mutável compartilhado é a principal fonte de defeitos: minimize, isole e prefira dados imutáveis.

**SOLID, como perguntas práticas**

| Princípio | Pergunta | Sinal de violação |
| --- | --- | --- |
| Responsabilidade única | Este módulo muda por mais de um motivo de negócio? | Mudanças não relacionadas tocam o mesmo arquivo |
| Aberto/fechado | Adicionar um caso exige editar código já testado em vários lugares? | Cadeias de `if`/`switch` sobre tipo repetidas pela base |
| Substituição de Liskov | Um subtipo pode ser usado onde o tipo base é esperado sem surpresa? | Subclasse que lança erro em método herdado ou reforça pré-condição |
| Segregação de interfaces | Quem usa a interface é obrigado a depender do que não usa? | Implementações com métodos vazios |
| Inversão de dependência | A regra de negócio depende de detalhe de infraestrutura? | Domínio importando cliente HTTP ou ORM |

São heurísticas para localizar problemas, não metas. Aplicar todos em todo lugar produz excesso de engenharia.

**Padrões de projeto**
- Use quando o problema que o padrão resolve já existe no código, não por antecipação.
- Mais úteis no dia a dia: estratégia (variar algoritmo), adaptador (isolar dependência externa), fábrica (centralizar criação complexa), decorador (acrescentar comportamento), observador (desacoplar reação a eventos), repositório (isolar persistência).
- Prefira composição a herança. Em linguagens com funções de primeira classe, muitos padrões se reduzem a passar uma função.
- Nomeie o padrão no código apenas se ajudar o leitor.

**Duplicação**
- Elimine duplicação de conhecimento (a mesma regra em dois lugares), não coincidência de forma.
- Tolere duas ocorrências; abstraia na terceira, quando o padrão estiver claro. Abstração errada custa mais que duplicação.

**Erros**
- Trate onde há contexto para decidir; caso contrário, deixe propagar.
- Mensagens dizem o que aconteceu e com qual dado, sem informação sensível.
- Não use exceção para fluxo normal nem `null` para sinalizar erro.

**Comentários**
- Explicam o porquê: decisão não óbvia, restrição externa, alternativa descartada.
- Não repetem o que o código diz. Código comentado é removido: o histórico guarda.

**Simplicidade**
- Não implemente o que nenhum requisito atual pede.
- Menos código, menos configuração, menos camadas, enquanto atender.
- O que é difícil de testar costuma estar mal desenhado: use a dificuldade como sinal.

## Evite

- Abstração prematura: interface com uma implementação, configuração para variação que não existe.
- Funções longas com vários níveis de aninhamento.
- Nomes genéricos: `dados`, `info`, `manager`, `util`, `helper`, `processar`.
- Obsessão por primitivos: `string` para e-mail, CPF e dinheiro.
- Refatorar e mudar comportamento no mesmo commit.
- Refatorar sem testes.
- Reescrever do zero o que poderia ser melhorado aos poucos.
- "Melhorar" código fora do escopo da tarefa sem combinar.

## Critérios de pronto

- [ ] O código segue as convenções do projeto (lint e formatação limpos).
- [ ] Nomes revelam a intenção, sem comentário explicando o quê.
- [ ] Sem código morto, comentado ou não utilizado no diff.
- [ ] Cada abstração nova tem pelo menos dois usos reais ou é fronteira de infraestrutura ou de teste.
- [ ] Em refatoração: testes existiam antes, passam depois, e o comportamento não mudou.
- [ ] O diff contém apenas o que a tarefa pede.

## Exemplo

Antes:

```ts
function proc(p: any, f: boolean) {
  if (p.st == 1) {
    if (f) { p.tot = p.tot * 0.9; }
    // ...
  }
}
```

Depois:

```ts
const DESCONTO_FIDELIDADE = 0.1;

function aplicarDescontoFidelidade(pedido: PedidoAberto): PedidoAberto {
  return { ...pedido, total: pedido.total * (1 - DESCONTO_FIDELIDADE) };
}
```

Mudanças: nome que revela a intenção; o tipo `PedidoAberto` torna desnecessária a verificação de estado; a constante nomeia o número mágico; o parâmetro booleano virou decisão de quem chama; sem mutação do argumento.

## Skills relacionadas

- `code-review` para avaliar código alheio.
- `testing-strategy` para a rede de proteção da refatoração.
- `debugging` quando o problema é um defeito, não o desenho.
- `system-architecture` para decisões acima do nível de módulo.
- `git-workflow` para separar refatoração de mudança de comportamento.
