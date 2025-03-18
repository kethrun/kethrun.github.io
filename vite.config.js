import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../_site",
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
