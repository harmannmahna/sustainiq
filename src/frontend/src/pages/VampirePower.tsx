import { GlassCard } from "@/components/GlassCard";
import {
  Check,
  Gamepad2,
  Laptop,
  Microwave,
  Router,
  Smartphone,
  Tv,
} from "lucide-react";
import { useState } from "react";

const DEVICES = [
  { id: "tv", name: "Smart TV", icon: Tv, watts: 12 },
  { id: "router", name: "Wi-Fi Router", icon: Router, watts: 8 },
  { id: "charger", name: "Phone Charger", icon: Smartphone, watts: 2 },
  { id: "microwave", name: "Microwave Clock", icon: Microwave, watts: 4 },
  { id: "laptop", name: "Laptop Charger", icon: Laptop, watts: 5 },
  { id: "console", name: "Gaming Console", icon: Gamepad2, watts: 15 },
];

export default function VampirePower() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalWatts = DEVICES.reduce(
    (sum, d) => sum + (checked[d.id] ? 0 : d.watts),
    0,
  );
  const annualKWh = (totalWatts * 24 * 365) / 1000;
  const annualCost = annualKWh * 0.15;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Vampire Power Finder
        </h1>
        <p className="text-sm text-muted-foreground">
          Tap devices to mark them as turned off and see your savings
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {DEVICES.map((device) => {
          const isChecked = checked[device.id];
          return (
            <button
              key={device.id}
              type="button"
              onClick={() => toggle(device.id)}
              className={`glass relative flex flex-col items-center gap-2 rounded-2xl p-5 transition-smooth ${
                isChecked
                  ? "border-primary/60 bg-primary/5"
                  : "border-border/40 hover:shadow-glass"
              }`}
              data-ocid={`vampire.${device.id}.toggle`}
            >
              <device.icon
                className={`h-8 w-8 ${isChecked ? "text-primary" : "text-muted-foreground"}`}
              />
              <span className="text-sm font-medium text-foreground">
                {device.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {device.watts}W standby
              </span>
              {isChecked && (
                <div className="absolute right-2 top-2 rounded-full bg-primary p-1">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <GlassCard className="flex flex-col items-center gap-2 py-6">
        <span className="text-sm text-muted-foreground">
          Remaining Standby Cost
        </span>
        <span className="font-display text-4xl font-bold text-gradient">
          ${annualCost.toFixed(1)}
        </span>
        <span className="text-xs text-muted-foreground">per year</span>
        <span className="text-xs text-muted-foreground">
          {annualKWh.toFixed(1)} kWh still draining
        </span>
      </GlassCard>
    </div>
  );
}
