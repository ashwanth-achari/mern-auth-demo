# 🚀 DevAsh Services Portal

[![Repo stars](https://img.shields.io/github/stars/ashwanth-achari/mern-auth-demo)](https://github.com/ashwanth-achari/mern-auth-demo)
[![License](https://img.shields.io/github/license/ashwanth-achari/mern-auth-demo)](./LICENSE)
[![Frontend](https://img.shields.io/badge/frontend-Vite%20%2B%20React-blue)](#)
[![Backend](https://img.shields.io/badge/backend-Express%20%2B%20Node-green)](#)
[![MongoDB](https://img.shields.io/badge/database-MongoDB-%2347A248)](#)

A modern full-stack MERN (MongoDB, Express, React, Node.js) platform with authentication and an admin dashboard.

Live Demo:
- Frontend: https://devash-services.vercel.app
- Backend API: https://devash-backend.onrender.com

---

Table of contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start (Local Development)](#quick-start-local-development)
  - [Prerequisites](#prerequisites)
  - [Local setup](#local-setup)
  - [Environment variables (.env.example)](#environment-variables-env-example)
- [API Endpoints & Examples](#api-endpoints--examples)
  - [Authentication flow (JWT)](#authentication-flow-jwt)
  - [Curl examples](#curl-examples)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Tests](#tests)
- [Contributing](#contributing)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [License & Contact](#license--contact)
- [Acknowledgements / Roadmap](#acknowledgements--roadmap)

---

## Overview
DevAsh Services Portal is a full-stack app demonstrating a production-oriented architecture:
- JWT-based authentication with role-based authorization (admin/user)
- Admin panel for user & contact management
- Dynamic services driven by MongoDB
- Zod-based input validation
- Deployed on Vercel (frontend) & Render (backend)

---

## Features
- Authentication: register, login, protected routes, session restore
- Admin Panel: view/update/delete users, manage contact messages
- Contact System: messages stored and manageable by admin
- Services: dynamic service cards from DB
- Form validation: Zod
- UX: toasts, loaders, responsive design

---

## Tech Stack
- Frontend: React, Vite, React Router v6, React Toastify, Context API
- Backend: Node.js, Express, MongoDB, Mongoose, Zod, JWT, bcryptjs
- Deployment: Vercel (frontend), Render (backend), MongoDB Atlas

---

## Quick Start (Local Development)

### Prerequisites
- Node.js (recommended v18+)
- npm 
- MongoDB Atlas connection (or local MongoDB)
- Optional: Docker

### Local setup
1. Clone repository
```bash
git clone https://github.com/ashwanth-achari/mern-auth-demo.git
cd mern-auth-demo
```

2. Backend
```bash
cd backend
cp .env.example .env       # create .env from example
npm install
npm run dev                # or npm start (depending on scripts)
```

3. Frontend
```bash
cd client
cp .env.example .env.local # or set env vars per Vite naming (VITE_*)
npm install
npm run dev
```

Open your browser:
- Frontend: http://localhost:5173 (or port shown by Vite)
- Backend: http://localhost:5000 (or configured PORT)

Tip: Consider using a single terminal with `concurrently` or Docker Compose for both services.

---

## Environment variables (.env.example)

Backend (.env)
```
# backend/.env.example
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/devash?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Frontend (.env.local for Vite)
```
# client/.env.example
VITE_API_URL=http://localhost:5000/api
```

Keep secrets out of the repository — use a `.env` file or secret management for production.

---

## API Endpoints & Examples

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET  | /api/auth/user | Get logged-in user (JWT required) |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/users | Get all users |
| GET | /api/admin/users/:id | Get single user |
| PATCH | /api/admin/users/update/:id | Update user |
| DELETE | /api/admin/users/delete/:id | Delete user |
| GET | /api/admin/contacts | Get all contact messages |
| DELETE | /api/admin/contacts/delete/:id | Delete contact |

### Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/data/service | Get all services |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/form/contact | Submit contact form |

---

### Authentication flow (JWT)
- Register/login endpoints return a JWT on success.
- Client stores JWT (recommended: in memory or httpOnly cookie; this project uses local storage/context — be aware of XSS risks).
- Protected API endpoints require Authorization header: `Authorization: Bearer <token>`.
- Use token refresh or re-login when token expires.

---

### Curl examples
Register:
```bash
curl -X POST https://devash-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"P@ssw0rd"}'
```

Login (get token):
```bash
curl -X POST https://devash-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"P@ssw0rd"}'
# Response includes token: { "token": "..." }
```

Get logged-in user (protected):
```bash
curl -H "Authorization: Bearer <token>" \
  https://devash-backend.onrender.com/api/auth/user
```

---

## Deployment
- Frontend: Vercel (build command: `npm run build`, output: `dist/` for Vite)
- Backend: Render (or other Node host). Ensure env vars are set on the hosting platform.
- Database: MongoDB Atlas; whitelist your deployment IPs or use proper network access configuration.

Consider these production tips:
- Enable CORS only for allowed origins (use CLIENT_URL).
- Use HTTPS and strong JWT_SECRET.
- Use `helmet` and rate-limiting middleware for security.
- Store JWT in httpOnly cookies if feasible.

---

## Folder Structure
root/
```
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── router/
│   ├── utils/
│   ├── server.js
│   └── .env
└── client/
    ├── src/
    ├── components/
    ├── pages/
    ├── store/
    ├── public/
    └── vite.config.js
```

---

## Tests
If you add tests:
- Backend: recommend Jest + Supertest for API tests
- Frontend: recommend React Testing Library + Vitest

Add test scripts in package.json and CI pipeline (GitHub Actions).

---

## Contributing
Contributions welcome! Please:
1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add ..."`
4. Push and open a PR

Consider adding:
- CONTRIBUTING.md
- ISSUE_TEMPLATE.md and PULL_REQUEST_TEMPLATE.md
- CODE_OF_CONDUCT.md

---

## Security
- Do not commit `.env` with secrets.
- Use environment-specific JWT secrets and rotate periodically.
- Sanitize and validate inputs (Zod is already used — good).
- Consider scanning dependencies for vulnerabilities (Dependabot or `npm audit`).

---

## Troubleshooting
- If frontend can't reach backend locally, ensure BACKEND `PORT` and VITE `VITE_API_URL` match and CORS allows your origin.
- `ECONNREFUSED` — ensure MongoDB URI is correct and accessible.
- 401 Unauthorized — check JWT expiration and header format.

---

## License & Contact
- Author / Contact: ashwanth-achari (GitHub) — link to your profile or email

---

## Acknowledgements / Roadmap
- Add features such as email verification, password reset, role management UI, improved tests, and CI pipelines.
- Consider adding Dockerfiles and a docker-compose for a reproducible local environment.

---
