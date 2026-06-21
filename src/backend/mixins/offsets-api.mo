import Debug "mo:core/Debug";
import Types "../types/offsets";
import OffsetsLib "../lib/offsets";

mixin () {
  public query func listOffsetOptions() : async [OffsetsLib.OffsetOption] {
    OffsetsLib.getPresetOffsetOptions()
  };

  public query func getOffsetOptionsByCategory(category : OffsetsLib.OffsetCategory) : async [OffsetsLib.OffsetOption] {
    OffsetsLib.getOffsetOptionsByCategory(category)
  };

  public query func getOffsetOption(id : Types.OffsetOptionId) : async ?OffsetsLib.OffsetOption {
    OffsetsLib.getOffsetOptionById(id)
  };

  public query func simulatePurchase(optionId : Types.OffsetOptionId, quantity : Nat) : async ?OffsetsLib.OffsetPurchase {
    switch (OffsetsLib.getOffsetOptionById(optionId)) {
      case (?option) { ?OffsetsLib.calculatePurchaseTotal(option, quantity) };
      case (null) { null };
    }
  };
};
