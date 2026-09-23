import type { Route } from "./+types/ofertas";
import { OfertasPage } from "~/components/OfertasPage";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Ofertas - TechStore" },
    { name: "description", content: "Descubre los productos con descuento en TechStore" },
  ];
}

export default function OfertasRoute() {
  return <OfertasPage />;
}
