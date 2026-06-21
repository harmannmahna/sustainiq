import { GlassCard } from "@/components/GlassCard";
import { useSustainIQStore } from "@/store/useSustainIQStore";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ROISimulator() {
  const { computeFootprint, computeSavings } = useSustainIQStore();
  const footprint = useMemo(() => computeFootprint(), [computeFootprint]);
  const savings = useMemo(() => computeSavings(), [computeSavings]);

  const scenarios = useMemo(
    () => [
      { name: "Current", co2: footprint, money: 0 },
      { name: "Reduce Meat", co2: footprint * 0.85, money: savings * 0.3 },
      { name: "LED + Unplug", co2: footprint * 0.75, money: savings * 0.5 },
      { name: "Bike Commute", co2: footprint * 0.6, money: savings * 0.7 },
      { name: "All In", co2: footprint * 0.4, money: savings },
    ],
    [footprint, savings],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Eco-Financial ROI
        </h1>
        <p className="text-sm text-muted-foreground">
          See CO₂ reduction alongside money saved
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="flex flex-col items-center gap-1" hover>
          <span className="text-sm text-muted-foreground">CO₂ Reduced</span>
          <span className="font-display text-3xl font-bold text-primary">
            {(footprint - scenarios[4].co2).toFixed(1)}t
          </span>
        </GlassCard>
        <GlassCard className="flex flex-col items-center gap-1" hover>
          <span className="text-sm text-muted-foreground">Money Saved</span>
          <span className="font-display text-3xl font-bold text-accent">
            ${Math.round(savings)}
          </span>
        </GlassCard>
      </div>

      <GlassCard>
        <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
          Scenario Comparison
        </h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scenarios}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(var(--card))",
                  border: "1px solid oklch(var(--border))",
                  borderRadius: "0.75rem",
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="co2"
                name="CO₂ (t)"
                fill="oklch(var(--chart-1))"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="money"
                name="Savings ($)"
                fill="oklch(var(--chart-2))"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
