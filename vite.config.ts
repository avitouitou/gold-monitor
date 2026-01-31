import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/gold-monitor/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
}));
