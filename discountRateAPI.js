const express = require("express");
const cors = require("cors");
const discountRateAPI = express();

// Middleware
discountRateAPI.use(cors());
discountRateAPI.use(express.json());

function discountRate({ age, experience }) {
  try {
    if (age === undefined && experience === undefined) {
      throw "No Inputs Detected";
    } else if (age === undefined) {
      throw "No Age Input Detected";
    } else if (experience === undefined) {
      throw "No Experience Input Detected";
    } else if (typeof age != typeof 9 || isNaN(age)) {
      throw "Invalid Data Type Input For Age";
    } else if (typeof experience != typeof 9 || isNaN(experience)) {
      throw "Invalid Data Type Input For Experience";
    }

    let discountRate = 0;

    if (age >= 25 && age < 40) {
      discountRate += 5;
    } else if (age >= 40) {
      discountRate += 10;
    }

    if (experience >= 5 && experience < 10) {
      discountRate += 5;
    } else if (experience >= 10) {
      discountRate += 10;
    }

    return { discount_rate: discountRate };
  } catch (error) {
    if (!(error instanceof Error)) {
      error = new Error(error);
    } else if (error instanceof TypeError) {
    }
    return { error_message: error.toString().split(": ").pop() };
  }
}

discountRateAPI.post("/calculate-discount", (req, res) => {
  const { age, licenceIssueDate } = req.body;

  const licenceYear = licenceIssueDate.split("-")[0];
  const currentYear = new Date().getFullYear();
  const experience = currentYear - licenceYear;

  const data = discountRate({
    age: parseInt(age),
    experience: parseInt(experience),
  });
  data?.error_message ? res.status(400).send(data) : res.status(200).send(data);
});

// Global error handler
discountRateAPI.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "An internal server error occurred." });
});

module.exports = { discountRateAPI, discountRate };
