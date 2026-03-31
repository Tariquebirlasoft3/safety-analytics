const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tariquea266_db_user:safety2025!$@safety-analytics.oefazlk.mongodb.net/?appName=safety-analytics",
    );
    console.log("MongoDB Connected!");
  } catch (err) {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
