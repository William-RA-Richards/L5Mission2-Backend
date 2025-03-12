const { discountRateAPI } = require("../discountRateAPI.js");
const request = require("supertest");

describe("discountRateAPI - /calculate-discount endpoint tests", () => {
  it("should calculate the discount given imputs age and experience.", async () => {
    const response = await request(discountRateAPI)
      .post("/calculate-discount")
      .send({ age: "25", licenceIssueDate: "1985-01-01" });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ discount_rate: 15 });
  });
});
