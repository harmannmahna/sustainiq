import { GlassCard } from "@/components/GlassCard";
import { useSustainIQStore } from "@/store/useSustainIQStore";
import { Check, Minus, Plus, Sun, TreePine } from "lucide-react";
import { useState } from "react";

const OFFSETS = [
  { id: "tree", name: "Plant a Tree", icon: TreePine, cost: 5, co2: 0.02 },
  { id: "solar", name: "Community Solar", icon: Sun, cost: 25, co2: 0.1 },
];

export default function Offsets() {
  const { offsets, purchaseOffset } = useSustainIQStore();
  const [quantities, setQuantities] = useState<Record<string, number>>({
    tree: 1,
    solar: 1,
  });
  const [justBought, setJustBought] = useState<string | null>(null);

  const totalTrees = offsets.reduce(
    (sum, o) => (o.type === "tree" ? sum + o.quantity : sum),
    0,
  );

  const buy = (type: string) => {
    const qty = quantities[type] || 1;
    const offset = OFFSETS.find((o) => o.id === type);
    if (!offset) return;
    purchaseOffset({
      id: `${type}-${Date.now()}`,
      type: type as "tree" | "solar",
      quantity: qty,
      date: new Date().toISOString(),
      cost: offset.cost * qty,
    });
    setJustBought(type);
    setTimeout(() => setJustBought(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Micro-Offset Market
        </h1>
        <p className="text-sm text-muted-foreground">
          Convert carbon debt into real-world action
        </p>
      </div>

      <GlassCard className="flex items-center justify-center gap-3 py-6">
        <TreePine className="h-8 w-8 text-primary" />
        <div className="text-center">
          <span className="font-display text-3xl font-bold text-foreground">
            {totalTrees}
          </span>
          <p className="text-xs text-muted-foreground">
            Trees in your virtual forest
          </p>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2">
        {OFFSETS.map((offset) => (
          <GlassCard key={offset.id} className="flex flex-col gap-4" hover>
            <div className="flex items-center gap-3">
              <offset.icon className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {offset.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  ${offset.cost} each · {offset.co2}t CO₂
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setQuantities((prev) => ({
                    ...prev,
                    [offset.id]: Math.max(1, (prev[offset.id] || 1) - 1),
                  }))
                }
                className="rounded-lg border border-border p-1 text-foreground hover:bg-muted"
                data-ocid={`offsets.${offset.id}.decrease_button`}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-display text-lg font-bold text-foreground w-6 text-center">
                {quantities[offset.id] || 1}
              </span>
              <button
                type="button"
                onClick={() =>
                  setQuantities((prev) => ({
                    ...prev,
                    [offset.id]: (prev[offset.id] || 1) + 1,
                  }))
                }
                className="rounded-lg border border-border p-1 text-foreground hover:bg-muted"
                data-ocid={`offsets.${offset.id}.increase_button`}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => buy(offset.id)}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-smooth hover:bg-primary/90"
              data-ocid={`offsets.${offset.id}.buy_button`}
            >
              {justBought === offset.id ? (
                <>
                  <Check className="h-4 w-4" /> Committed!
                </>
              ) : (
                <>Commit ${offset.cost * (quantities[offset.id] || 1)}</>
              )}
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
