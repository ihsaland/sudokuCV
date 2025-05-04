import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sudokuCV/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    open: true
  }
})
