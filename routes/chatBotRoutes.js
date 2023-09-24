const express = require("express");
const router = express.Router();
const chatController = require("../controller/chatBotController");

// POST /api/chat
router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const answer = await chatController.processMessage(message);
    res.json({ message: answer });
  } catch (error) {
    console.error("Error executing NLP:", error);
    res.status(500).json({ message: "Error executing NLP" });
  }
});

module.exports = router;
