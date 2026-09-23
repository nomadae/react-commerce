import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        index("routes/home.tsx"),
        route("products", "routes/products.tsx"),
        route("products/:productId", "routes/product-detail.tsx"),
        route("ofertas", "routes/ofertas.tsx"),
        route("categorias", "routes/categorias.tsx"),
        route("categorias/:categorySlug", "routes/category-products.tsx"),
        route("login", "routes/login.tsx"),
        route("auth/callback", "routes/auth/callback.tsx"),
        route("cuenta", "routes/cuenta.tsx"),
    ]),
] satisfies RouteConfig;
