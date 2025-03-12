const express = require("express");
const cors = require("cors");
const carValueAPI = express();

// Middleware
carValueAPI.use(cors());
carValueAPI.use(express.json());

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

carValueAPI.post("/calculate-car-value", (req, res) => {
  const { carModel, carYear } = req.body;
  const data = carValue({ model: carModel, year: parseInt(carYear) });
  data?.error_message ? res.status(400).send(data) : res.status(200).send(data);
});

// Global error handler
carValueAPI.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "An internal server error occurred." });
});

module.exports = { carValue, carValueAPI };
