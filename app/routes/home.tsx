import type { Route } from "./+types/home";
import HomePage from "../home/homepage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "E-commerce React app" },
    { name: "description", content: "Web app for e-commerce purposes" },
  ];
}

export default function Home() {
  return <HomePage />;
}
