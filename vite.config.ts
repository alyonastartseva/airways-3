import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    port: 4000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    deps: {
      fallbackCJS: true,
    },
  },
});