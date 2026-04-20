import React from 'react';
import { definePreview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/theme/ThemeProvider';

/**
 * Storybook v10 (react-vite): `definePreview` で preview annotations を型安全に。
 *
 * ⚠️ 必ず `@storybook/react-vite` の `definePreview` を使うこと。
 * `storybook/internal/csf` の同名関数は renderer preset を合流しないので、
 * "Expected your framework's preset to export a `renderToCanvas` field"
 * で canvas が描けなくなる。
 *
 * CSF Factories (`defineMeta` + `meta.story()`) は v10.3 時点で公開 API として
 * 未提供 (experimental/内部)。stable 化されたらストーリーも移行する。
 * それまでは CSF3 + `satisfies Meta<typeof X>` を使う。
 */
export default definePreview({
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
    (Story: any, ctx: any) => (
      <ThemeProvider mode={ctx.globals.colorScheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
});
