import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/w0nderful-ui-foundation/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})