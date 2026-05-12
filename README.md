# Todo v2

Aplicação de tarefas estilo quadro (board) com colunas por status, autenticação por JWT e API REST. Projeto full stack com frontend em React e backend em Node.js.

## Funcionalidades

- Cadastro e login de usuários
- CRUD de tarefas por usuário autenticado
- Status: `TODO`, `IN_PROGRESS`, `DONE`
- Ordenação com drag-and-drop no quadro (frontend com `@dnd-kit`)

## Stack

| Camada    | Tecnologias                                      |
| --------- | ------------------------------------------------ |
| Frontend  | React 19, Vite 8, TypeScript, Tailwind CSS 4, React Router |
| Backend   | Express 5, TypeScript, Prisma 7, MariaDB/MySQL   |
| Auth      | JWT (`jsonwebtoken`), senhas com `bcryptjs`      |

## Estrutura do repositório

```
todo-v2/
├── backend/          # API Express + Prisma
│   ├── prisma/       # schema.prisma
│   └── src/
└── frontend/         # SPA React (Vite)
    └── src/
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão compatível com os `package.json` do projeto)
- Servidor **MySQL** ou **MariaDB** acessível pela string de conexão do Prisma

## Variáveis de ambiente (backend)

Crie um arquivo `.env` dentro de `todo-v2/backend/` com:

| Variável       | Descrição |
| -------------- | --------- |
| `DATABASE_URL` | URL de conexão MySQL/MariaDB (usada pelo Prisma e pelo adapter) |
| `JWT_SECRET`   | Segredo para assinar e validar tokens JWT |
| `PORT`         | (opcional) Porta da API. Padrão: `3000` |
| `FRONTEND_URL` | (opcional) Origem permitida no CORS. Padrão: `http://localhost:5173` |

Exemplo de formato para `DATABASE_URL` (ajuste usuário, senha, host e banco):

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
JWT_SECRET="uma-string-longa-e-aleatoria"
```

## Como rodar

### 1. Backend

```bash
cd todo-v2/backend
npm install
npx prisma migrate dev
npm run dev
```

A API sobe em `http://localhost:3000` (ou na porta definida em `PORT`). Health check: `GET http://localhost:3000/health`.

### 2. Frontend

Em outro terminal:

```bash
cd todo-v2/frontend
npm install
npm run dev
```

O Vite costuma abrir em `http://localhost:5173`. A URL base da API está em `frontend/src/services/api.ts` (`http://localhost:3000/api`); altere se usar outro host ou porta.

## Scripts úteis

**Backend**

- `npm run dev` — desenvolvimento com `nodemon` + `ts-node`
- `npm run build` — compila TypeScript para `dist/`
- `npm start` — executa `dist/server.js` após build

**Frontend**

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — pré-visualização do build
- `npm run lint` — ESLint

## Licença

Defina a licença no repositório conforme sua preferência (os pacotes do projeto usam licenças próprias nas dependências).
