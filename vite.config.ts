import { defineConfig } from "vite";
import { resolve } from "path";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
    chunkSizeWarningLimit: 2048,
    assetsInlineLimit: 0,
  },
  plugins: [],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "./assets/") },
      {
        find: "@objects",
        replacement: resolve(__dirname, "./assets/objects/"),
      },
      {
        find: "@gameTools",
        replacement: resolve(__dirname, "assets/gameTools/"),
      },
      {
        find: "@buble",
        replacement: resolve(__dirname, "./assets/Bubles/"),
      },
      {
        find: "@ui",
        replacement: resolve(__dirname, "./assets/UI/"),
      },
      { find: "#", replacement: resolve(__dirname, "./src/objects/") },
    ],
  },
  server: { host: "0.0.0.0", port: 8000 },
  clearScreen: false,
  base: "/",
});
