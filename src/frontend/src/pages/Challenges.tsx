import { GlassCard } from "@/components/GlassCard";
import { useSustainIQStore } from "@/store/useSustainIQStore";
import { Check, Flame, Plus } from "lucide-react";

export default function Challenges() {
  const { challenges, joinChallenge, checkInChallenge } = useSustainIQStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          21-Day Habit Challenges
        </h1>
        <p className="text-sm text-muted-foreground">
          Join a challenge and build your streak
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {challenges.map((c) => {
          const progress = Math.round((c.daysCompleted / c.daysTotal) * 100);
          return (
            <GlassCard key={c.id} className="flex flex-col gap-3" hover>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {c.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {c.description}
                  </p>
                  <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                    {c.category}
                  </span>
                </div>
                {!c.joined ? (
                  <button
                    type="button"
                    onClick={() => joinChallenge(c.id)}
                    className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-smooth hover:bg-primary/90"
                    data-ocid={`challenges.${c.id}.join_button`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-primary">
                    <Flame className="h-4 w-4" />
                    <span className="text-xs font-bold">{c.streak}</span>
                  </div>
                )}
              </div>

              {c.joined && (
                <>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {c.daysCompleted}/{c.daysTotal} days
                    </span>
                    <button
                      type="button"
                      onClick={() => checkInChallenge(c.id)}
                      disabled={c.daysCompleted >= c.daysTotal}
                      className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-smooth hover:bg-accent/90 disabled:opacity-40"
                      data-ocid={`challenges.${c.id}.checkin_button`}
                    >
                      <Check className="h-3 w-3" /> Check In
                    </button>
                  </div>
                </>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
