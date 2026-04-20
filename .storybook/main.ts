import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-themes',
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  docs: { defaultName: 'Docs' },
  // Storybook v10.3 + pnpm: addon-docs の MDX ローダが mdx-react-shim を
  // `file://` 絶対 URL で emit するが、Vite の import-analysis は `file://` を
  // external と判定して解決しない。MDX 出力を transform で書き換えて
  // pnpm hash 付きの絶対パスを bare specifier (例:
  // `@storybook/addon-docs/mdx-react-shim`) に戻す。
  viteFinal: async (cfg) => {
    cfg.plugins = cfg.plugins || [];
    cfg.plugins.push({
      name: 'aeros:fix-mdx-file-url',
      enforce: 'post',
      transform(code, id) {
        if (!id.endsWith('.mdx') && !/\.mdx\?/.test(id)) return null;
        if (!code.includes('file://')) return null;
        const fixed = code.replace(
          // file://...node_modules/[.pnpm/*/node_modules/]<scope/pkg>[/dist]/<rest>[.js]
          /file:\/\/[^"']+?\/node_modules\/(?:\.pnpm\/[^/]+\/node_modules\/)?((?:@[^/]+\/)?[^/]+)\/(?:dist\/)?([^"']+?)(?:\.m?js)?(?=["'])/g,
          '$1/$2',
        );
        return fixed === code ? null : { code: fixed, map: null };
      },
    });
    return cfg;
  },
};

export default config;
