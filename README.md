<p align="center">
  <img src="./docs/readme-banner.svg" alt="Northwind Commerce Platform animated project banner" width="100%" />
</p>

<p align="center">
  <a href="https://northwind-itaygold.web.app"><img src="./docs/actions/demo.svg" alt="View the Northwind Commerce Platform live demo" width="250" /></a>
  <a href="#running-locally"><img src="./docs/actions/primary.svg" alt="RUN NORTHWIND LOCALLY" width="250" /></a>
  <a href="https://github.com/itaygoldenberg/Northwind"><img src="./docs/actions/source.svg" alt="View Northwind Commerce Platform source code" width="250" /></a>
  <a href="https://www.linkedin.com/in/itay-goldenberg/"><img src="./docs/actions/linkedin.svg" alt="Connect with Itay Goldenberg on LinkedIn" width="250" /></a>
</p>

> [!TIP]
> **Live demo:** [northwind-itaygold.web.app](https://northwind-itaygold.web.app) — the client is deployed to Firebase Hosting, which serves static files. The API and both databases are not deployed, so the interface loads and reports itself offline rather than showing data. To see the system working end to end, run it locally or with Docker as described below.

<p align="center">
  <a href="#overview">Overview</a>&nbsp;&middot;&nbsp;
  <a href="#features">Features</a>&nbsp;&middot;&nbsp;
  <a href="#workflow">Workflow</a>&nbsp;&middot;&nbsp;
  <a href="#technology">Technology</a>&nbsp;&middot;&nbsp;
  <a href="#running-locally">Local setup</a>&nbsp;&middot;&nbsp;
  <a href="#running-with-docker">Docker</a>
</p>

> [!NOTE]
> A full-stack course project demonstrating frontend architecture, protected REST routes, dual relational and document persistence, real-time messaging and AI-assisted data access.

## Overview

Northwind is a full-stack commerce and operations application composed of a React SPA, an Express REST API, a MySQL database and a MongoDB database.

The repository demonstrates typed feature boundaries, Redux state, authenticated API communication, relational and document data access, multipart image workflows, WebSocket messaging, retrieval-augmented answers over local documents and an MCP server that lets a language model query the data directly.

<table><tr><td align="center" width="25%"><strong>REACT</strong><br /><sub>typed SPA</sub></td><td align="center" width="25%"><strong>EXPRESS</strong><br /><sub>REST API</sub></td><td align="center" width="25%"><strong>MYSQL + MONGO</strong><br /><sub>dual persistence</sub></td><td align="center" width="25%"><strong>AI + MCP</strong><br /><sub>assisted queries</sub></td></tr></table>

| Project detail | Implementation |
|---|---|
| Frontend | React 19, TypeScript, Vite and Redux Toolkit |
| Backend | Express 5 REST API written in TypeScript |
| Data | MySQL for the classic Northwind schema, MongoDB for suppliers, sales and countries |
| Real time | Socket.io chat between connected clients |
| AI | RAG answers over local policy documents, plus an MCP server exposing six data tools |
| Security | JWT roles, hashing with salt, rate limiting, Helmet, XSS stripping and reCAPTCHA |
| Containers | Four-service Docker Compose stack |
| Tests | Mocha, Chai and Supertest on the API, Vitest on the client |

## Contents

- [Overview](#overview)
- [Features](#features)
- [Workflow](#workflow)
- [Technology](#technology)
- [Project structure](#project-structure)
- [Running locally](#running-locally)
- [Running with Docker](#running-with-docker)
- [Tests](#tests)
- [Additional details](#additional-details)
- [Operational notes](#operational-notes)
- [Author](#author)

## Features

### Commerce workspace

The SPA includes product list, details, top-products and image-aware create, edit and delete workflows. Employee and supplier management interfaces are organized as dedicated feature areas.

### Authentication and authorization

Users can register and sign in. Passwords are hashed with an HMAC and a private salt, JWT data drives role-aware navigation, authenticated write operations and administrator-only deletion, and registration is protected by reCAPTCHA.

### Structured frontend architecture

React Router, lazy routes, Redux Toolkit stores, typed models, service classes and an Axios interceptor keep UI, state and transport concerns separated.

### Dual persistence

Products, employees and users live in MySQL through a thin data-access layer with prepared statements. Suppliers, sales and countries live in MongoDB through Mongoose models with schema validation and virtual population.

### Real-time messaging

A Socket.io service shares the HTTP server and broadcasts chat messages to every connected client, with per-socket listeners registered on connection and cleaned up on disconnect.

### AI-assisted data access

Two independent paths are implemented. Retrieval-augmented generation indexes the documents under `Backend/src/assets/docs` into a local vector store and answers questions from their content. An MCP server exposes employees, countries, cities and orders as tools, so a language model can query the database and report the result.

### Testing

Integration tests drive the real Express server through Supertest and assert status codes and payloads, and the client-side calculation services are covered with Vitest.

## Workflow

<p align="center">
  <img src="./docs/workflow.svg" alt="Northwind Commerce Platform animated application workflow" width="100%" />
</p>

## Technology

<p align="center">
  <img src="./docs/tech-strip.svg" alt="Northwind Commerce Platform primary technology logos" width="100%" />
</p>

| Technology | Role |
|---|---|
| React 19 + TypeScript | Typed single page application |
| Redux Toolkit | Products, employees, suppliers and user state |
| React Router | Feature routes, lazy loading and 404 handling |
| React Hook Form | Validated CRUD forms and file inputs |
| Node.js + Express 5 | REST API runtime |
| MySQL + mysql2 | Relational persistence with prepared statements |
| MongoDB + Mongoose | Document persistence with schema validation |
| Socket.io | Bidirectional real-time messaging |
| LlamaIndex + OpenAI | Document indexing and retrieval-augmented answers |
| MCP SDK | Tool server that exposes the data to a language model |
| JWT + Zod | Authentication, roles and validation |
| Helmet, rate limit, striptags | Response headers, request throttling and XSS stripping |
| Mocha, Chai, Supertest, Vitest | API and client tests |
| Docker Compose | Four-service local stack |
| MUI + Emotion | UI components and theme support |

## Project structure

```text
Northwind/
|-- Frontend/                 React and TypeScript SPA
|   |-- src/components/       Layout, pages and feature areas
|   |-- src/services/         API service layer
|   |-- src/redux/            Global state
|   |-- src/models/           Typed frontend contracts
|   `-- Dockerfile            Client image
|-- Backend/                  Express and TypeScript API
|   |-- src/controllers/      HTTP routes
|   |-- src/services/         Business, database and socket logic
|   |-- src/ai/               MCP server and RAG indexing and retrieval
|   |-- src/middleware/       Security and error handling
|   |-- src/models/           Backend contracts
|   |-- src/assets/           Uploaded images, RAG documents and vector store
|   |-- Dockerfile            API image
|   `-- .dockerignore         Keeps .env and node_modules out of the image
|-- Database/
|   |-- MySQL/northwind.sql   Relational schema and seed data
|   `-- MongoDB/              bson export and its import script
|-- docs/                     README-only visual assets
|-- compose.yaml              Four-service Docker stack
`-- README.md                 Project documentation
```

## Running locally

### 1. Databases

Import `Database/MySQL/northwind.sql` into MySQL, and restore `Database/MongoDB/northwind` into MongoDB with `Database/MongoDB/import.sh`.

### 2. Backend

Create `Backend/.env` with your own local values:

```env
ENVIRONMENT=development
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=northwind
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/northwind
JWT_SECRET=replace_with_a_long_random_secret
HASH_SALT=replace_with_a_private_salt
PRODUCT_IMAGES_BASE_URL=http://localhost:4000/api/products/images/
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
OPENAI_API_KEY=your_openai_api_key
```

Install and start the API:

```bash
cd Backend
npm install
npm start
```

To build the vector store before using the AI answer route, run `npm run embed` once. It reads the documents under `src/assets/docs` and writes `src/assets/vector-db`.

### 3. Frontend

Create `Frontend/.env`:

```env
VITE_SERVER_URL=http://localhost:4000
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

Then, in a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL printed by Vite. The API listens on `http://localhost:4000`.

## Running with Docker

The stack builds and starts four containers: MySQL, MongoDB, the API and the client.

```bash
docker compose up -d --build
```

The client is served on `http://localhost:5173` and the API on `http://localhost:4000`.

Every service declares a health check, and each one waits for the service below it to report healthy before it starts. The API answers the check on `GET /ping`.

Sign in with one of the seeded demo accounts, for example `bart@gmail.com` / `1234` (administrator), or `lisa@gmail.com` / `1234` (signed-in user).

Their passwords are stored in `Database/MySQL/northwind.sql` as HMAC hashes of a **public demo salt**, so `compose.yaml` sets `HASH_SALT` to that same demo value for the container. The private salt in `Backend/.env` is what a local run uses, and it never leaves the machine. Use your own salt outside the demo.

Both database images run every script placed in their initialisation folder, but only on the first start, while the data volume is still empty. To reload the seed data after changing a dump, remove the volumes first:

```bash
docker compose down -v
```

`Backend/.env` is not copied into the image. Compose mounts it read-only at run time, and the container-specific values, such as the database host names, are set in `compose.yaml` and take precedence over the file.

## Tests

```bash
cd Backend
npm test
```

```bash
cd Frontend
npm test
```

## Additional details

| Method | Route | Access |
|---|---|---|
| POST | `/api/register` | Public |
| POST | `/api/login` | Public |
| GET | `/api/products` | Public |
| GET | `/api/products/top-three` | Signed-in user |
| GET | `/api/products/:id` | Public |
| POST | `/api/products` | Signed-in user |
| PUT | `/api/products/:id` | Signed-in user |
| DELETE | `/api/products/:id` | Administrator |
| GET | `/api/products/images/:imageName` | Public |
| GET | `/api/employees` | Public |
| GET | `/api/employees/:id` | Public |
| POST | `/api/employees` | Signed-in user |
| PUT | `/api/employees/:id` | Signed-in user |
| DELETE | `/api/employees/:id` | Administrator |
| GET | `/api/employees/images/:imageName` | Public |
| GET | `/api/suppliers` | Public |
| GET | `/api/some-suppliers` | Public |
| GET | `/api/suppliers/:_id` | Public |
| POST | `/api/suppliers` | Public |
| PUT | `/api/suppliers/:_id` | Public |
| DELETE | `/api/suppliers/:_id` | Public |
| GET | `/api/sales` | Public |
| GET | `/api/sales/:_id` | Public |
| POST | `/api/sales` | Public |
| GET | `/api/ask` | Public |
| GET | `/ping` | Container health check |
| GET, POST | `/sse` | MCP transport |
| POST | `/messages` | MCP transport |

## Operational notes

- Never commit `Backend/.env`, `Frontend/.env` or real database credentials.
- Use long, unique JWT and hash secrets outside development. Changing the salt invalidates every stored password.
- The seeded users only sign in while `HASH_SALT` matches the demo salt the dump was hashed with. Point the salt at your own value and register a fresh account instead.
- Any Vite variable prefixed with `VITE_` is bundled into the client and readable by anyone who opens the browser tools. Keep provider secrets on the server and reach them through the API.
- The MCP server has to be reachable from the internet for a hosted model to call it, so a tunnel is needed while developing locally.
- Review CORS, uploads, rate limits and database privileges before public deployment.

## Author

<p align="center">
  <strong>Itay Goldenberg</strong><br />
  Full Stack Developer Student
</p>

<p align="center">
  <a href="https://github.com/itaygoldenberg"><img src="./docs/actions/github.svg" alt="Itay Goldenberg on GitHub" width="250" /></a>
  <a href="https://www.linkedin.com/in/itay-goldenberg/"><img src="./docs/actions/linkedin.svg" alt="Itay Goldenberg on LinkedIn" width="250" /></a>
</p>
