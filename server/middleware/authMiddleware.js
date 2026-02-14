const jwt = require("jsonwebtoken"); // JWT verify karne ke liye
const User = require("../models/User"); // User model (MongoDB se user find karne ke liye)

// Authentication middleware
const auth = async (req, res, next) => {
  // Authorization header se token nikaal rahe hain
  // Format: "Bearer TOKEN_VALUE"
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ message: "Unauthorized" }); // Agar token nahi mila to Unauthorized

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token verify karo using secret key

    const user = await User.findById(decoded.id); // Decoded token se user id milegi

    if (!user) throw new Error(); // Agar user database me nahi mila

    req.user = user; // Request object me user attach kar do

    next(); // Next middleware / route handler ko call karo
  } catch (err) {
    res.status(401).json({ message: "Invalid token" }); // Agar token invalid / expired ho
  }
};

module.exports = auth;
