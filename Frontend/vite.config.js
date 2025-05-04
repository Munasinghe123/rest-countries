import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  //  Properly load environment variables
  const env = loadEnv(mode, process.cwd());

  console.log("VITE_BACKEND_URL =", env.VITE_BACKEND_URL); // should now show value

  return {
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
    },
    define: {
      // Make env variables available in the app
      'import.meta.env': {
        ...env
      }
    },
    buildEnd() {
      const source = resolve(__dirname, 'public/_redirects');
      const destination = resolve(__dirname, 'dist/_redirects');
      if (fs.existsSync(source)) {
        fs.copyFileSync(source, destination);
        console.log(" Copied _redirects to dist/");
      } else {
        console.warn(" _redirects file not found in public/");
      }
    }
  };
});
