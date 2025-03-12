const express = require("express");
const cors = require("cors");
const RiskAPI = express();

// Middleware
RiskAPI.use(cors());
RiskAPI.use(express.json());

// Keywords and associated risk weights
const keywords = {
  crash: 1,
  damaged: 1,
  broken: 1,
};

// Endpoint to process text and return a risk rating
RiskAPI.post("/evaluate-risk", (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid input. Please send valid text." });
  }

  // Sanitize and normalize text
  const sanitizedText = text.trim().toLowerCase();

  // Initialize risk rating
  let riskRating = 0;

  // Match text using regex for each keyword
  Object.keys(keywords).forEach((keyword) => {
    const regex = new RegExp(keyword, "g"); // Create a regex to match the keyword globally
    const matches = sanitizedText.match(regex); // Find all matches in the text
    if (matches) {
      riskRating += keywords[keyword] * matches.length; // Multiply risk weight by the number of matches
    }
  });

  // Define risk level based on the rating
  let riskLevel = "Low";
  if (riskRating > 2 && riskRating <= 4) riskLevel = "Medium";
  else if (riskRating > 5) riskLevel = "High";

  res.json({
    text: sanitizedText,
    riskRating,
    riskLevel,
  });
});

// Global error handler
RiskAPI.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "An internal server error occurred." });
});

// Export RiskAPI
module.exports = RiskAPI;
