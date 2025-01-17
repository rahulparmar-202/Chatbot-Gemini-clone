import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom", // for react testing
    coverage: {
      reporter: ["text", "json", "html"],
    },
    include: ["src/**/*.test.jsx"],
  },
});
