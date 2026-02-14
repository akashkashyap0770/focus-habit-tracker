const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Log = require("../models/Log"); 

// 🔹 Add Log
router.post("/", auth, async (req, res) => {
  const { activityName, category, duration } = req.body;

  try {
    const log = new Log({
      user: req.user._id,
      activityName,
      category,
      duration,
    });

    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Get Logs
router.get("/", auth, async (req, res) => {
  try {
    const logs = await Log.find({ user: req.user._id })
      .sort({ timestamp: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Delete Log
router.delete("/:id", auth, async (req, res) => {
  try {
    const log = await Log.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!log)
      return res.status(404).json({ message: "Log not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Weekly Analytics
router.get("/analytics/weekly", auth, async (req, res) => {
  try {
    const logs = await Log.find({ user: req.user._id });

    const analytics = {};

    logs.forEach((log) => {
      const weekDay = log.timestamp.toLocaleDateString("en-US", {
        weekday: "short",
      });

      if (!analytics[weekDay]) analytics[weekDay] = 0;
      analytics[weekDay] += log.duration;
    });

    res.json(analytics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
