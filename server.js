//* Module imports
const express = require("express");
const cors = require("cors");
const RiskAPI = require("./riskRatingAPI"); // Import the RiskAPI module (ensure it's correctly exported)
const { carValueAPI } = require("./carValueAPI");
const { discountRateAPI } = require("./discountRateAPI");
const { quoteAPI } = require("./quoteAPI");
const PORT = 4000;
const PORT3 = 5000;
const PORT2 = 4001;
const PORT4 = 4003;

//* Enable Express (Remove if RiskAPI is the main app)
const app = express();

//* Middleware
app.use(
      cors({
            origin: "http://localhost:5174/premium-calculator", // Adjust to match your frontend URL
            methods: ["GET", "POST"], // Allow only needed HTTP methods
            credentials: true,
      })
);

//* Test endpoint
app.get("/", (req, res) => {
      res.send("The backend is running!");
});

//TODO Dean's API

quoteAPI.listen(PORT3, () => {
      console.log(`Server is running at http://localhost:${PORT3}`);
});

//TODO Mc's API

// Middleware and endpoints for Mc's API
RiskAPI.listen(PORT2, () => {
  console.log(`Server is running on http://localhost:${PORT2}`);

});

//TODO William's API

carValueAPI.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
});

//TODO Extra API

discountRateAPI.listen(PORT4, () => {
  console.log(`Server is running at http://localhost:${PORT4}`);
});
