import Debug "mo:core/Debug";
import Array "mo:core/Array";
import Types "../types/offsets";

module {
  public type OffsetOption = Types.OffsetOption;
  public type OffsetCategory = Types.OffsetCategory;
  public type OffsetPurchase = Types.OffsetPurchase;

  public func getPresetOffsetOptions() : [OffsetOption] {
    [
      {
        id = 1;
        name = "Plant a Tree";
        description = "Fund the planting of a native tree through Eden Reforestation.";
        category = #treePlanting;
        co2OffsetKg = 21.0;
        costUsd = 1.0;
        iconUrl = "tree";
      },
      {
        id = 2;
        name = "Community Solar Panel";
        description = "Fund a share of a community solar project.";
        category = #communitySolar;
        co2OffsetKg = 500.0;
        costUsd = 25.0;
        iconUrl = "sun";
      },
      {
        id = 3;
        name = "Ocean Plastic Cleanup";
        description = "Remove 1 kg of plastic from the ocean.";
        category = #oceanCleanup;
        co2OffsetKg = 5.0;
        costUsd = 5.0;
        iconUrl = "waves";
      },
      {
        id = 4;
        name = "Wildlife Corridor";
        description = "Protect 10 sq meters of critical wildlife habitat.";
        category = #wildlifeConservation;
        co2OffsetKg = 100.0;
        costUsd = 10.0;
        iconUrl = "paw";
      },
      {
        id = 5;
        name = "Mangrove Restoration";
        description = "Restore coastal mangroves that sequester carbon 5x faster.";
        category = #treePlanting;
        co2OffsetKg = 50.0;
        costUsd = 5.0;
        iconUrl = "tree-pine";
      },
      {
        id = 6;
        name = "Wind Energy Credit";
        description = "Purchase a MWh of wind energy to offset grid power.";
        category = #communitySolar;
        co2OffsetKg = 1000.0;
        costUsd = 40.0;
        iconUrl = "wind";
      }
    ]
  };

  public func getOffsetOptionsByCategory(category : OffsetCategory) : [OffsetOption] {
    let all = getPresetOffsetOptions();
    all.filter<OffsetOption>(func(o) { o.category == category })
  };

  public func getOffsetOptionById(id : Types.OffsetOptionId) : ?OffsetOption {
    let all = getPresetOffsetOptions();
    all.find<OffsetOption>(func(o) { o.id == id })
  };

  public func calculatePurchaseTotal(option : OffsetOption, quantity : Nat) : OffsetPurchase {
    let q = quantity.toFloat();
    {
      optionId = option.id;
      quantity;
      totalCostUsd = option.costUsd * q;
      totalCo2OffsetKg = option.co2OffsetKg * q;
      purchasedAt = 0;
    }
  };
};
