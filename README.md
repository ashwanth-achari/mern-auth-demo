# 🚀 DevAsh Services Portal  
A modern Full-stack MERN platform with authentication, admin dashboard.

Live Demo:  
👉 **Frontend:** https://devash-services.vercel.app  
👉 **Backend API:** https://devash-backend.onrender.com  

---

## 📌 Overview
DevAsh Services Portal is a full-stack MERN (MongoDB, Express, React, Node.js) web application featuring:

- Secure user authentication (JWT-based)
- CRUD-enabled admin dashboard
- Contact messaging system
- Dynamic services fetched from database
- Form validation using Zod
- Fully deployed on **Render (backend)** & **Vercel (frontend)**

Designed with performance, security, and modern UI/UX in mind.

---

## ⭐ Features

### 🔐 **Authentication**
- JWT-based login & registration  
- Protected routes  
- Auto user session restore  
- Password hashing using bcrypt

### 🛠️ **Admin Panel**
- Manage users (view, update, delete)  
- Manage contact messages  
- Role-based authorization (Admin / User)  
- Update user details with Zod validation  
- Delete confirmation popups

### 📩 **Contact System**
- Auto-filled username & email for logged-in users  
- Message-only input validation  
- Admin can view and delete contacts

### 💼 **Services Module**
- Dynamic service cards
- Services fetched from MongoDB
- Clean UI with animation effects

### 🧭 **Frontend**
- React + Vite  
- React Router v6  
- Global Auth Context  
- Loaders, toasts, and responsive UI  
- SPA routing via Vercel rewrites

### 🔐 **Backend**
- Organized Express API  
- Zod validation middleware  
- Error-handling middleware  
- CORS configured for production

---

## 🏗️ Tech Stack

### **Frontend**
- React  
- Vite  
- React Router  
- React Toastify  
- Context API  
- CSS (custom responsive design)  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Zod Validation  
- JWT Authentication  
- bcryptjs password hashing  
- CORS & Helmet (optional)

### **Deployment**
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB Atlas  

---

## 📂 Folder Structure


root/
├── backend/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── router/
│ ├── utils/
│ ├── server.js
│ └── .env
│
└── client/
├── src/
├── components/
├── pages/
├── store/
├── public/
└── vite.config.js


---

## 🔗 API Endpoints

### **Auth**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET  | `/api/auth/user` | Get logged-in user (JWT required) |

### **Admin**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/users/:id` | Get single user |
| PATCH | `/api/admin/users/update/:id` | Update user |
| DELETE | `/api/admin/users/delete/:id` | Delete user |
| GET | `/api/admin/contacts` | Get all contact messages |
| DELETE | `/api/admin/contacts/delete/:id` | Delete contact |

### **Services**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/data/service` | Get all services |

### **Contact**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/form/contact` | Submit contact form |

---
## 🚀 Local Development

### **1. Clone the repository**
```bash
git clone <https://github.com/ashwanth-achari/mern-auth-demo.git>
cd project-folder

cd backend
npm install

cd client
npm install
npm run dev

