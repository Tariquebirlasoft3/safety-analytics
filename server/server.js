// server.js — Backend Entry Point
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dashboardRoutes = require("./routes/dashboardRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "Safety Analytics API running!",
    routes: {
      dashboard: "GET  /api/dashboard",
      violations: "GET  /api/violations",
      addViolation: "POST /api/violations",
    },
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("=========================================");
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`API:    http://localhost:${PORT}/api/dashboard`);
  console.log("=========================================");
});
