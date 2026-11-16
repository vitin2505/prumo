---
name: implementation-planning
description: Transforma um objetivo ou especificação em plano de execução com fatias verticais pequenas, ordem por risco e dependência, critério de verificação por etapa e pontos de reversão. Use quando uma tarefa envolver vários arquivos, etapas ou incertezas, antes de iniciar uma funcionalidade, refatoração ampla ou migração, ou quando pedirem plano, cronograma técnico ou divisão em tarefas.
---

# Planejamento de Implementação

Um bom plano reduz o risco cedo, mantém o sistema funcionando a cada passo e deixa claro como saber que cada etapa terminou.

## Quando usar

- Trabalho que toca vários arquivos, camadas ou sistemas.
- Refatoração ampla, migração de dados ou troca de tecnologia.
- Tarefa com incerteza relevante sobre como fazer.

Não planeje formalmente o que cabe em uma alteração simples e óbvia: execute e verifique.

## Fluxo

1. **Declare o objetivo e a definição de pronto** em termos observáveis. Sem isso, o plano não tem fim.
2. **Investigue antes de planejar.** Leia o código envolvido, encontre o padrão existente para o que será feito, identifique os pontos de integração. Planos escritos sem ler o código falham no primeiro passo.
3. **Liste incertezas e riscos**: o que não se sabe, o que pode quebrar, o que é irreversível.
4. **Divida em fatias verticais.** Cada fatia atravessa as camadas necessárias e entrega um comportamento verificável de ponta a ponta. Evite fatias horizontais ("todo o banco", depois "toda a API"), que só mostram resultado no final.
5. **Ordene**:
   - primeiro o que reduz a maior incerteza (a prova do ponto mais arriscado);
   - depois o esqueleto que conecta as partes de ponta a ponta;
   - então as fatias de valor, respeitando dependências;
   - acabamento e casos raros por último.
6. **Para cada etapa, defina**: o que muda, quais arquivos ou áreas, como verificar (comando, teste, comportamento) e como desfazer.
7. **Identifique o que pode ser paralelo** e o que precisa de decisão ou autorização de alguém.
8. **Marque os pontos de verificação** em que o plano deve ser reavaliado, especialmente depois da etapa de maior risco.
9. **Apresente o plano** de forma curta. Peça confirmação apenas se houver decisão que pertence ao solicitante ou ação irreversível; caso contrário, execute.
10. **Durante a execução, mantenha o plano vivo.** Descobertas que invalidam uma premissa mudam o plano explicitamente, não em silêncio.

## Padrões

**Tamanho da etapa**
- Cada etapa deixa o sistema compilando, com testes passando e implantável.
- Uma etapa cabe em um commit ou em um pull request pequeno e revisável.
- Se a verificação de uma etapa não puder ser descrita, ela é grande ou vaga demais.

**Mudanças arriscadas**
- Separe refatoração preparatória de mudança de comportamento, em commits distintos: primeiro torne a mudança fácil, depois faça a mudança fácil.
- Use sinalizador de funcionalidade para integrar código incompleto sem expô-lo.
- Mudanças de esquema seguem expandir, migrar e contrair.
- Antes de ação irreversível (exclusão de dados, migração destrutiva, publicação), o plano prevê backup, ensaio e autorização explícita.

**Formato do plano**

```markdown
## Objetivo
<resultado observável>

## Pronto quando
- <critério verificável>

## Premissas e riscos
- <item> → <mitigação>

## Etapas
1. **<nome>**: <o que muda>. Verificação: <como>. Reversão: <como>.
2. ...

## Fora do escopo
- <item>

## Decisões pendentes
- <pergunta> (recomendação: <opção>)
```

**Estimativa**
- Em faixas, por etapa, destacando onde está a incerteza.
- O plano informa o que foi verificado no código e o que é suposição.

## Evite

- Plano que lista atividades ("implementar", "testar") sem resultado verificável.
- Deixar integração e testes para o final.
- Etapa única gigante, ou dezenas de microetapas sem valor individual.
- Misturar refatoração, mudança de comportamento e formatação na mesma etapa.
- Planejar em detalhe o que depende de uma incerteza ainda não resolvida.
- Seguir o plano depois que uma premissa caiu.
- Aumentar o escopo durante a execução sem registrar.

## Critérios de pronto

- [ ] Objetivo e definição de pronto observáveis.
- [ ] Plano baseado em leitura do código, com arquivos e padrões reais citados.
- [ ] Cada etapa com verificação e reversão.
- [ ] Maior risco tratado nas primeiras etapas.
- [ ] Ações irreversíveis identificadas e condicionadas a autorização.
- [ ] Itens fora do escopo e decisões pendentes listados.

## Exemplo

Objetivo: permitir login com segundo fator por aplicativo autenticador.

1. **Prova de risco**: validar a biblioteca de códigos temporários com um teste isolado contra vetores conhecidos. Verificação: teste passa. Reversão: descartar o ramo.
2. **Esquema (expandir)**: tabela de fatores por usuário, segredo cifrado. Verificação: migração aplica e reverte. Reversão: migração inversa.
3. **Ativação**: endpoint que gera o segredo e confirma com um código; atrás de sinalizador. Verificação: teste de integração do fluxo completo.
4. **Desafio no login**: passo adicional quando o usuário tem fator ativo, com limite de tentativas. Verificação: testes de sucesso, código errado e bloqueio.
5. **Códigos de recuperação** e desativação com reautenticação.
6. **Interface** das três etapas anteriores.
7. **Liberação gradual** pelo sinalizador, com métricas de falha de login.

Fora do escopo: SMS, chaves físicas. Decisão pendente: obrigatório para administradores? (recomendação: sim, na etapa 7).

## Skills relacionadas

- `requirements-discovery` quando o objetivo ainda não está claro.
- `system-architecture` para as decisões estruturais.
- `testing-strategy` para definir as verificações.
- `git-workflow` para organizar commits e pull requests.
- `delivery-verification` para confirmar cada etapa com evidência.
