import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/unidade/**/*.test.js'],
    coverage: {
      include: ['src/**/*.js'],
      exclude: ['src/dados/**'],
    },
  },
});
