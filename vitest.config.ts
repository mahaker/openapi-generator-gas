import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
    },
  },
})

