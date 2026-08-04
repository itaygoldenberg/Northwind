<div align="center">

# Northwind Commerce Platform

**A full-stack React and TypeScript workspace built around the classic Northwind relational dataset.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5-111827?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

</div>

## Overview

Northwind is a full-stack commerce and operations application with a React SPA, an Express REST API and a MySQL database. The project demonstrates typed frontend architecture, global state management, authenticated API calls, relational data access and media upload workflows.

The interface includes dedicated workspaces for products, employees and suppliers. The bundled backend implements authentication and protected product CRUD routes, while the frontend is organized into reusable feature areas and service boundaries.

## Highlights

- Product catalog with list, details and top-products views.
- Create, edit and delete workflows with image upload support.
- Employee and supplier management interfaces.
- Registration and sign-in with JWT-based authentication.
- User and administrator role handling.
- Protected write operations and administrator-only deletion.
- Redux Toolkit stores for products, employees, suppliers and users.
- Axios interceptor for authenticated API communication.
- React Hook Form validation and image previews.
- Lazy-loaded routes with loading and 404 states.
- Express middleware for rate limiting, XSS reduction and error handling.
- MySQL access through a dedicated data layer.
- Responsive Liquid Glass-inspired UI.

## Architecture

```text
React + TypeScript SPA
        |
        | Axios / JSON / multipart form data
        v
Express REST API
        |
        | mysql2
        v
Northwind MySQL database
```

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite, React Router |
| State | Redux Toolkit, React Redux |
| Forms and UI | React Hook Form, MUI, Emotion, iziToast |
| Networking | Axios, JWT Decode |
| Backend | Node.js, Express 5, TypeScript |
| Security | JSON Web Tokens, Zod, rate limiting, input sanitization |
| Data | MySQL, mysql2, Northwind schema |
| Media | Multipart uploads, server-side image storage |

## Repository Structure

```text
Northwind/
|-- Frontend/             React and TypeScript SPA
|   |-- src/components/   Pages, layouts and feature components
|   |-- src/services/     API service layer
|   |-- src/redux/        Global application state
|   `-- src/models/       Shared frontend models
|-- Backend/              Express and TypeScript REST API
|   |-- src/controllers/  HTTP routes
|   |-- src/services/     Business and database logic
|   |-- src/middleware/   Security and error handling
|   `-- src/models/       Backend data contracts
|-- Database/
|   `-- northwind.sql     Database schema and seed data
`-- README.md             Project documentation
```

## Local Setup

### 1. Database

Create a MySQL database by importing:

```text
Database/northwind.sql
```

### 2. Backend

Create `Backend/.env` with your own local values:

```env
ENVIRONMENT=development
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=northwind
JWT_SECRET=replace_with_a_long_random_secret
PRODUCT_IMAGES_BASE_URL=http://localhost:4000/api/products/images/
HASH_SALT=replace_with_a_private_salt
```

Then install and start the API:

```bash
cd Backend
npm install
npm start
```

The API listens on `http://localhost:4000`.

### 3. Frontend

In a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL printed by Vite.

## API Routes

| Method | Route | Access |
|---|---|---|
| POST | `/api/register` | Public |
| POST | `/api/login` | Public |
| GET | `/api/products` | Public |
| GET | `/api/products/:id` | Public |
| POST | `/api/products` | Signed-in user |
| PUT | `/api/products/:id` | Signed-in user |
| DELETE | `/api/products/:id` | Administrator |
| GET | `/api/products/images/:imageName` | Public |

## Security Notes

- Never commit `Backend/.env` or real credentials.
- Use a long, unique `JWT_SECRET` and `HASH_SALT` outside development.
- The provided configuration is intended for local development; review CORS, uploads, rate limits and database permissions before public deployment.

## Author

Built by **Itay Goldenberg**.

[GitHub](https://github.com/itaygoldenberg) | [LinkedIn](https://www.linkedin.com/in/itay-goldenberg/)
