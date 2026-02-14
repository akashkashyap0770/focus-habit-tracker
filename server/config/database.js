const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "focusHabitDB",
    });
    console.log("MongoDB Atlas connected.✅");
    //👉 Ise exit code bolte hain
    // process.exit(0); // success ke baad program band (No error) ✅
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error(
      "Check your .env MONGO_URI, network access, and DNS resolution.",
    );
    //👉 Ise exit code bolte hain
    process.exit(1); // Program error ki wajah se band hua, 1 generally error indicate karta hai. ❌
  }
};

module.exports = connectDB;
