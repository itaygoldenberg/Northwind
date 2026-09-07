import { defineConfig } from 'vitest/config' // Instead "vite" to use testing
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //server: { open: true },
  test: {
    environment: "jsdom",
  }
})
