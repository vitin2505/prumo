---
name: stack-typescript-node
description: Aplica convenções de TypeScript, Node.js e NestJS para código tipado com rigor, assíncrono correto e serviços bem estruturados. Use quando for escrever ou revisar código TypeScript ou JavaScript no servidor, configurar tsconfig, modelar tipos, tratar erros assíncronos, estruturar módulos NestJS ou diagnosticar problemas de event loop, memória ou encerramento em Node.js.
---

# Stack: TypeScript, Node.js e NestJS

Convenções de stack. Os princípios gerais de arquitetura e de qualidade estão em `backend-engineering` e `code-quality`; aqui fica o que é específico da tecnologia.

## Quando usar

- Código TypeScript ou JavaScript em Node.js, com ou sem framework.
- Configuração de compilador, lint, módulos e ambiente de execução.
- Serviços NestJS: módulos, provedores, validação, guardas, filtros.

## Antes de escrever

1. Leia `package.json` (versões, `type`, scripts, `engines`), `tsconfig.json` e a configuração de lint. As convenções existentes prevalecem.
2. Identifique o gerenciador de pacotes pelo arquivo de trava e use apenas ele.
3. APIs mudam entre versões principais: confirme na documentação da versão instalada antes de usar recurso recente.

## Fluxo

1. **Modele os tipos primeiro.** Tipos de domínio, entradas e saídas, estados possíveis. O compilador passa a verificar o desenho.
2. **Valide na fronteira e derive o tipo do esquema**, para que tipo estático e validação em tempo de execução não divirjam.
3. **Implemente** com funções pequenas, dependências injetadas e erros tipados.
4. **Verifique**: compilação sem erros, lint limpo, testes passando. Nunca silencie o compilador para "passar".

## Padrões

**TypeScript**
- `strict: true` sempre. Em projeto novo, ative também `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` e `noImplicitOverride`.
- `unknown` no lugar de `any`. Dado externo é `unknown` até ser validado.
- Estados como união discriminada, com verificação de exaustividade:

  ```ts
  type Pagamento =
    | { status: "pendente" }
    | { status: "aprovado"; aprovadoEm: Date }
    | { status: "recusado"; motivo: string };

  function descrever(p: Pagamento): string {
    switch (p.status) {
      case "pendente": return "Aguardando";
      case "aprovado": return `Aprovado em ${p.aprovadoEm.toISOString()}`;
      case "recusado": return `Recusado: ${p.motivo}`;
      default: { const _exaustivo: never = p; return _exaustivo; }
    }
  }
  ```

- Torne estados inválidos irrepresentáveis: prefira união de formatos a vários campos opcionais interdependentes.
- `satisfies` para conferir um valor contra um tipo sem perder a inferência. `as const` para literais.
- Evite asserções (`as`, `!`): cada uma é uma promessa não verificada. Use estreitamento ou função de guarda.
- Tipos nominais para identificadores que não devem se misturar (marca em `string`).
- `readonly` em dados que não devem ser mutados. Prefira `type` para uniões e `interface` para contratos de objeto extensíveis.
- Exporte o mínimo; a superfície pública de um módulo é um contrato.

**Assíncrono**
- Toda promessa é aguardada, devolvida ou tratada explicitamente. Ative a regra de lint para promessas soltas.
- Paralelize o que é independente com `Promise.all`; use `Promise.allSettled` quando falhas parciais forem aceitáveis; limite a concorrência em lotes grandes.
- `await` dentro de laço é sequencial: confirme se é a intenção.
- Cancelamento e tempo limite com `AbortSignal`.
- Erros: lance instâncias de `Error` com `cause`; classes próprias por categoria. Em `catch`, o valor é `unknown`.

**Node.js**
- Não bloqueie o event loop: trabalho intensivo de CPU vai para worker ou para fora do processo. Leitura síncrona de arquivo apenas na inicialização.
- Grandes volumes com streams e `pipeline`, respeitando contrapressão.
- Encerramento gracioso: ao receber `SIGTERM`, pare de aceitar requisições, conclua as em andamento, feche conexões e saia dentro do prazo.
- Rejeição não tratada e exceção não capturada: registre e encerre o processo; o orquestrador reinicia.
- Configuração lida e validada uma vez na inicialização; nada de `process.env` espalhado.
- Fixe a versão do Node (`engines` e arquivo de versão) e use versão com suporte de longo prazo.

**NestJS**
- Um módulo por contexto de negócio, exportando apenas o necessário. Dependência circular entre módulos indica fronteira errada: corrija a fronteira em vez de contornar com referência tardia.
- Controller traduz HTTP; a regra fica em provedores de aplicação e em classes de domínio sem decoradores do framework.
- Validação global com `ValidationPipe` configurado com `whitelist`, `forbidNonWhitelisted` e `transform`; um DTO por operação.
- Autenticação e autorização em guardas; mapeamento de erros em filtro de exceção global; preocupações transversais em interceptadores.
- Provedores com escopo de requisição têm custo de desempenho e contaminam toda a cadeia de dependência: use apenas quando necessário.
- Nunca devolva a entidade de persistência diretamente: mapeie para um DTO de resposta.
- Testes: unitários instanciando a classe com dublês; integração com o módulo de teste e banco real.

## Evite

- `any`, `@ts-ignore` e asserções para calar o compilador.
- `enum` numérico; prefira união de literais ou objeto `as const`.
- Classes e herança onde função e composição resolvem.
- Engolir erro em `catch` vazio; `console.log` como estratégia de log.
- Misturar gerenciadores de pacotes ou sistemas de módulos sem necessidade.
- Dependência nova para o que a plataforma já oferece.

## Critérios de pronto

- [ ] Compilação limpa em modo estrito, sem supressões novas.
- [ ] Lint sem avisos novos, incluindo regras de promessas.
- [ ] Nenhum `any` novo; dado externo validado por esquema.
- [ ] Uniões tratadas de forma exaustiva.
- [ ] Erros assíncronos tratados; sem promessas soltas.
- [ ] Testes passando com o comando do projeto.

## Skills relacionadas

- `backend-engineering` para camadas, transações e autorização.
- `code-quality` para princípios de desenho.
- `testing-strategy` para a estratégia de testes.
- `stack-react-nextjs` para TypeScript no front-end.
- `secure-coding` para validação e segredos.
