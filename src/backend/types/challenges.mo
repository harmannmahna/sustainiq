module {
  public type ChallengeId = Nat;

  public type ChallengeStatus = {
    #active;
    #completed;
    #upcoming;
  };

  public type Challenge = {
    id : ChallengeId;
    title : Text;
    description : Text;
    durationDays : Nat;
    category : Text;
    status : ChallengeStatus;
    co2ReductionKg : Float;
    participantCount : Nat;
  };

  public type UserProgress = {
    challengeId : ChallengeId;
    daysCompleted : Nat;
    currentStreak : Nat;
    lastCheckIn : ?Nat;
  };
};
