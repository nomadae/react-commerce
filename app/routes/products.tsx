import type { Route } from "./+types/products";
import { ProductsPage } from "~/components/ProductsPage";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Productos - TechStore" },
    { name: "description", content: "Explora todos nuestros productos en TechStore" },
  ];
}

export default function ProductsRoute() {
  return <ProductsPage />;
}
