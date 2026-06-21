import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CalculatorState {
  transport: number; // km driven per week
  flights: number; // flights per year
  energy: number; // kWh per month
  diet: "meat" | "mixed" | "vegetarian" | "vegan";
  shopping: number; // monthly spend on goods
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  daysTotal: number;
  daysCompleted: number;
  streak: number;
  joined: boolean;
}

export interface OffsetPurchase {
  id: string;
  type: "tree" | "solar";
  quantity: number;
  date: string;
  cost: number;
}

interface SustainIQState {
  calculator: CalculatorState;
  challenges: Challenge[];
  offsets: OffsetPurchase[];
  ecoScore: number;
  setCalculator: (calc: Partial<CalculatorState>) => void;
  resetCalculator: () => void;
  joinChallenge: (id: string) => void;
  checkInChallenge: (id: string) => void;
  purchaseOffset: (purchase: OffsetPurchase) => void;
  computeFootprint: () => number;
  computeSavings: () => number;
}

const DEFAULT_CHALLENGES: Challenge[] = [
  {
    id: "meatless",
    title: "Meatless Weekdays",
    description: "Skip meat Mon–Fri",
    category: "Diet",
    daysTotal: 21,
    daysCompleted: 0,
    streak: 0,
    joined: false,
  },
  {
    id: "bike",
    title: "Bike Commute",
    description: "Cycle to work or errands",
    category: "Transport",
    daysTotal: 21,
    daysCompleted: 0,
    streak: 0,
    joined: false,
  },
  {
    id: "led",
    title: "LED Switch",
    description: "Replace bulbs with LEDs",
    category: "Home",
    daysTotal: 21,
    daysCompleted: 0,
    streak: 0,
    joined: false,
  },
  {
    id: "unplug",
    title: "Unplug Vampire Power",
    description: "Turn off standby devices nightly",
    category: "Home",
    daysTotal: 21,
    daysCompleted: 0,
    streak: 0,
    joined: false,
  },
  {
    id: "local",
    title: "Buy Local",
    description: "Shop at farmers markets",
    category: "Shopping",
    daysTotal: 21,
    daysCompleted: 0,
    streak: 0,
    joined: false,
  },
];

const DEFAULT_CALCULATOR: CalculatorState = {
  transport: 200,
  flights: 4,
  energy: 900,
  diet: "mixed",
  shopping: 300,
};

function computeFootprintFromState(state: CalculatorState): number {
  const transportCO2 = state.transport * 52 * 0.00017; // kg/km -> t/year
  const flightCO2 = state.flights * 1.6; // t/year per flight
  const energyCO2 = state.energy * 12 * 0.0004; // kWh -> t/year
  const dietMultipliers: Record<string, number> = {
    meat: 2.5,
    mixed: 1.8,
    vegetarian: 1.2,
    vegan: 0.9,
  };
  const dietCO2 = dietMultipliers[state.diet] || 1.8;
  const shoppingCO2 = state.shopping * 12 * 0.0005; // $ -> t/year
  return transportCO2 + flightCO2 + energyCO2 + dietCO2 + shoppingCO2;
}

function computeSavingsFromState(state: CalculatorState): number {
  const baseline = computeFootprintFromState({
    ...state,
    transport: 400,
    flights: 10,
    energy: 1200,
    diet: "meat",
    shopping: 600,
  });
  const current = computeFootprintFromState(state);
  const co2Saved = baseline - current;
  return co2Saved * 120; // $ saved per tonne CO2
}

export const useSustainIQStore = create<SustainIQState>()(
  persist(
    (set, get) => ({
      calculator: DEFAULT_CALCULATOR,
      challenges: DEFAULT_CHALLENGES,
      offsets: [],
      ecoScore: 0,
      setCalculator: (calc) =>
        set((state) => {
          const next = { ...state.calculator, ...calc };
          const footprint = computeFootprintFromState(next);
          const score = Math.max(
            0,
            Math.min(100, Math.round(100 - footprint * 5)),
          );
          return { calculator: next, ecoScore: score };
        }),
      resetCalculator: () =>
        set(() => {
          const footprint = computeFootprintFromState(DEFAULT_CALCULATOR);
          const score = Math.max(
            0,
            Math.min(100, Math.round(100 - footprint * 5)),
          );
          return { calculator: DEFAULT_CALCULATOR, ecoScore: score };
        }),
      joinChallenge: (id) =>
        set((state) => ({
          challenges: state.challenges.map((c) =>
            c.id === id ? { ...c, joined: true } : c,
          ),
        })),
      checkInChallenge: (id) =>
        set((state) => ({
          challenges: state.challenges.map((c) => {
            if (c.id !== id || !c.joined) return c;
            const nextDays = Math.min(c.daysTotal, c.daysCompleted + 1);
            const nextStreak = c.streak + 1;
            return { ...c, daysCompleted: nextDays, streak: nextStreak };
          }),
        })),
      purchaseOffset: (purchase) =>
        set((state) => ({
          offsets: [...state.offsets, purchase],
        })),
      computeFootprint: () => computeFootprintFromState(get().calculator),
      computeSavings: () => computeSavingsFromState(get().calculator),
    }),
    { name: "sustainiq-store" },
  ),
);
