import { defineConfig } from 'vitest/config';

// Unit tests only. Integration tests (*.integration.test.ts) need a live
// Postgres and run via `bun run test:integration` (vitest.integration.config.ts).
export default defineConfig({
  test: {
    globals: true,
    include: ['test/**/*.test.ts'],
    exclude: ['test/**/*.integration.test.ts', '**/node_modules/**']
  }
});
