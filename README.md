# Safety Analytics Dashboard (MERN Stack)

A **full‑stack MERN application** built to analyze and visualize safety-related data using a modern, responsive dashboard.  
This project follows a clean **client–server architecture** with scalable and maintainable code practices.

---

## Tech Stack

### 🔹 Frontend (Client)

- React 18
- Vite
- Material UI (MUI)
- SASS (SCSS)
- Recharts
- Emotion

### 🔹 Backend (Server)

- Node.js
- Express.js
- MongoDB (Mongoose)
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
│   │   ├── styles/
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── models/
│   ├── routes/
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
- MongoDB (Local / Atlas)

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Runs on: `http://localhost:5173`

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

Runs on: `http://localhost:5000`

---

## Environment Variables

Create `.env` inside `server/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## Features

- Responsive safety dashboard
- Charts & data visualization
- Modular backend structure
- SCSS-based styling
- Clean MERN architecture

---

## Author

**Md Tarique Alam**  
GitHub: https://github.com/Tariquebirlasoft3
