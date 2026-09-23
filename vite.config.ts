import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

export default {
  root: resolve(__dirname, 'app'),
  envDir: resolve(__dirname),
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    outDir: '../dist'
  },
  server: {
    port: 5173
  },
}