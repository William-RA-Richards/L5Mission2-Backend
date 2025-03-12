# Insurance Calculator Backend

This is the backend API for the Insurance Calculator project, built with Node.js and Express.

## APIs

- **Car Value API**: Calculates the value of a car based on its model and year.

  - Endpoint: `/calculate-car-value`
  - File: [carValueAPI.js](carValueAPI.js)

- **Discount Rate API**: Calculates the discount rate based on age and driving experience.

  - Endpoint: `/calculate-discount`
  - File: [discountRateAPI.js](discountRateAPI.js)

- **Risk Rating API**: Evaluates the risk rating based on a given text.

  - Endpoint: `/evaluate-risk`
  - File: [riskRatingAPI.js](riskRatingAPI.js)

- **Quote API**: Calculates the insurance quote based on car value and risk rating.
  - Endpoint: `/calculate-quote`
  - File: [quoteAPI.js](quoteAPI.js)

## Running the Backend

To run the backend, navigate to the `L5Mission2-Backend` directory and install the dependencies:

```sh
npm install
```

Then, start the server:

```sh
npm start
```

## Testing the Backend

To run the tests for the backend, use the following command:

```sh
npm test
```

## Project Structure

```
L5Mission2-Backend/
  .gitignore
  carValueAPI.js
  discountRateAPI.js
  package.json
  quoteAPI.js
  README.md
  riskRatingAPI.js
  server.js
  tests/
    carValue.test.js
    carValueAPI.test.js
    discountRate.test.js
    discountRateAPI.test.js
    quote.test.js
    riskRating.test.js
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

William Richards - williamr@missionreadyhq.com

Dean Barrow - deanb@missionreadyhq.com

Mc Genesis De Vera - mcgenesisd@missionreadyhq.com

Project Link: [https://github.com/TheKoalaBear/Mission-02](https://github.com/TheKoalaBear/Mission-02)
