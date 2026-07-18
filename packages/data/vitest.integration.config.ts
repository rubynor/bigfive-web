import { defineConfig } from 'vitest/config';

// Integration tests against the docker-compose Postgres (DATABASE_URL).
// Run: mise run db:start && mise run db:migrate && bun run test:integration
export default defineConfig({
  test: {
    globals: true,
    include: ['test/**/*.integration.test.ts'],
    // DB writes are order-sensitive within a file; keep one worker.
    fileParallelism: false
  }
});
