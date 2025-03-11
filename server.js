//* Module imports
const express = require("express");
const cors = require("cors");
const RiskAPI = require("./riskRatingAPI"); // Import the RiskAPI module (ensure it's correctly exported)
const PORT = 4000;

//* Enable Express (Remove if RiskAPI is the main app)
const app = express();

//* Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust to match your frontend URL
    methods: ["GET", "POST"], // Allow only needed HTTP methods
    credentials: true,
  })
);

//* Test endpoint
app.get("/", (req, res) => {
  res.send("The backend is running!");
});

//TODO Dean's API

function quote() {
  // Placeholder function for Dean's feature
}

app.get("/api/3", (req, res) => {
  res.send("Dean's API is running!");
});

//TODO Mc's API

// Middleware and endpoints for Mc's API
RiskAPI.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//TODO William's API

function carValue() {
  // Placeholder function for William's feature
}

app.get("/api/1", (req, res) => {
  res.send("William's API is running!");
});

//TODO Extra API

function discountRate() {
  // Placeholder function for additional feature
}

//* Export Functions for Testing
module.exports = { carValue, quote, discountRate };
