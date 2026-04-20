import { primitive } from './primitive';

/**
 * Semantic tokens - 役割付きトークン。UI はこちらのみを参照する。
 * ブランド差し替え時はこの semantic を書き換えるだけで全体が追従する。
 */
export type TokenSet = {
  bg: { canvas: string; surface: string; sunken: string; elevated: string };
  border: { subtle: string; default: string; strong: string };
  text: { primary: string; secondary: string; muted: string; onBrand: string; disabled: string };
  brand: { main: string; hover: string; soft: string; dark: string };
  accent: { main: string; soft: string };
  success: { main: string; soft: string; dark: string };
  warning: { main: string; soft: string; dark: string };
  danger: { main: string; soft: string; dark: string };
  info: { main: string; soft: string; dark: string };
  shadow: { sm: string; md: string; lg: string };
};

export const buildTokens = (mode: 'light' | 'dark'): TokenSet => mode === 'dark' ? {
  bg: { canvas: primitive.gray[950], surface: primitive.gray[900], sunken: '#040711', elevated: primitive.gray[800] },
  border: { subtle: '#1a2233', default: primitive.gray[800], strong: primitive.gray[700] },
  text: { primary: primitive.gray[50], secondary: primitive.gray[300], muted: primitive.gray[400], onBrand: primitive.gray[0], disabled: primitive.gray[600] },
  brand: { main: primitive.teal[400], hover: primitive.teal[300], soft: 'rgba(60,192,162,0.14)', dark: primitive.teal[600] },
  accent: { main: primitive.violet[400], soft: 'rgba(167,139,250,0.16)' },
  success: { main: primitive.teal[400], soft: 'rgba(60,192,162,0.14)', dark: primitive.teal[500] },
  warning: { main: primitive.amber[400], soft: 'rgba(251,191,36,0.14)', dark: primitive.amber[500] },
  danger: { main: primitive.rose[400], soft: 'rgba(251,113,133,0.14)', dark: primitive.rose[500] },
  info: { main: primitive.sky[400], soft: 'rgba(56,189,248,0.14)', dark: primitive.sky[500] },
  shadow: { sm: '0 1px 2px rgba(0,0,0,0.4)', md: '0 4px 12px rgba(0,0,0,0.5)', lg: '0 20px 60px rgba(0,0,0,0.5)' },
} : {
  bg: { canvas: primitive.gray[50], surface: primitive.gray[0], sunken: primitive.gray[100], elevated: primitive.gray[0] },
  border: { subtle: primitive.gray[200], default: primitive.gray[300], strong: primitive.gray[400] },
  text: { primary: primitive.gray[900], secondary: primitive.gray[600], muted: primitive.gray[500], onBrand: primitive.gray[0], disabled: primitive.gray[400] },
  brand: { main: primitive.teal[600], hover: primitive.teal[700], soft: 'rgba(17,133,110,0.08)', dark: primitive.teal[800] },
  accent: { main: primitive.violet[500], soft: 'rgba(139,92,246,0.08)' },
  success: { main: primitive.teal[500], soft: 'rgba(27,165,136,0.08)', dark: primitive.teal[700] },
  warning: { main: primitive.amber[500], soft: 'rgba(245,158,11,0.08)', dark: primitive.amber[600] },
  danger: { main: primitive.rose[500], soft: 'rgba(244,63,94,0.08)', dark: primitive.rose[600] },
  info: { main: primitive.sky[500], soft: 'rgba(14,165,233,0.08)', dark: primitive.sky[600] },
  shadow: { sm: '0 1px 2px rgba(0,0,0,0.05)', md: '0 4px 12px rgba(0,0,0,0.08)', lg: '0 20px 60px rgba(0,0,0,0.12)' },
};

export const fonts = {
  sans: '"Inter","Hiragino Sans","Noto Sans JP",system-ui,sans-serif',
  display: '"Instrument Serif","Hiragino Mincho ProN",serif',
  mono: '"JetBrains Mono",ui-monospace,monospace',
};
