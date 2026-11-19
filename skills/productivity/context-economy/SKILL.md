---
name: context-economy
description: Reduz o consumo de tokens e mantém a qualidade em sessões de desenvolvimento assistido por IA, com leitura direcionada, saídas enxutas, delegação criteriosa, resumo de estado e passagem de bastão entre sessões. Use quando uma sessão estiver longa ou cara, antes de explorar uma base de código grande, ao planejar tarefas extensas, ao reiniciar ou transferir uma sessão ou quando pedirem para economizar tokens.
---

# Economia de Contexto

Contexto é um recurso finito: o que entra na janela compete por atenção e tem custo. O objetivo é carregar o suficiente para decidir bem, e nada além. Economia nunca justifica pular uma verificação.

## Quando usar

- Antes de explorar repositório ou documento grande.
- Em tarefas longas, com muitas leituras e execuções.
- Quando a sessão se aproxima do limite ou as respostas degradam.
- Ao encerrar, pausar ou transferir o trabalho.

## Princípios

1. **Buscar antes de ler.** Localize pelo nome, símbolo ou padrão e leia o intervalo necessário.
2. **Não repetir.** O que já está na conversa e não mudou não precisa ser lido de novo.
3. **Preferir sinal a volume.** Dez linhas certas valem mais que mil linhas completas.
4. **Externalizar o estado.** O que precisa durar vai para um arquivo, não para a memória da conversa.
5. **Não cortar a evidência.** O erro original, o resultado da verificação e a confirmação do usuário são intocáveis.

## Fluxo

1. **Delimite a tarefa**: qual pergunta precisa ser respondida ou qual mudança feita. Sem isso, a exploração não tem critério de parada.
2. **Mapeie com baixo custo**: árvore de diretórios, manifestos, nomes de arquivos, busca por símbolo.
3. **Leia de forma direcionada**: o arquivo a alterar, um exemplo do padrão existente, os tipos e contratos envolvidos. Em arquivos grandes, apenas o intervalo relevante.
4. **Execute com saída controlada**: filtre para o que importa (erros, resumo, últimas linhas) e guarde a saída completa em arquivo quando puder ser necessária depois.
5. **Delegue quando compensar**: uma busca ampla ou uma leitura volumosa, da qual só a conclusão interessa, pode ir para um subagente, que devolve o resumo. Para consulta pontual, faça direto: iniciar outro contexto tem custo fixo.
6. **Registre o estado em marcos**: decisões, progresso e próximos passos em um arquivo de notas, para sobreviver a compactação ou a troca de sessão.
7. **Reinicie no ponto certo**: ao mudar de assunto ou ao concluir uma etapa, uma sessão nova com um bom resumo é melhor que uma sessão longa e carregada.

## Padrões

**Leitura**
- Busque por nome de arquivo ou conteúdo antes de abrir diretórios inteiros.
- Em arquivos de trava, código gerado, minificado ou dependências instaladas: não leia; consulte o trecho necessário por busca.
- Documentação extensa: localize a seção pelo índice.

**Saída de comandos**
- Testes: execute o subconjunto afetado durante o desenvolvimento e a suíte completa no final. Mostre falhas e resumo, não a lista de sucessos.
- Logs: a linha do erro, o rastro relevante e o comando executado. Preserve a mensagem exata, códigos de saída e versões.
- Comandos verbosos: use o modo silencioso ou filtre.

**Instruções permanentes**
- O arquivo de instruções do projeto contém apenas o que vale para toda sessão: comandos, convenções não óbvias, armadilhas. O que é específico de uma área vira skill, carregada sob demanda.
- Instale apenas as skills úteis ao projeto. Cada descrição de skill ocupa contexto em toda sessão.
- Evite dois fluxos de trabalho equivalentes ativos ao mesmo tempo: geram instruções conflitantes.

**Comunicação**
- Respostas na medida da pergunta. Não repita o código que acabou de ser escrito nem resuma o que o usuário acabou de ver.
- Relate o resultado e o que precisa de decisão; o caminho percorrido só interessa se muda uma decisão.

**Passagem de bastão**

Ao pausar, transferir ou reiniciar, escreva um resumo que permita a continuação por alguém sem a conversa: confira o estado real antes (`git status`, `git diff`, execução dos testes) e escreva só o que o repositório ou a conversa mostram. Se a sessão começou sem a conversa original, declare o que não há como saber (motivo do pedido, decisões e combinados) em vez de deduzir.

```markdown
## Objetivo
<o que está sendo feito e por quê>

## Estado
- Concluído: <itens, com arquivos>
- Em andamento: <item e ponto exato em que parou>
- Pendente: <itens>

## Decisões e motivos
- <decisão>: <motivo>

## Como verificar
<comandos e resultado esperado; estado atual dos testes>

## Atenção
<armadilhas descobertas, premissas não confirmadas, aprovações pendentes>

## Próximo passo
<a primeira ação concreta>
```

Ao retomar, confirme o estado real (situação do repositório, testes) antes de confiar no resumo.

**Custo de modelos**
- Use modelo menor para tarefas simples e mecânicas; reserve o mais capaz para raciocínio difícil.
- Prefixos estáveis e longos se beneficiam de cache de prompt: mantenha estável o início do contexto.

## O que nunca cortar

- A leitura do código antes de alterá-lo.
- Testes, revisões de segurança e verificações de qualidade pedidas pelo projeto.
- A mensagem de erro original e o resultado que sustenta uma conclusão.
- Confirmação do usuário em ação irreversível ou externa.

Se um corte tornar uma conclusão não verificável, ele foi grande demais.

## Evite

- Ler arquivos inteiros "para ter contexto".
- Reler o mesmo arquivo sem que tenha mudado.
- Despejar na conversa saídas completas de build, de testes ou de listagens.
- Subagente para tarefa trivial.
- Resumir a ponto de perder a causa de um erro.
- Prometer percentual de economia sem medição.
- Encerrar uma sessão longa sem registrar o estado.

## Critérios de pronto

- [ ] Arquivos lidos têm relação direta com a tarefa.
- [ ] Saídas de comando filtradas, com a evidência essencial preservada.
- [ ] Estado registrado em arquivo nos marcos de tarefas longas.
- [ ] Nenhuma verificação exigida foi omitida para economizar.
- [ ] Resumo de passagem de bastão permite continuar sem a conversa original.

## Skills relacionadas

- `implementation-planning` para dividir tarefas longas em etapas com marcos.
- `prompt-engineering` para instruções enxutas e eficazes.
- `skill-authoring` para skills com divulgação progressiva.
- `delivery-verification` para o que não pode ser cortado.
