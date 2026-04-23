import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

/**
 * Vitest root config. 実際の project 分割は `vitest.workspace.ts` 側に定義。
 *
 * 実行:
 *   pnpm test              # 全部 (storybook-test + unit)
 *   pnpm test:storybook    # Storybook インタラクションのみ
 *   pnpm test:unit         # ユニットのみ
 */
export default defineConfig({
  plugins: [react()],
});
