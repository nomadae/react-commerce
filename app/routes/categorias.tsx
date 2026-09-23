import type { Route } from "./+types/categorias";
import { CategoriesPage } from "~/components/CategoriesPage";
import { getCategories } from "~/data/catalog";
import { useIsNavigating } from "~/utils/useIsNavigating";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Categorías - TechStore" },
    { name: "description", content: "Explora todas las categorías de productos en TechStore" },
  ];
}

export function loader(_args: Route.LoaderArgs) {
  return { categories: getCategories() };
}

export function shouldRevalidate() {
  return false;
}

export default function CategoriasRoute({ loaderData }: Route.ComponentProps) {
  return (
    <CategoriesPage categories={loaderData.categories} isPending={useIsNavigating()} />
  );
}
