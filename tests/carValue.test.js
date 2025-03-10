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
  test.todo("Negative year number check.");
  test.todo("Model with numbers only check.");
  test.todo("Empty Model check.");
  test.todo("Pre 1886 Year check.");
});

describe("carValue function boundary tests", () => {
  test.todo("Long Model name check.");
  test.todo("Short model name check.");
  test.todo("Large year check.");
  test.todo("Small year check.");
});

describe("carValue function error handling tests", () => {
  test.todo("No Input check.");
  test.todo("No Year check.");
  test.todo("No Model check.");
  test.todo("Wrong Data Type Year check.");
  test.todo("Wrong Data Type Model check.");
});
