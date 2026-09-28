import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Brasilia3D/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 4173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  test: {
    environment: 'jsdom',
    include: ['tests/unidade/**/*.test.{js,jsx}'],
    coverage: {
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/dados/**'],
    },
  },
});
