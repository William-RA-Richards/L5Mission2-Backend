const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// function
function calcQuote(carValue, riskRating) {
      // Validate carValue
      console.log("Validating carValue:", carValue);
      if (carValue === undefined || carValue === null || typeof carValue === "boolean")
            return { error: "Invalid car value input" };
      if (typeof carValue !== "number" || isNaN(carValue)) return { error: "Invalid car value input" };
      if (carValue <= 0) return { error: "Invalid car value input" };

      // Validate riskRating
      console.log("Validating riskRating:", riskRating);
      if (riskRating === undefined || riskRating === null || typeof riskRating === "boolean")
            return { error: "Invalid risk rating input" };
      if (typeof riskRating !== "number" || isNaN(riskRating)) return { error: "Invalid risk rating input" };
      if (!Number.isInteger(riskRating)) return { error: "Invalid risk rating input" };
      if (riskRating < 1 || riskRating > 5) return { error: "Invalid risk rating input" };

      // Premium calculation logic
      const baseRate = 100;
      const yearlyPremium = (carValue * riskRating) / baseRate;
      const monthlyPremium = yearlyPremium / 12;

      return {
            monthly_premium: parseFloat(monthlyPremium.toFixed(2)),
            yearly_premium: parseFloat(yearlyPremium.toFixed(2)),
      };
}

// API route to calculate quote
app.post("/calculate-quote", (req, res) => {
      console.log("Request body:", req.body);
      const { carValue, riskRating } = req.body;
      if (carValue === undefined || riskRating === undefined) {
            console.error("Invalid input: carValue or riskRating is undefined");
            console.log("test2", carValue, riskRating);
            return res.status(400).json({ error: "Invalid input" });
      }
      const parsedCarValue = Number(carValue);
      const parsedRiskRating = Number(riskRating);
      console.log("Parsed values:", { parsedCarValue, parsedRiskRating });
      const data = calcQuote(parsedCarValue, parsedRiskRating);
      if (data?.error) {
            console.error("Validation error:", data.error);
            console.log(carValue, riskRating);
            return res.status(400).json(data);
      }
      res.status(200).json(data);
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
