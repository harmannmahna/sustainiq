import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  Bike,
  Calculator,
  Leaf,
  MapPin,
  Plug,
  ShoppingCart,
  Trophy,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/calculator", label: "Calculator", icon: Calculator },
  { to: "/roi", label: "ROI", icon: Leaf },
  { to: "/reverse-cart", label: "Reverse Cart", icon: ShoppingCart },
  { to: "/vampire-power", label: "Vampire Power", icon: Plug },
  { to: "/offsets", label: "Offsets", icon: Leaf },
  { to: "/challenges", label: "Challenges", icon: Trophy },
  { to: "/green-map", label: "Green Map", icon: MapPin },
  { to: "/badges", label: "Badges", icon: Bike },
];

export function Navigation() {
  const isMobile = useIsMobile();
  const location = useLocation();

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/40">
        <div className="flex items-center justify-around overflow-x-auto px-2 py-2">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-[10px] font-medium transition-smooth",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
                data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
              >
                <item.icon className="h-5 w-5" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-border/40 bg-card/80 backdrop-blur-md md:flex">
      <div className="flex items-center gap-2 px-6 py-5">
        <Leaf className="h-7 w-7 text-primary" />
        <span className="font-display text-xl font-bold text-foreground">
          SustainIQ
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 px-3 py-2">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
              data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="px-6 py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href="https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=sustainiq"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          caffeine.ai
        </a>
      </div>
    </aside>
  );
}
