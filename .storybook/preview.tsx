import React from 'react';
import { definePreview } from 'storybook/internal/csf';
import { ThemeProvider } from '../src/theme/ThemeProvider';

/**
 * Storybook v10: `definePreview` で preview annotations を型安全に。
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
