import { GlassCard } from "@/components/GlassCard";
import { ArrowRight, Leaf, ShoppingCart } from "lucide-react";
import { useState } from "react";

const ITEMS: Record<
  string,
  { footprint: number; alt: string; altFootprint: number; cost: number }
> = {
  iphone: {
    footprint: 85,
    alt: "Refurbished iPhone",
    altFootprint: 20,
    cost: 699,
  },
  jeans: {
    footprint: 33,
    alt: "Organic Hemp Jeans",
    altFootprint: 8,
    cost: 89,
  },
  laptop: {
    footprint: 200,
    alt: "Certified Refurbished Laptop",
    altFootprint: 50,
    cost: 499,
  },
  sneakers: {
    footprint: 14,
    alt: "Recycled Material Sneakers",
    altFootprint: 4,
    cost: 120,
  },
  tv: { footprint: 400, alt: "Energy Star TV", altFootprint: 200, cost: 599 },
  coffee: {
    footprint: 3,
    alt: "Fair Trade Local Roast",
    altFootprint: 1,
    cost: 12,
  },
};

export default function ReverseCart() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<(typeof ITEMS)[string] | null>(null);
  const [matched, setMatched] = useState<string | null>(null);

  const handleSearch = () => {
    const q = query.toLowerCase().trim();
    const key = Object.keys(ITEMS).find((k) => q.includes(k));
    if (key) {
      setResult(ITEMS[key]);
      setMatched(key);
    } else {
      setResult(null);
      setMatched(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Reverse-Cart Simulator
        </h1>
        <p className="text-sm text-muted-foreground">
          Paste an item to see its footprint and sustainable alternatives
        </p>
      </div>

      <GlassCard>
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="e.g. New iPhone, Fast Fashion Jeans..."
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            data-ocid="reverse_cart.input"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth hover:bg-primary/90"
            data-ocid="reverse_cart.search_button"
          >
            Analyze
          </button>
        </div>
      </GlassCard>

      {result && matched && (
        <div className="space-y-4">
          <GlassCard className="border-l-4 border-l-destructive">
            <h3 className="font-display text-lg font-semibold text-foreground capitalize">
              {matched}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-destructive">
              <span className="font-display text-2xl font-bold">
                {result.footprint} kg
              </span>
              <span className="text-sm">CO₂ to manufacture</span>
            </div>
          </GlassCard>

          <div className="flex items-center justify-center">
            <ArrowRight className="h-6 w-6 text-primary animate-pulse-soft" />
          </div>

          <GlassCard className="border-l-4 border-l-primary">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {result.alt}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-primary">
              <Leaf className="h-5 w-5" />
              <span className="font-display text-2xl font-bold">
                {result.altFootprint} kg
              </span>
              <span className="text-sm">CO₂</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Save {result.footprint - result.altFootprint} kg CO₂ and ~$
              {result.cost}
            </p>
          </GlassCard>
        </div>
      )}

      {!result && query && (
        <GlassCard className="text-center text-muted-foreground">
          No preset match found. Try: iPhone, jeans, laptop, sneakers, TV,
          coffee
        </GlassCard>
      )}
    </div>
  );
}
