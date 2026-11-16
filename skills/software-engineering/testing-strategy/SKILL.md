---
name: testing-strategy
description: Define e implementa testes automatizados eficazes, escolhendo o nível adequado (unitário, integração, contrato, ponta a ponta), aplicando TDD, projetando casos por comportamento e mantendo a suíte rápida e confiável. Use quando for escrever testes para código novo ou existente, corrigir um defeito com teste de regressão, decidir o que e como testar, melhorar cobertura útil ou lidar com testes lentos, frágeis ou instáveis.
---

# Estratégia de Testes

Testes existem para dar confiança de mudar o código. Um bom teste falha quando o comportamento quebra, passa quando o comportamento está correto, mesmo após refatoração, e diz claramente o que deu errado.

## Quando usar

- Escrever testes para funcionalidade nova ou para código sem cobertura.
- Corrigir defeito (sempre com teste que o reproduz).
- Definir a estratégia de testes de um projeto ou módulo.
- Suíte lenta, frágil ou com testes instáveis.

## Contexto a levantar

1. Executor de testes, bibliotecas e convenções já adotados. Leia testes existentes e siga o estilo.
2. O comando para rodar um teste, um arquivo e a suíte.
3. Como o projeto lida com banco, rede e tempo nos testes.

## Fluxo

1. **Liste os comportamentos** a garantir, do ponto de vista de quem usa a unidade: caminho principal, casos de borda, erros e regras de negócio. Cada comportamento vira um teste.
2. **Escolha o nível mais baixo que dá confiança real** para cada comportamento (tabela abaixo).
3. **Escreva o teste antes ou junto do código** (ciclo abaixo). Teste escrito muito depois tende a confirmar a implementação em vez de especificá-la.
4. **Veja o teste falhar** pelo motivo certo. Teste que nunca falhou não prova nada.
5. **Implemente o mínimo** para passar.
6. **Refatore** código e teste com a suíte verde.
7. **Execute a suíte completa** antes de concluir e relate o resultado real.

**Ciclo de TDD**

1. *Vermelho*: escreva um teste pequeno para o próximo comportamento e veja-o falhar.
2. *Verde*: escreva o código mais simples que o faz passar.
3. *Refatorar*: melhore o desenho sem mudar o comportamento.

Um comportamento por ciclo. Use quando a interface é razoavelmente conhecida; em exploração, prototipe primeiro e depois reescreva com testes.

## Padrões

**Níveis**

| Nível | Verifica | Características | Proporção |
| --- | --- | --- | --- |
| Unitário | Lógica e regras isoladas | Milissegundos, sem E/S | Maioria |
| Integração | Módulo com banco, fila ou framework reais | Segundos, ambiente controlado | Número relevante |
| Contrato | Compatibilidade entre consumidor e provedor de API | Rápido, por fronteira | Um por integração |
| Ponta a ponta | Jornada crítica do usuário no sistema montado | Lento, mais sujeito a instabilidade | Poucos |

Adapte a proporção ao sistema: em aplicações em que a lógica é a cola entre banco e interface, testes de integração dão mais confiança por teste do que unitários cheios de dublês.

**Anatomia**
- Nome que descreve o comportamento e a condição: `cancela pedido aberto e devolve o estoque`.
- Três partes visíveis: preparar, agir, verificar.
- Uma razão para falhar por teste.
- Dados relevantes explícitos no teste; o irrelevante vem de construtores de dados de teste com padrões.
- Sem lógica (condicionais, laços) dentro do teste.

**Teste o comportamento, não a implementação**
- Verifique pela interface pública: saída, estado observável, efeito na fronteira.
- Se refatorar sem mudar comportamento quebra o teste, o teste está acoplado demais.
- Não teste método privado diretamente.

**Dublês**
- Substitua apenas o que está fora do seu controle ou é lento e não determinístico: rede externa, relógio, aleatoriedade, serviços de terceiros.
- Prefira implementação falsa em memória a simulação com expectativas de chamada.
- Banco de dados: use o real nos testes de integração, isolando cada teste por transação revertida ou por limpeza.
- Não simule o que você não possui sem um teste de contrato que confirme a simulação.

**Projeto de casos**
- Valores de fronteira: zero, um, muitos; vazio; limite e limite mais um.
- Partições de equivalência: um caso por classe de entrada.
- Erros e entradas inválidas; permissão negada.
- Concorrência e repetição quando houver idempotência ou invariantes.
- Testes baseados em propriedades para regras que valem para qualquer entrada (ida e volta, invariantes, comparação com implementação simples).

**Determinismo**
- Controle o tempo, a aleatoriedade (semente fixa) e a ordem.
- Sem dependência entre testes nem de ordem de execução.
- Sem esperas fixas: aguarde a condição com tempo limite.
- Teste instável é defeito: isole, corrija ou remova. Não normalize repetir até passar.

**Defeitos**
- Todo defeito corrigido começa com um teste que o reproduz e falha; a correção o faz passar.

**Cobertura**
- É indicador do que não foi testado, não prova de qualidade. Cubra as decisões e os ramos que importam.
- Teste de mutação, quando disponível, revela testes que executam o código sem verificá-lo.

**Ponta a ponta**
- Apenas as jornadas críticas. Seletores por papel e nome acessível, não por classe de estilo.
- Dados criados por API antes do teste; cada teste independente.

## Evite

- Testes que só verificam se uma simulação foi chamada.
- Asserções vagas ("não é nulo") ou ausentes.
- Um teste que verifica muitos comportamentos.
- Copiar o resultado atual como esperado sem conferir se está correto.
- Alterar ou apagar um teste para fazê-lo passar sem entender por que falhou.
- Enfraquecer asserção, pular teste ou marcar como ignorado para "destravar".
- Afirmar que os testes passam sem tê-los executado.

## Critérios de pronto

- [ ] Cada comportamento listado tem teste, incluindo erros e bordas.
- [ ] Cada teste novo foi visto falhando antes de passar.
- [ ] Testes não dependem de ordem, de relógio real nem de rede externa.
- [ ] Suíte completa executada; resultado relatado com o comando e a contagem.
- [ ] Nenhum teste desativado ou enfraquecido sem justificativa registrada.
- [ ] Defeito corrigido tem teste de regressão.

## Exemplo

```ts
describe("cancelarPedido", () => {
  it("cancela pedido aberto e devolve o estoque", async () => {
    const pedido = await criarPedido({ status: "aberto", itens: [{ sku: "A1", quantidade: 2 }] });

    await cancelarPedido(usuarioDono(pedido), pedido.id);

    expect(await buscarPedido(pedido.id)).toMatchObject({ status: "cancelado" });
    expect(await estoqueDe("A1")).toBe(estoqueInicial("A1") + 2);
  });

  it("recusa cancelamento de pedido já enviado", async () => {
    const pedido = await criarPedido({ status: "enviado" });

    await expect(cancelarPedido(usuarioDono(pedido), pedido.id))
      .rejects.toThrow(PedidoJaEnviado);
  });

  it("responde como não encontrado para pedido de outra organização", async () => {
    const pedido = await criarPedido({ status: "aberto" });

    await expect(cancelarPedido(usuarioDeOutraOrganizacao(), pedido.id))
      .rejects.toThrow(PedidoNaoEncontrado);
  });
});
```

Três comportamentos, três testes; dados relevantes explícitos; verificação por estado observável.

## Skills relacionadas

- `code-quality` para refatorar com a proteção dos testes.
- `debugging` para reproduzir defeitos.
- `delivery-verification` para relatar resultados com evidência.
- `delivery-pipeline` para executar os testes na integração contínua.
- `api-design` para testes de contrato.
