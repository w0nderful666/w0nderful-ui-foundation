import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/w0nderful-ui-foundation/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
