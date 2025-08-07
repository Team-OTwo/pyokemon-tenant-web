/// <reference types="vitest" />
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  base: "/tenant/",
  plugins: [react(), tsconfigPaths(), svgr(), tailwindcss()],

  server: {
    proxy: {
      "/event/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("react") || id.includes("react-dom")) {
            return "react"
          }

          if (id.includes("node_modules")) {
            return "vendor"
          }
        },
      },
    },
  },
})
