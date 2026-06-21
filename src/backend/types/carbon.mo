import Common "common";

module {

  public type Category = {
    #transportation;
    #homeEnergy;
    #diet;
    #shopping;
  };

  public type FootprintInput = {
    category : Category;
    value : Float;
    unit : Text;
  };

  public type FootprintEstimate = {
    category : Category;
    co2KgPerYear : Float;
    moneySavedPerYear : Float;
  };

  public type ConversionFactor = {
    category : Category;
    unit : Text;
    co2KgPerUnit : Float;
    moneySavedPerUnit : Float;
  };
};
