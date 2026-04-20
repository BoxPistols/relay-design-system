import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/theme/ThemeProvider';

/**
 * Storybook v10 (react-vite): preview annotations。
 *
 * ⚠️ 10.3.5 時点では `definePreview()` を通すと addon-docs の React
 * renderer (`parameters.docs.renderer`) が合流せず MDX 描画時に
 * `baseDocsParameter.renderer is not a function` で落ちる。
 * 素の `export default` + `Preview` 型アノテーションが現状もっとも安全。
 *
 * CSF Factories (`defineMeta` / `meta.story()`) の stable 化と合わせて
 * 将来 `definePreview` も利用可能になる見込み。
 */
const preview: Preview = {
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
  globalTypes: {
    colorScheme: {
      description: 'Color scheme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, ctx) => (
      <ThemeProvider mode={ctx.globals.colorScheme as 'light' | 'dark'}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
