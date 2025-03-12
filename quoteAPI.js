const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// function
function calcQuote(carValue, riskRating) {
      // Validate carValue
      if (carValue === undefined || carValue === null || typeof carValue === "boolean")
            return { error: "Invalid car value input" };
      if (typeof carValue !== "number" || isNaN(carValue)) return { error: "Invalid car value input" };
      if (carValue <= 0) return { error: "Invalid car value input" };

      // Validate riskRating
      if (riskRating === undefined || riskRating === null || typeof riskRating === "boolean")
            return { error: "Invalid risk rating input" };
      if (typeof riskRating !== "number" || isNaN(riskRating)) return { error: "Invalid risk rating input" };
      if (!Number.isInteger(riskRating)) return { error: "Invalid risk rating input" };
      if (riskRating < 1 || riskRating > 5) return { error: "Invalid risk rating input" };

      // Premium calculation logic
      const baseRate = 0.004;
      const riskMultiplier = 1 + (riskRating - 1) * 0.1;
      const yearlyPremium = carValue * baseRate * riskMultiplier;
      const monthlyPremium = yearlyPremium / 12;

      return {
            monthly_premium: parseFloat(monthlyPremium.toFixed(2)),
            yearly_premium: parseFloat(yearlyPremium.toFixed(2)),
      };
}

// API route to calculate quote
app.post("/calculate-quote", (req, res) => {
      console.log(req.body);
      const { carValue, riskRating } = req.body;
      const data = calcQuote(carValue, riskRating);
      data?.error ? res.status(400).json(data) : res.status(200).json(data);
});

app.use((err, req, res, next) => {
      console.error("Server Error:", err.message);
      res.status(500).json({ error: "An internal server error occurred." });
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
      console.log(`Quote API is running on http://localhost:${PORT}`);
});

module.exports = { calcQuote };
