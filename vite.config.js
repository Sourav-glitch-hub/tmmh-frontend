import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy API calls to backend — avoids CORS issues in development
    proxy: {
      '/api': {
        target: 'https://tmmh-backend.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
