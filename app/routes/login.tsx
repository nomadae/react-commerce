import type { Route } from "./+types/login";
import { LoginPage } from "~/components/LoginPage";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Iniciar Sesión - TechStore" },
    { name: "description", content: "Inicia sesión en tu cuenta de TechStore" },
  ];
}

export default function LoginRoute() {
  return <LoginPage />;
}
