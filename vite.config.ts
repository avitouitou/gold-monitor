import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/gold-monitor/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
