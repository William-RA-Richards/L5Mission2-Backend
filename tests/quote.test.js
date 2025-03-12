const calcQuote = require("../quote.js");

test("Return premiums if car value + risk rating is correct", () => {
      const result = calcQuote(6441, 3);
      expect(result).toEqual({
            monthly_premium: 27.57,
            yearly_premium: 330.84,
      });
});

test("Invalid car value should return an error", () => {
      expect(calcQuote("Task-Force", 3)).toEqual({ error: "Invalid car value input" });
});

test("Risk rating too high should return an error", () => {
      expect(calcQuote(5000, 6)).toEqual({ error: "Invalid risk rating input" });
});

test("Risk rating out of bounds should return an error", () => {
      expect(calcQuote(5000, 0)).toEqual({ error: "Invalid risk rating input" });
});

test("Car value is zero should return an error", () => {
      expect(calcQuote(0, 3)).toEqual({ error: "Invalid car value input" });
});

test("Negative car value should return an error", () => {
      expect(calcQuote(-5000, 3)).toEqual({ error: "Invalid car value input" });
});
test("Negative risk rating should return an error", () => {
      expect(calcQuote(5000, -3)).toEqual({ error: "Invalid risk rating input" });
});

test("Risk rating as a decimal should be invalid", () => {
      expect(calcQuote(5000, 3.5)).toEqual({ error: "Invalid risk rating input" });
});

test("Risk rating as a string should return an error", () => {
      expect(calcQuote(5000, "3")).toEqual({ error: "Invalid risk rating input" });
});

test("Car value as null should return an error", () => {
      expect(calcQuote(null, 3)).toEqual({ error: "Invalid car value input" });
});

test("Risk rating as null should return an error", () => {
      expect(calcQuote(5000, null)).toEqual({ error: "Invalid risk rating input" });
});

test("Car value as NaN should return an error", () => {
      expect(calcQuote(NaN, 3)).toEqual({ error: "Invalid car value input" });
});

test("Car value as boolean should return an error", () => {
      expect(calcQuote(true, 3)).toEqual({ error: "Invalid car value input" });
      expect(calcQuote(false, 3)).toEqual({ error: "Invalid car value input" });
});

test("Risk rating as boolean should return an error", () => {
      expect(calcQuote(5000, true)).toEqual({ error: "Invalid risk rating input" });
      expect(calcQuote(5000, false)).toEqual({ error: "Invalid risk rating input" });
});

test("Missing both arguments should return an error", () => {
      expect(calcQuote()).toEqual({ error: "Invalid car value input" });
});

test("Car value with special characters should return an error", () => {
      expect(calcQuote("Car@123", 3)).toEqual({ error: "Invalid car value input" });
});
