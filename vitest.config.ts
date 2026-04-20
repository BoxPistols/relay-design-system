import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { fileURLToPath } from 'node:url';

/**
 * Vitest + Storybook addon-vitest 統合。
 *
 * - すべての `*.stories.tsx` の Play / Test 関数を Vitest の test として実行
 * - browser mode (playwright + chromium headless) で実 DOM に対して検証
 * - `storybook-test` プロジェクトで Storybook 側のテスト、`unit` プロジェクトで
 *   通常の .test.ts(x) を分離
 *
 * 実行:
 *   pnpm test             # 全部
 *   pnpm test -p storybook-test   # Storybook インタラクションのみ
 *   pnpm test -p unit             # ユニットのみ
 */
export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
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
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
          environment: 'jsdom',
          globals: true,
        },
      },
    ],
  },
});
