import type { Route } from "./+types/home";
import HomePage from "../home/homepage";
import { getCategories, getProducts } from "~/data/catalog";
import { useIsNavigating } from "~/utils/useIsNavigating";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "E-commerce React app - TechStore" },
    { name: "description", content: "Web app for e-commerce purposes" },
  ];
}

export function loader(_args: Route.LoaderArgs) {
  return {
    products: getProducts(),
    categories: getCategories(),
  };
}

export function shouldRevalidate() {
  return false;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  // The loader above has already resolved by the time this renders, so a
  // spinner keyed off local state could never fire again. `navigation.state`
  // is what reports a pending *departure* from this route.
  const isPending = useIsNavigating();

  return (
    <HomePage
      products={loaderData.products}
      categories={loaderData.categories}
      isPending={isPending}
    />
  );
}
