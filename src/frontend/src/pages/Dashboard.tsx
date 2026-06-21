import { GlassCard } from "@/components/GlassCard";
import { useSustainIQStore } from "@/store/useSustainIQStore";
import { DollarSign, Leaf, TreePine, TrendingDown, Zap } from "lucide-react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const {
    calculator,
    ecoScore,
    offsets,
    challenges,
    computeFootprint,
    computeSavings,
  } = useSustainIQStore();

  const footprint = useMemo(() => computeFootprint(), [computeFootprint]);
  const savings = useMemo(() => computeSavings(), [computeSavings]);

  const chartData = useMemo(
    () => [
      {
        name: "Transport",
        value: Math.round(calculator.transport * 52 * 0.00017 * 100) / 100,
      },
      {
        name: "Flights",
        value: Math.round(calculator.flights * 1.6 * 100) / 100,
      },
      {
        name: "Energy",
        value: Math.round(calculator.energy * 12 * 0.0004 * 100) / 100,
      },
      {
        name: "Diet",
        value:
          Math.round(
            ({ meat: 2.5, mixed: 1.8, vegetarian: 1.2, vegan: 0.9 }[
              calculator.diet
            ] || 1.8) * 100,
          ) / 100,
      },
      {
        name: "Shopping",
        value: Math.round(calculator.shopping * 12 * 0.0005 * 100) / 100,
      },
    ],
    [calculator],
  );

  const totalTrees = offsets.reduce(
    (sum, o) => (o.type === "tree" ? sum + o.quantity : sum),
    0,
  );
  const activeChallenges = challenges.filter((c) => c.joined).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Your sustainability at a glance
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
          <Leaf className="h-5 w-5" />
          <span className="font-display text-lg font-bold">{ecoScore}</span>
          <span className="text-xs">Eco-Score</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <GlassCard className="flex flex-col items-center gap-1" hover>
          <TrendingDown className="h-6 w-6 text-destructive" />
          <span className="font-display text-xl font-bold text-foreground">
            {footprint.toFixed(1)}t
          </span>
          <span className="text-xs text-muted-foreground">CO₂ / year</span>
        </GlassCard>
        <GlassCard className="flex flex-col items-center gap-1" hover>
          <DollarSign className="h-6 w-6 text-accent" />
          <span className="font-display text-xl font-bold text-foreground">
            ${Math.round(savings)}
          </span>
          <span className="text-xs text-muted-foreground">Est. savings</span>
        </GlassCard>
        <GlassCard className="flex flex-col items-center gap-1" hover>
          <TreePine className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            {totalTrees}
          </span>
          <span className="text-xs text-muted-foreground">Trees planted</span>
        </GlassCard>
        <GlassCard className="flex flex-col items-center gap-1" hover>
          <Zap className="h-6 w-6 text-warning" />
          <span className="font-display text-xl font-bold text-foreground">
            {activeChallenges}
          </span>
          <span className="text-xs text-muted-foreground">
            Active challenges
          </span>
        </GlassCard>
      </div>

      <GlassCard>
        <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
          Carbon Breakdown
        </h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "oklch(var(--card))",
                  border: "1px solid oklch(var(--border))",
                  borderRadius: "0.75rem",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell
                    key={entry.name}
                    fill={`oklch(var(--chart-${(i % 5) + 1}))`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
