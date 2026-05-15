import type { Route } from "./+types/category-products";
import { CategoryProductsPage } from "~/components/CategoryProductsPage";

export function meta({ params }: Route.MetaArgs) {
  const displayName = params.categorySlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return [
    { title: `${displayName} - TechStore` },
    { name: "description", content: `Productos en la categoría ${displayName} en TechStore` },
  ];
}

export default function CategoryProductsRoute({ params }: Route.ComponentProps) {
  return <CategoryProductsPage categorySlug={params.categorySlug} />;
}
