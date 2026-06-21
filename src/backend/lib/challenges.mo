import Debug "mo:core/Debug";
import Array "mo:core/Array";
import Types "../types/challenges";

module {
  public type Challenge = Types.Challenge;
  public type ChallengeStatus = Types.ChallengeStatus;
  public type UserProgress = Types.UserProgress;

  public func getPresetChallenges() : [Challenge] {
    [
      {
        id = 1;
        title = "Meatless Weekday Challenge";
        description = "Skip meat every weekday for 21 days. Save CO2 and money!";
        durationDays = 21;
        category = "Diet";
        status = #active;
        co2ReductionKg = 157.5;
        participantCount = 1240;
      },
      {
        id = 2;
        title = "Commute by Bike";
        description = "Cycle to work or school for 21 days. Boost health and cut emissions.";
        durationDays = 21;
        category = "Transportation";
        status = #active;
        co2ReductionKg = 84.0;
        participantCount = 890;
      },
      {
        id = 3;
        title = "Zero Waste Week";
        description = "Produce no landfill waste for 7 days.";
        durationDays = 7;
        category = "Lifestyle";
        status = #upcoming;
        co2ReductionKg = 35.0;
        participantCount = 0;
      },
      {
        id = 4;
        title = "LED Light Switch";
        description = "Replace all bulbs with LEDs and track energy savings for 21 days.";
        durationDays = 21;
        category = "Home Energy";
        status = #active;
        co2ReductionKg = 45.0;
        participantCount = 2100;
      },
      {
        id = 5;
        title = "No Fast Fashion Month";
        description = "Avoid fast fashion purchases for 30 days.";
        durationDays = 30;
        category = "Shopping";
        status = #upcoming;
        co2ReductionKg = 120.0;
        participantCount = 0;
      }
    ]
  };

  public func getChallengesByStatus(status : ChallengeStatus) : [Challenge] {
    let all = getPresetChallenges();
    all.filter<Challenge>(func(c) { c.status == status })
  };

  public func getChallengeById(id : Types.ChallengeId) : ?Challenge {
    let all = getPresetChallenges();
    all.find<Challenge>(func(c) { c.id == id })
  };

  public func createDefaultProgress(challengeId : Types.ChallengeId) : UserProgress {
    { challengeId; daysCompleted = 0; currentStreak = 0; lastCheckIn = null }
  };
};
