import type { Route } from "./+types/ofertas";
import { OfertasPage } from "~/components/OfertasPage";
import { getDiscountedProducts } from "~/data/catalog";
import { useIsNavigating } from "~/utils/useIsNavigating";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Ofertas - TechStore" },
    { name: "description", content: "Descubre los productos con descuento en TechStore" },
  ];
}

export function loader(_args: Route.LoaderArgs) {
  return { products: getDiscountedProducts() };
}

export function shouldRevalidate() {
  return false;
}

export default function OfertasRoute({ loaderData }: Route.ComponentProps) {
  return <OfertasPage products={loaderData.products} isPending={useIsNavigating()} />;
}
