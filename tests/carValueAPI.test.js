const { carValueAPI } = require("../carValueAPI.js");
const request = require("supertest");

describe("carValueAPI - /calculate-car-value endpoint tests", () => {
  it("should calculate car value given imputs model and year of a car.", async () => {
    const response = await request(carValueAPI)
      .post("/calculate-car-value")
      .send({ carModel: "Civic", carYear: "2020" });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ car_value: 6620 });
  });
});
