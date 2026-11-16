# Avaliação de tecnologias

Método para escolher biblioteca, framework, banco, serviço gerenciado ou ferramenta com evidência, não com preferência.

## Passos

1. **Escreva o problema e os requisitos** antes de olhar opções: o que precisa ser resolvido, com quais restrições e limites.
2. **Considere não adicionar nada.** A plataforma, a biblioteca padrão ou algo já presente no projeto resolve? Cada dependência é um custo permanente.
3. **Monte uma lista curta** de duas a quatro candidatas, incluindo a opção conservadora.
4. **Colete dados na fonte primária**: documentação oficial, repositório, notas de versão, página de preços. Registre a data da consulta. Conhecimento de memória pode estar desatualizado.
5. **Avalie contra os critérios** abaixo, com evidência para cada célula.
6. **Prove o ponto de maior risco** com um experimento curto: o caso de uso mais difícil, não o exemplo de início rápido.
7. **Decida e registre** em ADR, com o critério que provocaria a reavaliação.

## Critérios

| Dimensão | O que verificar |
| --- | --- |
| Adequação | Resolve o problema central sem contornos? Atende aos requisitos não funcionais? |
| Maturidade | Tempo de existência, versão estável, política de versionamento, histórico de mudanças incompatíveis |
| Manutenção | Frequência de lançamentos, tempo de resposta a falhas, número de mantenedores ativos, risco de depender de uma única pessoa ou empresa |
| Segurança | Histórico de vulnerabilidades e tempo de correção, processo de divulgação, dependências transitivas |
| Licença | Compatível com o uso pretendido, inclusive comercial e distribuição |
| Operação | Complexidade de implantação, monitoramento, backup, atualização |
| Custo total | Licença ou uso, infraestrutura, tempo de aprendizado, custo de migração futura |
| Ecossistema | Integrações, qualidade da documentação, disponibilidade de profissionais |
| Reversibilidade | Quão difícil é sair? Os dados são exportáveis? A interface é padrão ou proprietária? |
| Adequação à equipe | Conhecimento existente e curva de aprendizado |

## Sinais de alerta

- Projeto sem lançamento recente e com falhas acumuladas sem resposta.
- Documentação que só cobre o caso trivial.
- Mudanças incompatíveis frequentes sem guia de migração.
- Licença alterada recentemente ou com restrições de uso comercial.
- Dependência que traz dezenas de transitivas para resolver um problema pequeno.
- Escolha justificada apenas por popularidade.

## Regras

- Isole a dependência atrás de uma interface própria quando o custo de troca for alto.
- Prefira padrões abertos a formatos proprietários para dados que duram.
- Uma tecnologia nova por projeto já é risco suficiente.
- Para código pequeno e estável, escrever pode ser melhor do que depender.

## Formato do resultado

```markdown
## Avaliação: <necessidade>

**Requisitos:** <lista>
**Data da consulta às fontes:** AAAA-MM-DD

| Critério | <Opção A> | <Opção B> | <Não adicionar> |
| --- | --- | --- | --- |

**Experimento realizado:** <o que foi provado e o resultado>
**Recomendação:** <opção> porque <motivo principal>.
**Sacrifício aceito:** <o que se perde>.
**Reavaliar se:** <condição>.
**Não verificado:** <o que ficou sem evidência>.
```
