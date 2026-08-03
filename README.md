<div align="center">

  # 🍃 NORTHWIND
  ### **Modern Full-Stack E-Commerce & Management Platform**

  An enterprise-grade, full-stack web application engineering the classic Northwind database into a modern, high-performance E-Commerce platform with an ultra-sleek **Liquid Glass (Glassmorphism)** UI design system.

  [![Live Demo](https://img.shields.io/badge/LIVE_DEMO-GitHub_Pages-646CFF?style=for-the-badge&logo=github&logoColor=white)](https://itaygoldenberg.github.io/Northwind/)
  [![GitHub Repo](https://img.shields.io/badge/GITHUB-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/itaygoldenberg/Northwind)

  <br />

  ![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite_Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js_Runtime-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
  ![MySQL](https://img.shields.io/badge/MySQL_Database-00758F?style=for-the-badge&logo=mysql&logoColor=white)
  ![JWT Security](https://img.shields.io/badge/JWT-Protected-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [Design System & UI/UX](#-design-system--uiux)
- [Tech Stack Architecture](#-tech-stack-architecture)
- [System Data Flow](#-system-data-flow)
- [REST API Reference](#-rest-api-reference)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Environment Configuration](#-environment-configuration)
- [Author](#-author)

---

## ✨ Key Features

### 🛍️ E-Commerce & Product Management
* **Dynamic Product Catalog**: Real-time filtering, instant category sorting, and instant text search across all products.
* **Detailed Inventory Metrics**: Deep-dive single product view featuring real-time stock level status, pricing breakdown, and supplier details.
* **Top Products & Analytics**: Highlighting top-rated items, featured stock, and quick aggregate dashboard stats.

### 🔐 Security, Authentication & Role Management
* **JWT-Based Authentication**: Secure sign-up and sign-in pipelines utilizing password hashing and JSON Web Tokens.
* **Role-Based Access Control (RBAC)**: Strict separation of privileges between regular **Users** and privileged **Administrators**.
* **Protected API Endpoints**: Interceptors attached to all mutating requests (`POST`, `PUT`, `DELETE`) validating admin access.

### 🛠️ Administrative Dashboards & Management
* **Full CRUD Suite**: Add, edit, preview, and safely soft-delete products, suppliers, and employee entries.
* **Asynchronous Image Handling**: Dynamic client-side previews and server-side file asset storage.
* **Comprehensive Validation**: Dynamic form validation powered by `react-hook-form` with custom regex constraints and real-time user feedback.

---

## 💎 Design System & UI/UX

The interface implements a handcrafted **Liquid Glass (Glassmorphism)** design theme engineered entirely with modern pure CSS3:

* **Translucent Layering**: Backdrop blur filters (`backdrop-filter: blur()`) combined with frosted glass borders.
* **Micro-Interactions**: Dynamic glow effects, subtle depth drop-shadows, and smooth state transitions on hover/click.
* **Responsive Layout**: Engineered from ground up using modern CSS Grid and Flexbox layouts for seamless rendering on mobile, tablet, and desktop display screens.

---

## 🛠️ Tech Stack Architecture

### Frontend Layer
* **Core Framework**: React 18 with TypeScript 5
* **Build System**: Vite (lightning-fast HMR and build optimization)
* **State Engine**: Redux Toolkit (Slices pattern & Centralized Store)
* **Routing**: React Router DOM v6
* **Form Engine**: React Hook Form
* **HTTP Client**: Axios with custom Request/Response Interceptors
* **Styling**: Pure CSS3 (Glassmorphism design tokens, CSS Variables, Animations)

### Backend Layer
* **Runtime**: Node.js
* **Framework**: Express.js (TypeScript)
* **Architecture**: 3-Tier Enterprise Pattern (Controllers ➔ Services ➔ Data Access Layer)
* **Database**: MySQL Server (`mysql2` connection pooling with parametrized SQL queries)
* **Security & Auth**: `jsonwebtoken` (JWT), `bcryptjs` password hashing, CORS policies, Custom Error & Security Middlewares

---

## 📐 System Data Flow

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                           Client Side (React)                           │
│   Components  ◄──►  Redux Slices/Store  ◄──►  Axios Interceptors / Services │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ HTTP REST API (JSON)
┌────────────────────────────────────▼────────────────────────────────────┐
│                        Backend Engine (Express.js)                      │
│   Middlewares (Auth/Logger/Error)  ➔  Controllers  ➔  Services Layer    │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ SQL Queries (DAL Connection Pool)
┌────────────────────────────────────▼────────────────────────────────────┐
│                         Database Layer (MySQL)                          │
│            Northwind Schema (Products, Categories, Users, Employees)    │
└─────────────────────────────────────────────────────────────────────────┘
