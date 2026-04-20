import { TokenSet, fonts } from '../tokens';

/**
 * createTheme - MUI v9 互換のテーマ定義スケルトン。
 *
 * このパッケージ内の ThemeProvider は直接 tokens を注入するが、
 * 本番 MUI v9 に移行する際の参照として、ここに theme 定義例を残す。
 * そのまま MUI の `createTheme({...})` にコピペ可能な構造。
 */
export const createThemeConfig = (tokens: TokenSet) => ({
  palette: {
    primary: { main: tokens.brand.main, contrastText: tokens.text.onBrand },
    secondary: { main: tokens.accent.main, contrastText: tokens.text.onBrand },
    success: { main: tokens.success.main },
    warning: { main: tokens.warning.main },
    error:   { main: tokens.danger.main },
    info:    { main: tokens.info.main },
    background: { default: tokens.bg.canvas, paper: tokens.bg.surface },
    text: { primary: tokens.text.primary, secondary: tokens.text.secondary },
    divider: tokens.border.subtle,
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: fonts.sans,
    h1: { fontFamily: fonts.display, fontWeight: 400, letterSpacing: '-0.025em' },
    h2: { fontFamily: fonts.display, fontWeight: 400, letterSpacing: '-0.02em' },
    h3: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  // v9: styleOverrides.root.variants 配列
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          variants: [
            { props: { size: 'small' },  style: { height: 32, fontSize: '0.8125rem' } },
            { props: { size: 'medium' }, style: { height: 40, fontSize: '0.875rem' } },
            { props: { size: 'large' },  style: { height: 48, fontSize: '0.9375rem' } },
            {
              props: { variant: 'contained', color: 'primary' },
              style: {
                backgroundColor: tokens.brand.main, color: tokens.text.onBrand,
                '&:hover': { backgroundColor: tokens.brand.hover },
              },
            },
            {
              props: { variant: 'outlined' },
              style: { borderColor: tokens.border.default, color: tokens.text.primary },
            },
          ],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6, fontWeight: 500,
          variants: [
            { props: { size: 'small' },  style: { height: 22, fontSize: '0.75rem' } },
            { props: { size: 'medium' }, style: { height: 28, fontSize: '0.8125rem' } },
            { props: { variant: 'outlined' }, style: { borderColor: tokens.border.default } },
          ],
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: `1px solid ${tokens.border.subtle}`, backgroundImage: 'none' },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'transparent' },
      styleOverrides: {
        root: {
          backgroundColor: tokens.bg.surface,
          borderBottom: `1px solid ${tokens.border.subtle}`,
          backdropFilter: 'saturate(180%) blur(14px)',
        },
      },
    },
  },
});
