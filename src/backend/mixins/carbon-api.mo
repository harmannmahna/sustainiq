import Debug "mo:core/Debug";
import Types "../types/carbon";
import CarbonLib "../lib/carbon";

mixin () {
  public query func getConversionFactors() : async [CarbonLib.ConversionFactor] {
    CarbonLib.getConversionFactors()
  };

  public query func calculateFootprint(inputs : [CarbonLib.FootprintInput]) : async [CarbonLib.FootprintEstimate] {
    CarbonLib.calculateFootprint(inputs)
  };

  public query func calculateTotals(estimates : [CarbonLib.FootprintEstimate]) : async { totalCo2 : Float; totalSavings : Float } {
    {
      totalCo2 = CarbonLib.calculateTotalCo2(estimates);
      totalSavings = CarbonLib.calculateTotalSavings(estimates);
    }
  };
};
