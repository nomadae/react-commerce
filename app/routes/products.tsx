import type { Route } from "./+types/products";
import { ProductsPage } from "~/components/ProductsPage";
import { getProducts } from "~/data/catalog";
import { useIsNavigating } from "~/utils/useIsNavigating";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Productos - TechStore" },
    { name: "description", content: "Explora todos nuestros productos en TechStore" },
  ];
}

export function loader(_args: Route.LoaderArgs) {
  return { products: getProducts() };
}

// The catalog is static demo data with no mutations anywhere in the app, so
// re-running this loader on every navigation would re-read the same array and
// buy nothing - it would only cost an extra round trip through the router.
export function shouldRevalidate() {
  return false;
}

export default function ProductsRoute({ loaderData }: Route.ComponentProps) {
  return <ProductsPage products={loaderData.products} isPending={useIsNavigating()} />;
}
