import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://stunning-space-waddle-wrp4wxpqq5rc54r7-8000.app.github.dev',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})