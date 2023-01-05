import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import eslint from 'vite-plugin-eslint';
import tsconfigPaths from "vite-tsconfig-paths";
import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    port: 4000,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    deps: {
      fallbackCJS: true,
    },
  },
} );
