const RiskAPI = require("../riskRatingAPI"); // Import the RiskAPI module
const request = require("supertest");

describe("RiskAPI - /evaluate-risk Endpoint", () => {
  it("should correctly calculate risk rating and risk level for given text", async () => {
    const response = await request(RiskAPI)
      .post("/evaluate-risk")
      .send({ text: "The car was damaged and broken after the crash." });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      text: "the car was damaged and broken after the crash.",
      riskRating: 3, // 1 (crash) + 1 (damaged) + 1 (broken)
      riskLevel: "Medium",
    });
  });

  it("should correctly identify partial matches within words", async () => {
    const response = await request(RiskAPI)
      .post("/evaluate-risk")
      .send({ text: "The car was damaged and parts were broken." });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      text: "the car was damaged and parts were broken.",
      riskRating: 2, // 1 (broke) + 1 (damaged)
      riskLevel: "Low",
    });
  });

  it("should return an error for invalid input (missing text)", async () => {
    const response = await request(RiskAPI).post("/evaluate-risk").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid input. Please send valid text.",
    });
  });

  it("should return an error for non-string input", async () => {
    const response = await request(RiskAPI)
      .post("/evaluate-risk")
      .send({ text: 12345 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid input. Please send valid text.",
    });
  });

  it("should return a risk rating of 0 and risk level 'None' for text with no risk words", async () => {
    const response = await request(RiskAPI)
      .post("/evaluate-risk")
      .send({ text: "The car is in perfect condition." });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      text: "the car is in perfect condition.",
      riskRating: 0,
      riskLevel: "None",
    });
  });

  it("should handle mixed case text correctly", async () => {
    const response = await request(RiskAPI)
      .post("/evaluate-risk")
      .send({ text: "The Car Was Damaged And Broken After The Crash." });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      text: "the car was damaged and broken after the crash.",
      riskRating: 3, // 1 (crash) + 1 (damaged) + 1 (broken)
      riskLevel: "Medium",
    });
  });

  it("should handle text with multiple occurrences of the same risk word", async () => {
    const response = await request(RiskAPI)
      .post("/evaluate-risk")
      .send({ text: "The car was damaged, damaged, and damaged again." });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      text: "the car was damaged, damaged, and damaged again.",
      riskRating: 3, // 1 (damaged) + 1 (damaged) + 1 (damaged)
      riskLevel: "Medium",
    });
  });

  it("should handle text with special characters and punctuation", async () => {
    const response = await request(RiskAPI)
      .post("/evaluate-risk")
      .send({ text: "The car was damaged! Broken? Yes, after the crash." });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      text: "the car was damaged! broken? yes, after the crash.",
      riskRating: 3, // 1 (crash) + 1 (damaged) + 1 (broken)
      riskLevel: "Medium",
    });
  });

  it("should handle empty text input", async () => {
    const response = await request(RiskAPI)
      .post("/evaluate-risk")
      .send({ text: "" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid input. Please send valid text.",
    });
  });
});
