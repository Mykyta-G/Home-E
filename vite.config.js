import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: false,
  },
  publicDir: 'assets', // Serve assets from the assets directory
  server: {
    port: 5173,
  },
});
