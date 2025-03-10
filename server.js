//* Module imports
const express = require("express");
const cors = require("cors");

//* Enable Express
const app = express();

//* Middleware
app.use(cors("http://localhost:5173")); // Adjust CORS for your frontend URL

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

function carValue({ model, year }) {
  let modelValue = 0;
  const letterRegex = new RegExp("[a-z]");
  for (let i = 0; i < model.length; i++) {
    const letter = model[i].toLowerCase();
    if (letter.match(letterRegex)) {
      const letterValue = letter.charCodeAt(0) - 97 + 1;
      modelValue += letterValue;
    }
  }

  modelValue = modelValue * 100 + year;

  return { car_value: modelValue };
}

app.get("/api/1", (req, res) => {
  res.send("The backend is running!");
});

//TODO Extra API

function discountRate() {}

//* Server port details
const PORT = 4000; // Default port to 4000 if not set in .env
app
  .listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server Error: ", err);
  });

//* Export Functions for Testing

module.exports = { carValue, riskRating, quote, discountRate };
