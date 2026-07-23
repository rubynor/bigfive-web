// ts-jest cannot be used with typescript@7: TS7 is a native binary and no
// longer exposes the JavaScript compiler API ts-jest requires (it hard-
// requires `typescript` for transpilation, so ts-jest's `compiler` option
// doesn't help either). The transform therefore type-strips with @swc/jest;
// type checking is not lost — `bun run typecheck` / `bun run build` still run
// tsc from typescript@7.
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['@swc/jest', { jsc: { target: 'esnext' } }],
  },
  // transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
