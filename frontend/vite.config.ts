import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          framer: ['framer-motion'],
          charts: ['recharts'],
          lucide: ['lucide-react'],
          forms: ['react-hook-form'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
  }
})