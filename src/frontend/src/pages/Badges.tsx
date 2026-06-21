import { GlassCard } from "@/components/GlassCard";
import { useSustainIQStore } from "@/store/useSustainIQStore";
import {
  Award,
  Bike,
  Check,
  Droplets,
  Leaf,
  Share2,
  TreePine,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

const BADGES = [
  { id: "rookie", name: "Carbon Neutral Rookie", icon: Leaf, minScore: 0 },
  { id: "guardian", name: "Climate Guardian", icon: TreePine, minScore: 40 },
  { id: "warrior", name: "Eco Warrior", icon: Zap, minScore: 60 },
  { id: "champion", name: "Green Champion", icon: Bike, minScore: 80 },
  { id: "legend", name: "Planet Legend", icon: Droplets, minScore: 95 },
];

export default function Badges() {
  const { ecoScore, offsets, challenges, computeFootprint } =
    useSustainIQStore();
  const footprint = useMemo(() => computeFootprint(), [computeFootprint]);
  const [copied, setCopied] = useState(false);

  const earned = BADGES.filter((b) => ecoScore >= b.minScore);
  const current = earned[earned.length - 1] || BADGES[0];

  const totalTrees = offsets.reduce(
    (sum, o) => (o.type === "tree" ? sum + o.quantity : sum),
    0,
  );
  const activeChallenges = challenges.filter((c) => c.joined).length;

  const shareText = `I just reduced my footprint by ${Math.max(0, 100 - Math.round(footprint * 5))}% and planted ${totalTrees} trees on SustainIQ! 🌍 #SustainIQ`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Eco-Score & Badges
        </h1>
        <p className="text-sm text-muted-foreground">
          Earn badges and share your impact
        </p>
      </div>

      <GlassCard className="flex flex-col items-center gap-3 py-10">
        <current.icon className="h-16 w-16 text-primary animate-float" />
        <h2 className="font-display text-2xl font-bold text-foreground">
          {current.name}
        </h2>
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-primary">
          <Award className="h-5 w-5" />
          <span className="font-display text-xl font-bold">{ecoScore}</span>
          <span className="text-xs">Eco-Score</span>
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>{totalTrees} trees</span>
          <span>{activeChallenges} challenges</span>
          <span>{footprint.toFixed(1)}t CO₂</span>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {BADGES.map((badge) => {
          const unlocked = ecoScore >= badge.minScore;
          return (
            <GlassCard
              key={badge.id}
              className={`flex flex-col items-center gap-2 py-5 ${
                unlocked ? "" : "opacity-40"
              }`}
            >
              <badge.icon
                className={`h-10 w-10 ${unlocked ? "text-primary" : "text-muted-foreground"}`}
              />
              <span className="text-center text-sm font-medium text-foreground">
                {badge.name}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {badge.minScore}+ score
              </span>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard>
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
          Share Kit
        </h3>
        <p className="mb-3 text-sm text-muted-foreground">
          One-click copy for LinkedIn / X
        </p>
        <div className="rounded-lg bg-muted/50 p-3 text-sm text-foreground">
          {shareText}
        </div>
        <button
          type="button"
          onClick={copy}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-smooth hover:bg-primary/90"
          data-ocid="badges.share_button"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          {copied ? "Copied!" : "Copy Achievement"}
        </button>
      </GlassCard>
    </div>
  );
}
