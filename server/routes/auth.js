const express = require("express");

const router = express.Router(); // Router create (modular routes ke liye)

const User = require("../models/user"); // user model (MongoDB collection)

const jwt = require("jsonwebtoken"); // JWT token generate karne ke liye

// 👉 Signup Route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body; // Frontend se email & password le rahe hain

  try {
    let user = await User.findOne({ email }); // Check karo user already exist karta hai ya nahi

    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ email, password }); // Naya user create karo

    await user.save(); // Database me save karo

    // JWT token generate karo (user id store karte hain token me)
    const token = jwt.sign(
      { id: user._id }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: "7d" }, // token validity
    );

    // Token + user info frontend ko bhej do
    res.json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message }); // Server error
  }
});

// 👉 Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Email & password le rahe hain

  try {
    const user = await User.findOne({ email }); // Email se user find karo

    // Agar user nahi mila ya password match nahi hua
    if (!user || user.password !== password)
      return res.status(400).json({ message: "Invalid credentials" });

    // JWT token generate karo
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Token + user info bhej do
    res.json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
