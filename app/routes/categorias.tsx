import type { Route } from "./+types/categorias";
import { CategoriesPage } from "~/components/CategoriesPage";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Categorías - TechStore" },
    { name: "description", content: "Explora todas las categorías de productos en TechStore" },
  ];
}

export default function CategoriasRoute() {
  return <CategoriesPage />;
}
