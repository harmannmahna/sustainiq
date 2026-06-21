import { Outlet } from "@tanstack/react-router";
import { Navigation } from "./Navigation";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8 md:pb-8">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
