import { Layout } from "@/components/Layout";
import Badges from "@/pages/Badges";
import Calculator from "@/pages/Calculator";
import Challenges from "@/pages/Challenges";
import Dashboard from "@/pages/Dashboard";
import GreenMap from "@/pages/GreenMap";
import Offsets from "@/pages/Offsets";
import ROISimulator from "@/pages/ROISimulator";
import ReverseCart from "@/pages/ReverseCart";
import VampirePower from "@/pages/VampirePower";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const calculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator",
  component: Calculator,
});

const roiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/roi",
  component: ROISimulator,
});

const reverseCartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reverse-cart",
  component: ReverseCart,
});

const vampirePowerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vampire-power",
  component: VampirePower,
});

const offsetsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/offsets",
  component: Offsets,
});

const challengesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/challenges",
  component: Challenges,
});

const greenMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/green-map",
  component: GreenMap,
});

const badgesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/badges",
  component: Badges,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  calculatorRoute,
  roiRoute,
  reverseCartRoute,
  vampirePowerRoute,
  offsetsRoute,
  challengesRoute,
  greenMapRoute,
  badgesRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return <RouterProvider router={router} />;
}
