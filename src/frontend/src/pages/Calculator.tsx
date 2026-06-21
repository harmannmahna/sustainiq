import { GlassCard } from "@/components/GlassCard";
import { useSustainIQStore } from "@/store/useSustainIQStore";
import { Apple, Car, Home, Plane, ShoppingBag } from "lucide-react";
import { useMemo } from "react";

const dietOptions = [
  { value: "meat", label: "Meat Heavy" },
  { value: "mixed", label: "Mixed" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
];

export default function Calculator() {
  const { calculator, setCalculator, computeFootprint } = useSustainIQStore();
  const footprint = useMemo(() => computeFootprint(), [computeFootprint]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Carbon Impact Estimator
        </h1>
        <p className="text-sm text-muted-foreground">
          Adjust sliders to estimate your annual footprint
        </p>
      </div>

      <GlassCard className="flex flex-col items-center gap-2 py-8">
        <span className="text-sm text-muted-foreground">
          Estimated Annual Footprint
        </span>
        <span className="font-display text-5xl font-bold text-gradient">
          {footprint.toFixed(2)}
        </span>
        <span className="text-sm text-muted-foreground">
          metric tons CO₂ / year
        </span>
      </GlassCard>

      <div className="space-y-4">
        <SliderField
          icon={<Car className="h-5 w-5 text-primary" />}
          label="Weekly Driving (km)"
          value={calculator.transport}
          min={0}
          max={1000}
          step={10}
          onChange={(v) => setCalculator({ transport: v })}
          dataOcid="calculator.transport.slider"
        />
        <SliderField
          icon={<Plane className="h-5 w-5 text-primary" />}
          label="Flights per Year"
          value={calculator.flights}
          min={0}
          max={50}
          step={1}
          onChange={(v) => setCalculator({ flights: v })}
          dataOcid="calculator.flights.slider"
        />
        <SliderField
          icon={<Home className="h-5 w-5 text-primary" />}
          label="Monthly Energy (kWh)"
          value={calculator.energy}
          min={0}
          max={3000}
          step={50}
          onChange={(v) => setCalculator({ energy: v })}
          dataOcid="calculator.energy.slider"
        />
        <SliderField
          icon={<ShoppingBag className="h-5 w-5 text-primary" />}
          label="Monthly Shopping ($)"
          value={calculator.shopping}
          min={0}
          max={2000}
          step={50}
          onChange={(v) => setCalculator({ shopping: v })}
          dataOcid="calculator.shopping.slider"
        />

        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <Apple className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">Diet</span>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {dietOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  setCalculator({ diet: opt.value as typeof calculator.diet })
                }
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-smooth ${
                  calculator.diet === opt.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`calculator.diet.${opt.value}.button`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function SliderField({
  icon,
  label,
  value,
  min,
  max,
  step,
  onChange,
  dataOcid,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  dataOcid: string;
}) {
  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-foreground">{label}</span>
        </div>
        <span className="font-display text-sm font-bold text-primary">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
        data-ocid={dataOcid}
      />
    </GlassCard>
  );
}
