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
  // `file://` 絶対 URL で emit する。Vite の import-analysis は `file://` を
  // external と判定して解決しないため、MDX 出力を transform で書き換える。
  //
  // ⚠️ 重要: scope は **mdx-react-shim だけ**。過去に全 file:// を
  // 総当たりで書き換えていたが、`@storybook/react-vite/dist/preview.js` のような
  // package.json exports に存在しないパスまで bare 化して renderer preset を
  // 潰していた (結果: `Cannot read properties of undefined (reading 'renderToCanvas')`)。
  // mdx-react-shim だけは `./mdx-react-shim` が exports に明記されているので
  // 安全に bare 化できる。
  viteFinal: async (cfg) => {
    cfg.plugins = cfg.plugins || [];
    cfg.plugins.push({
      name: 'relay:fix-mdx-react-shim-url',
      enforce: 'post',
      transform(code, id) {
        if (!id.endsWith('.mdx') && !/\.mdx\?/.test(id)) return null;
        if (!code.includes('mdx-react-shim')) return null;
        // file://.../@storybook/addon-docs/dist/mdx-react-shim.js
        //   → @storybook/addon-docs/mdx-react-shim
        const fixed = code.replace(
          /["']file:\/\/[^"']+?\/node_modules\/(?:\.pnpm\/[^/]+\/node_modules\/)?@storybook\/addon-docs\/dist\/mdx-react-shim\.m?js["']/g,
          '"@storybook/addon-docs/mdx-react-shim"',
        );
        return fixed === code ? null : { code: fixed, map: null };
      },
    });
    return cfg;
  },
};

export default config;
