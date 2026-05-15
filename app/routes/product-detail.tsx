import type { Route } from "./+types/product-detail";
import { ProductDetail } from "~/components/ProductDetail";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Producto - TechStore" },
    { name: "description", content: "Detalles del producto en TechStore" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const productId = Number(params.productId);
  if (Number.isNaN(productId)) {
    throw new Response("Producto no encontrado", { status: 404 });
  }
  return null;
}

export default function ProductDetailPage({ params }: Route.ComponentProps) {
  const productId = Number(params.productId);
  return <ProductDetail productId={productId} />;
}
