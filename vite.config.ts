import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * GitHub Pages デプロイ時は `BASE_PATH=/relay-design-system/` を渡して
 * repo 名付きの base URL にする。ローカル dev と Vercel は `/` のまま。
 */
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  server: { port: 3000 },
});
