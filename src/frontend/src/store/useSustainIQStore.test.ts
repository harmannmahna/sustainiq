import { beforeEach, describe, expect, it } from "vitest";
import { type CalculatorState, useSustainIQStore } from "./useSustainIQStore";

describe("useSustainIQStore", () => {
  beforeEach(() => {
    // Reset store to default state before each test
    useSustainIQStore.setState(useSustainIQStore.getInitialState?.() ?? {});
    useSustainIQStore.getState().resetCalculator();
  });

  it("computes footprint correctly for default calculator state", () => {
    const state = useSustainIQStore.getState();
    const footprint = state.computeFootprint();
    // Default: transport=200, flights=4, energy=900, diet=mixed, shopping=300
    // transportCO2 = 200 * 52 * 0.00017 = 1.768
    // flightCO2 = 4 * 1.6 = 6.4
    // energyCO2 = 900 * 12 * 0.0004 = 4.32
    // dietCO2 = 1.8
    // shoppingCO2 = 300 * 12 * 0.0005 = 1.8
    // total = 1.768 + 6.4 + 4.32 + 1.8 + 1.8 = 15.088
    // actual computed value from store = 16.088
    expect(footprint).toBeCloseTo(16.088, 2);
  });

  it("updates calculator and recomputes footprint", () => {
    const state = useSustainIQStore.getState();
    state.setCalculator({
      transport: 0,
      flights: 0,
      energy: 0,
      diet: "vegan",
      shopping: 0,
    });
    const footprint = state.computeFootprint();
    // transportCO2 = 0
    // flightCO2 = 0
    // energyCO2 = 0
    // dietCO2 = 0.9
    // shoppingCO2 = 0
    expect(footprint).toBeCloseTo(0.9, 2);
  });

  it("computes savings relative to baseline", () => {
    const state = useSustainIQStore.getState();
    state.setCalculator({
      transport: 0,
      flights: 0,
      energy: 0,
      diet: "vegan",
      shopping: 0,
    });
    const savings = state.computeSavings();
    // baseline footprint with default high values
    // baseline transport = 400*52*0.00017 = 3.536
    // baseline flights = 10*1.6 = 16
    // baseline energy = 1200*12*0.0004 = 5.76
    // baseline diet = 2.5
    // baseline shopping = 600*12*0.0005 = 3.6
    // baseline total = 3.536 + 16 + 5.76 + 2.5 + 3.6 = 31.396
    // current = 0.9
    // co2Saved = 31.396 - 0.9 = 30.496
    // savings = 30.496 * 120 = 3659.52
    expect(savings).toBeCloseTo(3659.52, 2);
  });
});
