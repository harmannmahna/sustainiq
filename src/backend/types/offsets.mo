module {
  public type OffsetOptionId = Nat;

  public type OffsetCategory = {
    #treePlanting;
    #communitySolar;
    #oceanCleanup;
    #wildlifeConservation;
  };

  public type OffsetOption = {
    id : OffsetOptionId;
    name : Text;
    description : Text;
    category : OffsetCategory;
    co2OffsetKg : Float;
    costUsd : Float;
    iconUrl : Text;
  };

  public type OffsetPurchase = {
    optionId : OffsetOptionId;
    quantity : Nat;
    totalCostUsd : Float;
    totalCo2OffsetKg : Float;
    purchasedAt : Nat;
  };
};
