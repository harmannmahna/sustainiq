import { GlassCard } from "@/components/GlassCard";
import { MapPin, Recycle, Search, ShoppingBasket, Zap } from "lucide-react";
import { useState } from "react";

const PLACES = [
  {
    name: "Green City Recycling",
    type: "recycling",
    icon: Recycle,
    address: "123 Eco Blvd",
  },
  {
    name: "Solar Charge Station",
    type: "ev",
    icon: Zap,
    address: "456 Volt Ave",
  },
  {
    name: "Farmers Market Central",
    type: "market",
    icon: ShoppingBasket,
    address: "789 Harvest Ln",
  },
  {
    name: "Community Compost Hub",
    type: "recycling",
    icon: Recycle,
    address: "321 Mulch Rd",
  },
  { name: "EV Fast Charge", type: "ev", icon: Zap, address: "654 Amp St" },
  {
    name: "Organic Co-op",
    type: "market",
    icon: ShoppingBasket,
    address: "987 Seed Dr",
  },
];

export default function GreenMap() {
  const [zip, setZip] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Green Infrastructure Map
        </h1>
        <p className="text-sm text-muted-foreground">
          Find recycling, EV charging, and farmers markets near you
        </p>
      </div>

      <GlassCard>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter zip code..."
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            data-ocid="green_map.zip_input"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth hover:bg-primary/90"
            data-ocid="green_map.search_button"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </GlassCard>

      {searched && (
        <div className="grid gap-3 md:grid-cols-2">
          {PLACES.map((place) => (
            <GlassCard
              key={place.name}
              className="flex items-center gap-3"
              hover
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <place.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{place.name}</h3>
                <p className="text-xs text-muted-foreground">{place.address}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {!searched && (
        <GlassCard className="text-center text-muted-foreground py-12">
          Enter a zip code to discover green spots nearby
        </GlassCard>
      )}
    </div>
  );
}
