import { defineWorkspace } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { fileURLToPath } from 'node:url';

/**
 * Vitest 2.x workspace — 2 プロジェクト構成。
 * - storybook-test: `*.stories.tsx` の play/test を playwright (chromium) headless で
 * - unit: 通常の `*.test.ts(x)` を jsdom で
 */
export default defineWorkspace([
  {
    plugins: [
      react(),
      storybookTest({
        configDir: fileURLToPath(new URL('./.storybook', import.meta.url)),
        storybookScript: 'pnpm storybook --ci --no-open',
      }),
    ],
    test: {
      name: 'storybook-test',
      browser: {
        enabled: true,
        provider: 'playwright',
        headless: true,
        instances: [{ browser: 'chromium' }],
      },
      setupFiles: ['./.storybook/vitest.setup.ts'],
    },
  },
  {
    plugins: [react()],
    test: {
      name: 'unit',
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      environment: 'jsdom',
      globals: true,
    },
  },
]);
