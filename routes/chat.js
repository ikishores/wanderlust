const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: 'mistralai/mistral-7b-instruct-v0.1', // or another available model
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // change to your domain
          "X-Title": "My Chatbot", // optional
        },
      }
    );

    const botReply = response.data.choices[0]?.message?.content || "No reply.";
    res.json({ reply: botReply });
  } catch (err) {
    console.error("OpenRouter error:", err?.response?.data || err.message);
    res.status(500).json({ reply: "Something went wrong!" });
  }
});

module.exports = router;
