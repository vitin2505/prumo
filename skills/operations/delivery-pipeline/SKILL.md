---
name: delivery-pipeline
description: Projeta e revisa a esteira de entrega de software, incluindo Dockerfile e Docker Compose, integração e entrega contínuas com GitHub Actions, verificações de segurança automatizadas (DevSecOps), estratégias de publicação e reversão. Use quando for criar ou ajustar Dockerfile, compose, workflows de CI/CD, etapas de build, teste, análise e deploy, ou quando o pipeline estiver lento, instável ou inseguro.
---

# Esteira de Entrega: Contêineres, CI/CD e DevSecOps

A esteira transforma um commit em software em produção de forma repetível, rápida e segura. Tudo que é verificado manualmente será esquecido: automatize.

## Quando usar

- Criar ou revisar Dockerfile, Docker Compose e imagens.
- Criar ou ajustar workflows de integração e entrega contínuas.
- Adicionar verificações de qualidade e de segurança ao pipeline.
- Definir estratégia de publicação, migração e reversão.

## Regras de segurança

- Não execute publicação, alteração de infraestrutura ou de segredos sem pedido explícito.
- Não exiba segredos em logs; não os escreva em arquivos versionados.
- Alterações em workflows são alterações de código privilegiado: revise com o mesmo rigor.

## Fluxo

1. **Levante o estado atual**: como o projeto é construído, testado e publicado hoje; quais ambientes existem; onde estão os segredos.
2. **Defina as etapas** na ordem do mais rápido e barato para o mais lento:
   1. formatação, lint e verificação de tipos;
   2. testes unitários;
   3. build do artefato;
   4. testes de integração e de contrato;
   5. análise de segurança (segredos, dependências, código, imagem);
   6. publicação em ambiente de homologação e verificação pós-publicação;
   7. publicação em produção, gradual, com verificação e reversão.
3. **Construa o artefato uma vez** e promova o mesmo artefato entre ambientes; o que muda é a configuração.
4. **Torne o pipeline rápido**: cache de dependências e de camadas, etapas independentes em paralelo, execução apenas do que foi afetado quando o repositório permitir.
5. **Endureça** conforme os padrões abaixo.
6. **Defina publicação e reversão**: como a versão nova entra, como se verifica a saúde e como se volta à anterior em minutos.
7. **Verifique** executando o pipeline em um ramo de teste, incluindo um caso que deve falhar.

## Padrões

**Dockerfile**
- Build em múltiplos estágios: dependências de compilação não vão para a imagem final.
- Imagem base mínima, oficial e com versão fixada (etiqueta específica, idealmente com resumo criptográfico). Nunca `latest`.
- Ordene as instruções do que muda menos para o que muda mais: copie os manifestos e instale dependências antes de copiar o código.
- Execute como usuário sem privilégios (`USER`), com sistema de arquivos somente leitura quando possível.
- `.dockerignore` excluindo controle de versão, dependências locais, arquivos de ambiente e artefatos.
- Segredos nunca em `ARG`, `ENV` ou camadas: use montagem de segredo em tempo de build e injeção em tempo de execução.
- Um processo por contêiner, que trate sinais de encerramento; `HEALTHCHECK` ou verificação equivalente no orquestrador.
- Instalação determinística a partir do arquivo de trava.

```dockerfile
# Exemplo para um serviço Node.js; fixe as versões reais do projeto.
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:22-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/package.json ./
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

**Docker Compose (desenvolvimento)**
- Serviços de apoio (banco, cache, fila) com versão igual à de produção e verificação de saúde; a aplicação depende do serviço saudável, não apenas iniciado.
- Volumes nomeados para dados; credenciais de desenvolvimento em arquivo de ambiente não versionado, com arquivo de exemplo versionado.

**GitHub Actions**
- `permissions` mínimas declaradas no workflow; o padrão deve ser somente leitura.
- Ações de terceiros fixadas pelo hash completo do commit, não por etiqueta móvel.
- Nunca interpole dado controlado por terceiros (título de pull request, nome de ramo, corpo de issue) diretamente em `run:`. Passe por variável de ambiente.
- Evite `pull_request_target` e gatilhos privilegiados com checkout de código de fork.
- Segredos por ambiente, com aprovação para produção; prefira federação de identidade (OIDC) a credenciais de longa duração.
- `concurrency` para cancelar execuções obsoletas; `timeout-minutes` em todo job.
- Cache com chave derivada do arquivo de trava.

**DevSecOps: verificações automatizadas**

| Verificação | O que detecta | Quando bloquear |
| --- | --- | --- |
| Varredura de segredos | Credenciais no código e no histórico | Sempre |
| Análise de dependências | Vulnerabilidades conhecidas em bibliotecas | Severidade alta ou crítica com correção disponível |
| Análise estática de segurança | Padrões de código inseguros | Achados de alta confiança |
| Varredura de imagem | Vulnerabilidades no sistema base | Severidade alta ou crítica com correção disponível |
| Análise de infraestrutura como código | Configuração insegura | Achados de alta confiança |

Gere um inventário de componentes (SBOM) por versão e assine os artefatos publicados. Verificação que gera ruído é ignorada: ajuste as regras em vez de acumular exceções.

**Publicação**
- Estratégias: gradual por instâncias, azul e verde (dois ambientes e troca de tráfego), ou canário (fração do tráfego com comparação de métricas). Escolha pelo risco e pelo custo.
- Migrações de banco compatíveis com a versão anterior do código, aplicadas antes do código que depende delas.
- Sinalizadores de funcionalidade separam publicar de liberar.
- Verificação automática após a publicação, com reversão em caso de falha.
- Toda publicação é rastreável a um commit e tem um responsável.

## Evite

- Imagem com ferramentas de compilação, executando como root, baseada em `latest`.
- Segredos em variáveis de build, em logs ou no repositório.
- Pipeline que só roda no ramo principal: o retorno precisa chegar no pull request.
- Testes instáveis tolerados com repetição automática em vez de corrigidos.
- Etapas manuais não documentadas no caminho para produção.
- Publicação sem plano de reversão testado.
- Desativar uma verificação para "destravar" a entrega.

## Critérios de pronto

- [ ] Pipeline executado com sucesso em um ramo, e falhando quando deve (caso negativo demonstrado).
- [ ] Imagem final sem ferramentas de build, com usuário sem privilégios e base fixada.
- [ ] Permissões mínimas e ações fixadas por hash nos workflows.
- [ ] Nenhum segredo em código, imagem ou log.
- [ ] Verificações de segurança ativas com critério de bloqueio definido.
- [ ] Reversão documentada e exercitada ao menos uma vez.
- [ ] Tempo total do pipeline medido e registrado.

## Skills relacionadas

- `git-workflow` para ramos, commits e pull requests.
- `secure-coding` para o código que o pipeline verifica.
- `testing-strategy` para os níveis de teste executados.
- `observability` para a verificação pós-publicação.
- `data-modeling` para migrações compatíveis.
