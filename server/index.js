const express = require("express"); // Express framework import (server banane ke liye)
const dotenv = require("dotenv"); // .env file se environment variables load karne ke liye
const cors = require("cors"); // Cross-Origin requests allow karne ke liye (frontend ↔ backend connection)
const connectDB = require("./config/database"); // MongoDB se connect karne wala custom function

dotenv.config(); // Environment variables load karo
connectDB(); // Database connect karo
// console.log("MONGO URI:", process.env.MONGO_URI);

const app = express(); // Express app create karo

app.use(cors()); // CORS enable karo (React frontend se request allow hogi)

app.use(express.json()); // JSON data read karne ke liye middleware

// Routes connect kar rahe hain
app.use("/api/auth", require("./routes/auth")); // Authentication routes (signup, login)
app.use("/api/log", require("./routes/log")); // Logs related routes (habit/game/study logs etc.)

// Server start karo
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
