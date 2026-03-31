const express = require("express");
const router = express.Router();
const {
  getDashboardData,
  getAllViolations,
  createViolation,
} = require("../controllers/dashboardController");

router.get("/dashboard", getDashboardData);
router.get("/violations", getAllViolations);
router.post("/violations", createViolation);

module.exports = router;
