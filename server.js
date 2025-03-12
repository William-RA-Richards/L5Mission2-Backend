//* Module imports
const express = require("express");
const cors = require("cors");
const { carValueAPI } = require("./carValueAPI");
const PORT = 4000;

//* Enable Express
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

function quote() {}

app.get("/api/3", (req, res) => {
  res.send("The backend is running!");
});

//TODO Mc's API

function riskRating() {}

app.get("/api/2", (req, res) => {
  res.send("The backend is running!");
});

//TODO William's API

carValueAPI.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

//TODO Extra API

function discountRate() {}

//* Export Functions for Testing

module.exports = { riskRating, quote, discountRate };
