import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import fs from 'fs';

// DEBUG: log backend URL at build time
console.log("VITE_BACKEND_URL =", process.env.VITE_BACKEND_URL);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  // ✅ Hook to copy _redirects manually after build
  buildEnd() {
    const source = resolve(__dirname, 'public/_redirects');
    const destination = resolve(__dirname, 'dist/_redirects');
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, destination);
      console.log("✅ Copied _redirects to dist/");
    } else {
      console.warn("⚠️ _redirects file not found in public/");
    }
  }
});
