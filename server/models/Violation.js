const mongoose = require("mongoose");

const violationSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  variants: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Control Direction/Path",
      "Control Speed",
      "Loss of Propulsion",
      "Others",
    ],
  },
  dealer: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Accelerating", "Slipping", "Noise", "Others"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Violation", violationSchema);
