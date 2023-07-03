<h1 align="center">Node.js API</h1>

## Descrição

Este projeto se trata de uma API de CRUD e de autenticação de usuários utilizando Node.js

## Funcionalidades
- Criação de usuários
- Listagem de usuários
- Atualização de usuários
- Remoção de usuários
- Autenticação com JWT

## Como executar

É necessário ter o Node, Docker e o Git instalados.

No seu terminal, execute os seguintes comandos:

```bash
$ git clone https://github.com/danielfilh0/nodejs-api.git

$ cd nodejs-api

$ docker compose up -d

```
O projeto utiliza o módulo Storage do Supabase para o armazenamento de arquivos estáticos (imagem do usuário). Será preciso criar um projeto no Supabase,
de acordo com esta <a href="https://supabase.com/docs">documentação</a>.

Logo em seguida, crie um arquivo  `.env` e o preencha com as mesmas variáveis que se encontram
no arquivo <a href="https://github.com/danielfilh0/nodejs-api/blob/master/.env.example">.env.example</a> e substitua a URL do banco de dados de acordo com as configurações
do banco de dados do arquivo `docker-compose.yml`. Preencha também as configurações do seu projeto criado no Supabase.

```bash

$ npm install

$ npx prisma migrate dev

$ npm run dev

```

## Executando os testes

Testes unitários:

```bash

$ npm run test

```

Testes de integração:

```bash

$ npm run test:e2e

```

## Tecnologias utilizadas
- Node.js
- Fastify
- Typescript
- Prisma ORM
- Supabase
- Vitest para testes unitários e E2E
- Docker
