import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('firebase') || id.includes('@firebase')) {
            return 'firebase';
          }
          if (id.includes('react-dom') || id.includes('react-router')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
