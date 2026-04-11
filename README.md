# Safety Analytics Dashboard (MERN Stack)

A full-stack MERN application built to analyze and visualize safety-related data using a modern, responsive dashboard.
The project follows a clean client–server architecture and implements authentication, role-based access control, and efficient data handling.

---

## Tech Stack

### Frontend (Client)

- React 18
- Vite
- Material UI (MUI)
- SASS (SCSS)
- Recharts
- Emotion

### Backend (Server)

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Role-Based Access Control (Admin vs User)
- CORS
- Nodemon

---

## Project Structure

```
safety-analytics/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── styles/
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Installation & Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (Local or Atlas)

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Runs on:
http://localhost:5173

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

Runs on:
http://localhost:5000

---

## Environment Variables

Create a `.env` file inside the `server/` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

---

## Features

### Authentication & Authorization

- JWT-based authentication
- Role-Based Access Control (Admin vs User)

### Admin User Management

- Admin-only access to user data
- Secure delete functionality
- Role-protected APIs

### Custom Server-Side Pagination

- Pagination implemented using MongoDB skip and limit
- Backend returns page-wise user data
- Frontend manages pagination using custom Previous / Next logic

### Dashboard & Data Visualization

- Interactive charts using Recharts
- Modular and reusable components

### Clean Architecture

- Proper separation of frontend and backend
- Middleware-based security
- Scalable and maintainable codebase

---

## Security Design

- Protected routes using authentication middleware
- Admin-only APIs enforced through role checks
- JWT verified on every protected request
- Sensitive environment variables excluded from version control

---

## Author

Md Tarique Alam
GitHub: https://github.com/Tariquebirlasoft3

---

## Project Summary

A MERN-based safety analytics dashboard implementing JWT authentication, role-based access control, admin user management, and custom server-side pagination in a scalable client–server architecture.
