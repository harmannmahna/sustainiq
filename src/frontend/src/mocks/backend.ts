import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  calculateFootprint: async () => [],
  calculateTotals: async () => ({ totalCo2: 0, totalSavings: 0 }),
  getChallenge: async () => null,
  getChallengesByStatus: async () => [],
  getConversionFactors: async () => [],
  getDefaultProgress: async () => ({ challengeId: 0n, daysCompleted: 0n, currentStreak: 0n }),
  getOffsetOption: async () => null,
  getOffsetOptionsByCategory: async () => [],
  listChallenges: async () => [],
  listOffsetOptions: async () => [],
  simulatePurchase: async () => null,
};
