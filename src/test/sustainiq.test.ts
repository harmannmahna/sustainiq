import { describe, expect, it } from "vitest";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Re-create minimal store logic inline for isolated unit testing
interface CalculatorState {
  transport: number;
  flights: number;
  energy: number;
  diet: "meat" | "mixed" | "vegetarian" | "vegan";
  shopping: number;
}

function computeFootprintFromState(state: CalculatorState): number {
  const transportCO2 = state.transport * 52 * 0.00017;
  const flightCO2 = state.flights * 1.6;
  const energyCO2 = state.energy * 12 * 0.0004;
  const dietMultipliers: Record<string, number> = {
    meat: 2.5,
    mixed: 1.8,
    vegetarian: 1.2,
    vegan: 0.9,
  };
  const dietCO2 = dietMultipliers[state.diet] || 1.8;
  const shoppingCO2 = state.shopping * 12 * 0.0005;
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
  return co2Saved * 120;
}

interface TestState {
  calculator: CalculatorState;
  ecoScore: number;
  setCalculator: (calc: Partial<CalculatorState>) => void;
  computeFootprint: () => number;
  computeSavings: () => number;
}

const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      calculator: {
        transport: 200,
        flights: 4,
        energy: 900,
        diet: "mixed",
        shopping: 300,
      },
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
      computeFootprint: () => computeFootprintFromState(get().calculator),
      computeSavings: () => computeSavingsFromState(get().calculator),
    }),
    { name: "test-sustainiq-store" },
  ),
);

describe("Footprint computation", () => {
  it("computes footprint for default calculator state", () => {
    const store = useTestStore.getState();
    const footprint = store.computeFootprint();
    expect(footprint).toBeGreaterThan(0);
    expect(footprint).toBeLessThan(20);
  });

  it("increases footprint when transport increases", () => {
    const store = useTestStore.getState();
    const before = store.computeFootprint();
    store.setCalculator({ transport: 1000 });
    const after = store.computeFootprint();
    expect(after).toBeGreaterThan(before);
  });
});

describe("Savings computation", () => {
  it("returns positive savings for default state", () => {
    const store = useTestStore.getState();
    const savings = store.computeSavings();
    expect(savings).toBeGreaterThan(0);
  });

  it("returns higher savings for lower footprint", () => {
    const store = useTestStore.getState();
    const baseline = store.computeSavings();
    store.setCalculator({ transport: 0, flights: 0, energy: 0, shopping: 0, diet: "vegan" });
    const after = store.computeSavings();
    expect(after).toBeGreaterThan(baseline);
  });
});

describe("Store state updates", () => {
  it("updates calculator and ecoScore on setCalculator", () => {
    const store = useTestStore.getState();
    store.setCalculator({ transport: 0, flights: 0, energy: 0, shopping: 0, diet: "vegan" });
    const state = useTestStore.getState();
    expect(state.calculator.transport).toBe(0);
    expect(state.calculator.diet).toBe("vegan");
    expect(state.ecoScore).toBeGreaterThan(50);
  });
});
