const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const {
  USER_MESSAGES,
  USER_RULES,
  EMAIL_REGEX,
} = require("../constants/userConstants");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, USER_MESSAGES.NAME_REQUIRED],
    trim: true,
  },
  email: {
    type: String,
    required: [true, USER_MESSAGES.EMAIL_REQUIRED],
    unique: true,
    lowercase: true,
    match: [EMAIL_REGEX, USER_MESSAGES.EMAIL_INVALID],
  },
  password: {
    type: String,
    required: [true, USER_MESSAGES.PASSWORD_REQUIRED],
    minlength: USER_RULES.PASSWORD_MIN_LENGTH,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// FIXED password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Password compare method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
