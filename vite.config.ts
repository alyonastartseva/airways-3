/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    eslint(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    port: 4000,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    passWithNoTests: true,
    exclude: [
      '^src$',
      '/^..*$/',
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,husky}.config.*',
    ],
    watch: false,
    deps: {
      fallbackCJS: true,
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      statements: 50,
    },
  },
});
