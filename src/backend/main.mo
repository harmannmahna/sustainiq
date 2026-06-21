import MixinViews "mo:caffeineai-data-viewer/MixinViews";
import CarbonMixin "mixins/carbon-api";
import ChallengesMixin "mixins/challenges-api";
import OffsetsMixin "mixins/offsets-api";

actor {
  include MixinViews();
  include CarbonMixin();
  include ChallengesMixin();
  include OffsetsMixin();
};
