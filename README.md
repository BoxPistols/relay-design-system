# Aeros Design System

**React + Vite + TypeScript × Storybook v10 × MUI v9 互換API** で構築された、
ドローン総合プラットフォーム向けデザインシステムの参照実装。

## 特徴

- ✅ **MUI v9 互換 API**: `variant` / `color` / `size` / `slots` / `slotProps` / `sx`
- ✅ **ハードコードゼロ**: すべて `tokens` → `theme` → `components` の3層を経由
- ✅ **v9 記法**: `styleOverrides.root.variants` 配列で宣言的スタイル
- ✅ **Dark/Light 即時切替**: CSS Variables + `color-mix()` パターン再現
- ✅ **50+ コンポーネント**: Button/TextField/Table/Dialog/Menubar/NumberField/Stepper/**Chat**/**Schedule**/**DateField**...
- ✅ **4つのサンプルページ**: Foundations / Dashboard / Map / Landing
- ✅ **v7/v8 → v9 完全移行ガイド**: [MIGRATION.md](./MIGRATION.md)

## セットアップ

```bash
pnpm install
pnpm dev           # アプリ
pnpm storybook     # Storybook (port 6006)
```

Node 22.19+ が必要 (Storybook v10 の ESM-only 要件)

## ディレクトリ構造

```
src/
├── tokens/              # Primitive → Semantic トークン
├── theme/               # ThemeProvider、createTheme 互換
├── utils/               # variantsMatcher (v9 variants配列セマンティクス)
├── icons/               # Inline SVG アイコン
├── components/          # 全コンポーネント (1コンポーネント1ディレクトリ)
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── index.ts
│   ├── NumberField/     # ★ v9 新規
│   ├── Menubar/         # ★ v9 新規
│   └── ...
├── pages/               # Dashboard / Map / Landing の実装
├── stories/             # *.stories.tsx (MUI公式の階層構造)
│   ├── Foundations/
│   ├── Components/
│   │   ├── Inputs/
│   │   ├── Navigation/
│   │   ├── Feedback/
│   │   └── v9/          # NumberField / Menubar / Stepper
│   └── Pages/
└── App.tsx              # 全体ビュー切替
```

## MUI への置き換え手順

このパッケージの全コンポーネントは MUI v9 と同じ API 名・props 名で設計されているため、
以下の手順で置換可能:

```diff
- import { Button, TextField, NumberField } from 'aeros-design-system';
+ import { Button, TextField } from '@mui/material';
+ import { NumberField } from '@mui/material/NumberField';
```

theme も `createTheme({ components: { MuiButton: { styleOverrides: { root: { variants: [...] } } } } })`
の形にそのまま移行できます (`src/theme/createTheme.ts` 参照)。

## v9 の新要素

| コンポーネント | 特徴 |
|---|---|
| `NumberField` | Base UI ベース、キーボード/スクロール対応、locale フォーマット |
| `Menubar` | サブメニュー正式サポート、Roving tabindex |
| `Stepper` | `<ol>/<li>` セマンティクス、ARIA 自動付与 |
| `Chat` ★ | 会話型 UI。`variant='sent'/'received'/'system'`、`status='sending'→'read'`、`ChatComposer`、`ChatTypingIndicator`、AI Copilot 向け `suggestions` prop |
| `Schedule` ★ | 月/週/日/タイムラインの4ビュー。`events` 配列に `{id,title,start,end,color?}` を渡すだけ。ARIA grid セマンティクス |
| `DateField` / `TimeField` / `DateTimeField` ★ | Base UI Pickers。セクション単位入力 + ポップオーバーカレンダー + `slotProps.popper/day` |

## マイグレーション

- [MIGRATION.md](./MIGRATION.md) — 移行全体像・決定ガイド・v9 独自 API・落とし穴 Top10
- [MIGRATION_V7_TO_V9.md](./MIGRATION_V7_TO_V9.md) — v7 以前からの網羅版 (81+ 項目)
- [MIGRATION_V8_TO_V9.md](./MIGRATION_V8_TO_V9.md) — v8 経由の最小差分版
- [../design-system-guide.md](../design-system-guide.md) — 新規構築ガイド (3軸分析・codemod・Storybook v10)

## License

MIT
