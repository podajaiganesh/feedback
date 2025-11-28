import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  // This tells Vite to build assets for the root of a domain ('/'),
  // which is correct for our Docker setup.
  base: '/', 
  plugins: [react()],
})