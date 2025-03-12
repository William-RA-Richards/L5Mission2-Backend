function calcQuote(carValue, riskRating) {
      if (typeof carValue !== "number" || isNaN(carValue) || carValue <= 0) {
            return { error: "Invalid car value input" };
      }

      if (typeof riskRating !== "number" || riskRating < 1 || riskRating > 5 || riskRating % 1 !== 0) {
            return { error: "Invalid risk rating input" };
      }

      // Calculate premiums if inputs are valid
      const yearly_premium = carValue * riskRating * 0.017121564974382858;
      const monthly_premium = yearly_premium / 12;

      return {
            monthly_premium: parseFloat(monthly_premium.toFixed(2)),
            yearly_premium: parseFloat(yearly_premium.toFixed(2)),
      };
}

module.exports = calcQuote;
