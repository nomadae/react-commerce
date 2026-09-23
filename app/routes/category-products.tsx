import type { Route } from "./+types/category-products";
import { CategoryProductsPage } from "~/components/CategoryProductsPage";
import { getCategoryBySlug, getProductsByCategorySlug } from "~/data/catalog";
import { useIsNavigating } from "~/utils/useIsNavigating";

export function meta({ data }: Route.MetaArgs) {
  const name = data?.category?.name;
  if (!name) {
    return [{ title: "Categoría no encontrada - TechStore" }];
  }
  return [
    { title: `${name} - TechStore` },
    { name: "description", content: `Productos en la categoría ${name} en TechStore` },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const category = getCategoryBySlug(params.categorySlug);

  // Returns `null` rather than throwing a 404 Response on purpose - see the
  // comment in routes/product-detail.tsx: a thrown response replaces the whole
  // route tree, which removes the storefront chrome from the error page.
  //
  // A slug with no matching category is still treated as "not found" rather
  // than as an empty category, which is what the previous client-side version
  // did: it fell through to rendering the raw slug as a heading followed by a
  // "no products yet" empty state, so a mistyped URL looked like a real but
  // empty category.
  if (!category) {
    return { category: null, products: [] };
  }

  return {
    category,
    products: getProductsByCategorySlug(category.slug),
  };
}

export function shouldRevalidate() {
  return false;
}

export default function CategoryProductsRoute({ loaderData }: Route.ComponentProps) {
  return (
    <CategoryProductsPage
      category={loaderData.category}
      products={loaderData.products}
      isPending={useIsNavigating()}
    />
  );
}
