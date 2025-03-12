const { discountRate } = require("../discountRateAPI.js");

describe("discountRate function normal tests", () => {
  //*Normal Tests
  test("Basic Functionality check.", () => {
    expect(discountRate({ age: 30, experience: 6 })).toEqual({
      discount_rate: 10,
    });
    expect(discountRate({ age: 20, experience: 10 })).toEqual({
      discount_rate: 10,
    });
    expect(discountRate({ age: 25, experience: 1 })).toEqual({
      discount_rate: 5,
    });
    expect(discountRate({ age: 40, experience: 5 })).toEqual({
      discount_rate: 15,
    });
  });
});

describe("carVdiscountRatealue function Edge Case tests", () => {
  //*Negaitve Experience Tests
  test("Negaitve Experience check.", () => {
    expect(discountRate({ age: 30, experience: -25 })).toEqual({
      discount_rate: 5,
    });
  });

  //*Negaitve Age Tests
  test("Negaitve Age check.", () => {
    expect(discountRate({ age: -30, experience: 5 })).toEqual({
      discount_rate: 5,
    });
  });
});

describe("discountRate function Boundary tests", () => {
  //*Maximum Discount (Max age and experience) Tests
  test("Maximum Discount check.", () => {
    expect(discountRate({ age: 40, experience: 10 })).toEqual({
      discount_rate: 20,
    });
    expect(discountRate({ age: 120, experience: 90 })).toEqual({
      discount_rate: 20,
    });
  });

  //*Minimum Age Tests
  test("Minimum Age check.", () => {
    expect(discountRate({ age: 5, experience: 5 })).toEqual({
      discount_rate: 5,
    });
  });

  //*Minimum Experience Tests
  test("Minimum Experience check.", () => {
    expect(discountRate({ age: 25, experience: 0 })).toEqual({
      discount_rate: 5,
    });
  });

  //*Maximum Experience Tests
  test("Minimum Experience check.", () => {
    expect(discountRate({ age: 16, experience: 2000000000 })).toEqual({
      discount_rate: 10,
    });
  });

  //*Maximum Age Tests
  test("Minimum Age check.", () => {
    expect(discountRate({ age: 324782347141324665, experience: 0 })).toEqual({
      discount_rate: 10,
    });
  });
});

describe("discountRate function Error Handling tests", () => {
  //*No Input Tests
  test("No Input check.", () => {
    expect(discountRate({})).toEqual({
      error_message: "No Inputs Detected",
    });
  });

  //*No Age Input Tests
  test("No Age Input check.", () => {
    expect(discountRate({ experience: 5 })).toEqual({
      error_message: "No Age Input Detected",
    });
  });

  //*No Experience Input Tests
  test("No Experience Input check.", () => {
    expect(discountRate({ age: 25 })).toEqual({
      error_message: "No Experience Input Detected",
    });
  });

  //*Wrong Data Type for Age Tests
  test("Wrong Data Type for Age check.", () => {
    expect(discountRate({ age: "30", experience: 5 })).toEqual({
      error_message: "Invalid Data Type Input For Age",
    });
    expect(discountRate({ age: true, experience: 5 })).toEqual({
      error_message: "Invalid Data Type Input For Age",
    });
    expect(discountRate({ age: null, experience: 5 })).toEqual({
      error_message: "Invalid Data Type Input For Age",
    });
    expect(discountRate({ age: NaN, experience: 5 })).toEqual({
      error_message: "Invalid Data Type Input For Age",
    });
  });

  //*Wrong Data Type for Experience Tests
  test("Wrong Data Type for Experience check.", () => {
    expect(discountRate({ age: 30, experience: "5" })).toEqual({
      error_message: "Invalid Data Type Input For Experience",
    });
    expect(discountRate({ age: 30, experience: true })).toEqual({
      error_message: "Invalid Data Type Input For Experience",
    });
    expect(discountRate({ age: 30, experience: null })).toEqual({
      error_message: "Invalid Data Type Input For Experience",
    });
    expect(discountRate({ age: 30, experience: NaN })).toEqual({
      error_message: "Invalid Data Type Input For Experience",
    });
  });
});
