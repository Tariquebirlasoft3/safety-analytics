const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/authorize");

// GET USERS WITH PAGINATION (ADMIN ONLY)
router.get("/users", protect, authorize("admin"), async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();

    const users = await User.find().skip(skip).limit(limit).select("-password");

    return res.json({
      success: true,
      data: users,
      pagination: {
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        totalUsers,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

// DELETE USER (ADMIN ONLY)

router.delete("/users/:id", protect, authorize("admin"), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
