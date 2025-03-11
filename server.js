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
  try {
    //* Testing if model and year are valid inputs
    if (model === undefined && year === undefined) {
      throw "No Inputs Detected";
    } else if (year === undefined) {
      throw "No Year Input Detected";
    } else if (model === undefined) {
      throw "No Model Input Detected";
    } else if (typeof year != typeof 9 || isNaN(year)) {
      throw "Invalid Data Type Input For Year";
    } else if (typeof model != typeof "9") {
      throw "Invalid Data Type Input For Model";
    }

    //* Testing if year meets minimum and model has at least 1 letter
    if (year < 1886) {
      throw "Entered an invalid year";
    } else if (model.length < 1) {
      throw "Please enter a model type";
    }

    let modelValue = 0;
    const letterRegex = new RegExp("[a-z]");

    //* Calculating each letters worth
    for (let i = 0; i < model.length; i++) {
      const letter = model[i].toLowerCase();
      if (letter.match(letterRegex)) {
        const letterValue = letter.charCodeAt(0) - 97 + 1;
        modelValue += letterValue;
      }
    }

    finalValue = modelValue * 100 + year;

    return { car_value: finalValue };
  } catch (error) {
    if (!(error instanceof Error)) {
      error = new Error(error);
    } else if (error instanceof TypeError) {
    }
    return { error_message: error.toString().split(": ").pop() };
  }
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
