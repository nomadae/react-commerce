import type { Route } from "./+types/product-detail";
import { ProductDetail } from "~/components/ProductDetail";
import { getProductById } from "~/data/catalog";

export function meta({ data }: Route.MetaArgs) {
  if (!data?.product) {
    return [{ title: "Producto no encontrado - TechStore" }];
  }
  return [
    { title: `${data.product.name} - TechStore` },
    {
      name: "description",
      content: `${data.product.name} por $${data.product.price.toFixed(2)} en TechStore`,
    },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const productId = Number(params.productId);
  const product = Number.isInteger(productId) ? getProductById(productId) : null;

  // Deliberately not `throw new Response(..., { status: 404 })`. Verifying the
  // SSR HTML showed that a thrown response from a child loader makes React
  // Router render the error boundary *in place of* the entire route tree that
  // contains it, so the layout's Navbar and Footer disappear along with the
  // page and the visitor is stranded on an unbranded error screen. Returning
  // `null` keeps the shell and lets ProductDetail render a real 404 page with
  // navigation back into the catalog.
  //
  // Trade-off: the HTTP status for a missing product is 200, not 404.
  return { product };
}

export function shouldRevalidate() {
  return false;
}

export default function ProductDetailPage({ loaderData }: Route.ComponentProps) {
  return <ProductDetail product={loaderData.product} />;
}
