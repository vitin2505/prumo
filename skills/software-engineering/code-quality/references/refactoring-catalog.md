# Catálogo de refatoração

Sintomas comuns, a refatoração indicada e a sequência segura de execução. Em todos os casos: testes verdes antes, passos pequenos, testes a cada passo.

## Sintomas e tratamentos

| Sintoma | Refatoração | Cuidado |
| --- | --- | --- |
| Função longa | Extrair função para cada bloco com propósito próprio | Nomeie pelo que faz, não por como faz |
| Trecho com comentário explicando o que faz | Extrair função com o comentário como nome | Remova o comentário depois |
| Condicional complexa | Extrair a condição para função ou variável nomeada | - |
| Aninhamento profundo | Substituir por cláusulas de guarda com retorno antecipado | Mantenha a ordem das verificações |
| Mesma condicional sobre tipo em vários lugares | Substituir por polimorfismo ou tabela de despacho | Só quando houver três ou mais ocorrências |
| Lista longa de parâmetros | Introduzir objeto de parâmetros | Agrupe os que sempre andam juntos |
| Parâmetro booleano de modo | Dividir em duas funções | - |
| Grupo de dados que viaja junto | Extrair classe ou tipo | Leve o comportamento associado |
| Primitivo com regra (e-mail, dinheiro, CPF) | Substituir por objeto de valor | Valide na criação |
| Classe com muitas responsabilidades | Extrair classe | Divida pelos motivos de mudança |
| Método que usa mais dados de outra classe | Mover método | - |
| Cadeia de chamadas `a.b().c().d()` | Esconder o delegado | Não crie intermediários vazios |
| Código duplicado | Extrair função; subir para ponto comum | Confirme que é o mesmo conhecimento |
| Variável temporária reutilizada | Dividir em uma variável por propósito | - |
| Número ou texto mágico | Substituir por constante nomeada | - |
| Mutação de argumento | Devolver novo valor | Confira quem dependia da mutação |
| Herança usada só para reaproveitar código | Substituir por composição | - |
| Código morto | Remover | O histórico guarda |
| Nome que engana | Renomear | Use a ferramenta de renomeação |

## Sequências seguras

### Extrair função

1. Identifique o bloco e as variáveis que ele lê e altera.
2. Crie a função com nome que diga a intenção; passe as variáveis lidas como parâmetros; devolva as alteradas.
3. Substitua o bloco pela chamada.
4. Execute os testes.

### Renomear símbolo público

1. Crie o novo nome delegando para o antigo, ou o contrário.
2. Migre os usos aos poucos.
3. Marque o antigo como descontinuado.
4. Remova o antigo quando não houver usos.

### Alterar assinatura de função

1. Crie a função nova com a assinatura desejada.
2. Faça a antiga chamar a nova.
3. Migre cada chamador, testando.
4. Remova a antiga.

### Substituir implementação (ramificação por abstração)

1. Introduza uma interface diante da implementação atual.
2. Faça os usos dependerem da interface.
3. Crie a nova implementação ao lado.
4. Alterne por configuração ou sinalizador, comparando resultados quando possível.
5. Remova a implementação antiga e, se a interface não for mais útil, ela também.

### Dividir módulo grande

1. Identifique os grupos coesos de funções e dados.
2. Mova um grupo por vez para o novo módulo, reexportando do original para não quebrar os usos.
3. Atualize os usos para importar do novo local.
4. Remova as reexportações.

## Código legado sem testes

1. **Testes de caracterização**: escreva testes que registrem o comportamento atual, inclusive o que parece errado. O objetivo é detectar mudança, não julgar.
2. **Encontre uma costura**: um ponto onde seja possível trocar a dependência (banco, relógio, rede) sem editar a lógica: parâmetro, construtor, função injetada.
3. **Faça apenas as alterações mínimas e mecânicas** necessárias para introduzir a costura, de preferência com a ferramenta de refatoração automática.
4. **Cubra a área que será alterada**, não o sistema inteiro.
5. **Refatore** com a proteção dos testes.
6. Defeitos descobertos pelo caminho são registrados e corrigidos em mudança separada.

## Quando não refatorar

- O código funciona, não vai mudar e ninguém precisa lê-lo.
- Não há testes nem tempo para criá-los, e o risco é alto.
- Às vésperas de uma entrega, em área não relacionada.
- Reescrever é realmente mais barato, o que é raro e deve ser demonstrado, não presumido.
