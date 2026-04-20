import React from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';

export default {
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
};
