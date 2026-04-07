const mongoose = require("mongoose");

const {
  VIOLATION_CATEGORIES,
  VIOLATION_TYPES,
} = require("../constants/violationConstants");

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
    enum: VIOLATION_CATEGORIES,
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
    enum: VIOLATION_TYPES,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Violation", violationSchema);
