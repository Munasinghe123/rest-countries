import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

console.log("VITE_BACKEND_URL =", process.env.VITE_BACKEND_URL); 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
 
})
