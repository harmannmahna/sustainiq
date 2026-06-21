import Debug "mo:core/Debug";
import Types "../types/challenges";
import ChallengesLib "../lib/challenges";

mixin () {
  public query func listChallenges() : async [ChallengesLib.Challenge] {
    ChallengesLib.getPresetChallenges()
  };

  public query func getChallengesByStatus(status : ChallengesLib.ChallengeStatus) : async [ChallengesLib.Challenge] {
    ChallengesLib.getChallengesByStatus(status)
  };

  public query func getChallenge(id : Types.ChallengeId) : async ?ChallengesLib.Challenge {
    ChallengesLib.getChallengeById(id)
  };

  public query func getDefaultProgress(challengeId : Types.ChallengeId) : async ChallengesLib.UserProgress {
    ChallengesLib.createDefaultProgress(challengeId)
  };
};
