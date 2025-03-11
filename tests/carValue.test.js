const { carValue } = require("../server.js");

describe("carValue function normal tests", () => {
  //*Normal Tests
  test("Basic Functionality check.", () => {
    expect(carValue({ model: "Civic", year: 2020 })).toEqual({
      car_value: 6620,
    });
    expect(carValue({ model: "Civic", year: 2014 })).toEqual({
      car_value: 6614,
    });
    expect(carValue({ model: "Sedan", year: 2008 })).toEqual({
      car_value: 6308,
    });
    expect(carValue({ model: "Wagon", year: 2022 })).toEqual({
      car_value: 8022,
    });
  });

  //*Uppercase Tests
  test("Model with Uppercase letters check.", () => {
    expect(carValue({ model: "CIVIC", year: 2001 })).toEqual({
      car_value: 6601,
    });
    expect(carValue({ model: "SUV", year: 2018 })).toEqual({
      car_value: 8218,
    });
  });

  //*Lowercase Tests
  test("Model with Lowercase letters check.", () => {
    expect(carValue({ model: "sedan", year: 1997 })).toEqual({
      car_value: 6297,
    });
    expect(carValue({ model: "wagon", year: 2042 })).toEqual({
      car_value: 8042,
    });
  });

  //*Spaces and Symbols Tests
  test("Model with Spaces and/or Symbols check.", () => {
    expect(carValue({ model: "Pickup Truck", year: 2010 })).toEqual({
      car_value: 16910,
    });
    expect(carValue({ model: "$#%@*&^", year: 2000 })).toEqual({
      car_value: 2000,
    });
  });
});

describe("carValue function edge case tests", () => {
  //* Negative Year Tests
  test("Negative year number check.", () => {
    expect(carValue({ model: "Civic", year: -200 })).toEqual({
      error_message: "Entered an invalid year",
    });
    expect(carValue({ model: "Civic", year: -1200 })).toEqual({
      error_message: "Entered an invalid year",
    });
    expect(carValue({ model: "Civic", year: -2 })).toEqual({
      error_message: "Entered an invalid year",
    });
  });

  //* Numbers Only Model Tests
  test("Model with numbers only check.", () => {
    expect(carValue({ model: "23985", year: 1965 })).toEqual({
      car_value: 1965,
    });
    expect(carValue({ model: "2", year: 2001 })).toEqual({
      car_value: 2001,
    });
    expect(carValue({ model: "447690125", year: 2024 })).toEqual({
      car_value: 2024,
    });
  });

  //* Empty Model Tests
  test("Empty Model check.", () => {
    expect(carValue({ model: "", year: 2024 })).toEqual({
      error_message: "Please enter a model type",
    });
  });

  //* Pre 1886 Year Tests
  test("Pre 1886 Year check.", () => {
    expect(carValue({ model: "SUV", year: 0 })).toEqual({
      error_message: "Entered an invalid year",
    });
    expect(carValue({ model: "Sedan", year: 35 })).toEqual({
      error_message: "Entered an invalid year",
    });
    expect(carValue({ model: "Wagon", year: 365 })).toEqual({
      error_message: "Entered an invalid year",
    });
    expect(carValue({ model: "Civic", year: 1689 })).toEqual({
      error_message: "Entered an invalid year",
    });
    expect(carValue({ model: "Hatchback", year: 1885 })).toEqual({
      error_message: "Entered an invalid year",
    });
  });
});

describe("carValue function boundary tests", () => {
  //* Long Model Tests
  test("Long Model name check.", () => {
    expect(
      carValue({
        model:
          "Land Rover Range Rover Evoque 2.0 TD4 E-Capability 4x4 HSE Dynamic",
        year: 2000,
      })
    ).toEqual({
      car_value: 58900,
    });
    expect(carValue({ model: "Civic-Wagon-Sedan-SUV", year: 2023 })).toEqual({
      car_value: 23123,
    });
  });

  //* Short Model Tests
  test("Short model name check.", () => {
    expect(carValue({ model: "a", year: 2024 })).toEqual({
      car_value: 2124,
    });
    expect(carValue({ model: "Z", year: 2024 })).toEqual({
      car_value: 4624,
    });
    expect(carValue({ model: "yb", year: 1999 })).toEqual({
      car_value: 4699,
    });
  });

  //* Large Year Tests
  test("Large year check.", () => {
    expect(
      carValue({
        model: "Civic",
        year: 546908231290548200337812345678907754882520,
      })
    ).toEqual({
      car_value: 546908231290548200337812345678907754887120,
    });
  });

  //* Minimum Year Tests
  test("Minimum year check.", () => {
    expect(carValue({ model: "model no. 1", year: 1886 })).toEqual({
      car_value: 9686,
    });
    expect(carValue({ model: "civic", year: 1886 })).toEqual({
      car_value: 6486,
    });
  });
});

describe("carValue function error handling tests", () => {
  //* No Input Test
  test("No Input check.", () => {
    expect(carValue({})).toEqual({
      error_message: "No Inputs Detected",
    });
  });

  //* No Year Input Tests
  test("No Year check.", () => {
    expect(carValue({ model: "Civic" })).toEqual({
      error_message: "No Year Input Detected",
    });
  });
  test("No Model check.", () => {
    expect(carValue({ year: 1989 })).toEqual({
      error_message: "No Model Input Detected",
    });
  });
  test("Wrong Data Type Year check.", () => {
    expect(carValue({ model: "Civic", year: "Twenty Twenty" })).toEqual({
      error_message: "Invalid Data Type Input For Year",
    });
  });
  test("Wrong Data Type Model check.", () => {
    expect(carValue({ model: 19, year: 1994 })).toEqual({
      error_message: "Invalid Data Type Input For Model",
    });
  });
});
