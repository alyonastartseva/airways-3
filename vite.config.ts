import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
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