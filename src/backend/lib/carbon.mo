import Debug "mo:core/Debug";
import Array "mo:core/Array";
import Types "../types/carbon";

module {
  public type Category = Types.Category;
  public type FootprintInput = Types.FootprintInput;
  public type FootprintEstimate = Types.FootprintEstimate;
  public type ConversionFactor = Types.ConversionFactor;

  public func getConversionFactors() : [ConversionFactor] {
    [
      { category = #transportation; unit = "miles/week"; co2KgPerUnit = 0.404; moneySavedPerUnit = 0.15 },
      { category = #transportation; unit = "flights/year"; co2KgPerUnit = 900.0; moneySavedPerUnit = 0.0 },
      { category = #homeEnergy; unit = "kWh/month"; co2KgPerUnit = 0.85; moneySavedPerUnit = 0.12 },
      { category = #homeEnergy; unit = "therms/month"; co2KgPerUnit = 5.3; moneySavedPerUnit = 0.08 },
      { category = #diet; unit = "meals/week"; co2KgPerUnit = 2.5; moneySavedPerUnit = 3.5 },
      { category = #diet; unit = "kg meat/week"; co2KgPerUnit = 15.0; moneySavedPerUnit = 8.0 },
      { category = #shopping; unit = "items/month"; co2KgPerUnit = 10.0; moneySavedPerUnit = 5.0 },
      { category = #shopping; unit = "fast fashion/month"; co2KgPerUnit = 25.0; moneySavedPerUnit = 15.0 }
    ]
  };

  public func calculateFootprint(inputs : [FootprintInput]) : [FootprintEstimate] {
    let factors = getConversionFactors();
    inputs.map<FootprintInput, FootprintEstimate>(
      func(input) {
        let factor = switch (factors.find(func(f) { f.category == input.category and f.unit == input.unit })) {
          case (?f) { f };
          case (null) { { category = input.category; unit = input.unit; co2KgPerUnit = 0.0; moneySavedPerUnit = 0.0 } };
        };
        let annualValue = input.value * 52.0;
        {
          category = input.category;
          co2KgPerYear = annualValue * factor.co2KgPerUnit;
          moneySavedPerYear = annualValue * factor.moneySavedPerUnit;
        }
      }
    )
  };

  public func calculateTotalCo2(estimates : [FootprintEstimate]) : Float {
    estimates.foldLeft<FootprintEstimate, Float>(0.0, func(acc, e) { acc + e.co2KgPerYear })
  };

  public func calculateTotalSavings(estimates : [FootprintEstimate]) : Float {
    estimates.foldLeft<FootprintEstimate, Float>(0.0, func(acc, e) { acc + e.moneySavedPerYear })
  };
};
