# MUI v7 → v9 完全移行ガイド

v7 以前 / GridLegacy 利用 / `styleOverrides` をクラス名で書いている
コードベース向けの**全網羅版**マイグレーションガイド。

> MUI v8 は MUI X とメジャー番号揃えのため内部スキップされた。
> v7 → v9 の直接ジャンプとなり、変更量は通常のメジャーアップグレードの 2 倍。
> v8 を挟んだ経験があるなら → [MIGRATION_V8_TO_V9.md](./MIGRATION_V8_TO_V9.md) の軽量版で足りる。

## 目次

1. [全体方針: 3 軸で理解する](#1-全体方針-3-軸で理解する)
2. [前提環境](#2-前提環境)
3. [codemod 一括適用](#3-codemod-一括適用)
4. [slots / slotProps への統一](#4-slots--slotprops-への統一)
5. [styleOverrides → variants 配列](#5-styleoverrides--variants-配列)
6. [テーマ/CSS Variables の刷新](#6-テーマcss-variables-の刷新)
7. [削除された API](#7-削除された-api)
8. [Grid / GridLegacy の完全移行](#8-grid--gridlegacy-の完全移行)
9. [A11y / Roving tabindex の導入](#9-a11y--roving-tabindex-の導入)
10. [System Props の廃止と sx 統一](#10-system-props-の廃止と-sx-統一)
11. [Icons の *Outline 削除](#11-icons-の-outline-削除)
12. [個別コンポーネント差分](#12-個別コンポーネント差分)
13. [Storybook v10 対応](#13-storybook-v10-対応)
14. [手動検証チェックリスト](#14-手動検証チェックリスト)

---

## 1. 全体方針: 3 軸で理解する

v7 → v9 の破壊的変更は**個別に覚えるより型を掴む方が早い**。
3 つの方向性に集約される:

| 軸 | 具体 |
|---|---|
| **A. slots / slotProps への完全統一** | `components` / `componentsProps` / `XxxComponent` / `XxxProps` / `Transition*` / `Paper*` / `Backdrop*` / `Popper*` / `Listbox*` など**すべて**が `slots` と `slotProps` に寄せられた。Base UI API との整合が取れた。 |
| **B. `styleOverrides` は `variants` 配列で props 条件を宣言** | `containedPrimary` / `iconSizeSmall` 等**クラス名キーは全廃**。`variants: [{ props: {...}, style: {...} }]` の配列で props 条件を明示する。 |
| **C. A11y と Roving tabindex が Tabs/Menu/Stepper/MenuList/Backdrop に自動付与** | `role` / `aria-*` の自動付与。独自 a11y が二重付与にならないか検証。 |

> この 3 軸を意識しておけば、移行ガイドの 80 項目を超える個別変更は
> 「同じ型の繰り返し」として自然に読める。

## 2. 前提環境

- **Node 22.19+** (Storybook v10 が ESM-only のため必須)
- **TypeScript 5.5+**
- **React 18.2+** (React 19 も動作するが、Suspense 境界が増える箇所あり)
- **ブラウザターゲット**: Chrome 117+ / Edge 121+ / Firefox 121+ / Safari 17+
- 可能なら: Vite 5+ / Emotion 11+ / `@fontsource-variable/roboto-flex`

```bash
pnpm up -L @mui/material @mui/icons-material @mui/system \
  @emotion/react @emotion/styled
pnpm up -L storybook
```

## 3. codemod 一括適用

**手作業で全件直すのは現実的ではない**。まずは preset-safe で 8 割片付ける:

```bash
# 全 deprecation を一括適用
npx @mui/codemod@latest v9.0.0/preset-safe ./src

# 個別適用 (preset-safe 対象外)
npx @mui/codemod@latest v9.0.0/system-props ./src
```

使用できる codemod (抜粋。完全リストは [../design-system-guide.md 付録 B](../design-system-guide.md#付録-b-利用可能な-codemod-一覧主要)):

```
deprecations/accordion-props         deprecations/button-classes
deprecations/alert-props             deprecations/chip-classes
deprecations/autocomplete-props      deprecations/dialog-props
deprecations/avatar-props            deprecations/drawer-props
deprecations/text-field-props        deprecations/tooltip-props
deprecations/snackbar-props          deprecations/typography-props
deprecations/menu-props              v9.0.0/system-props
deprecations/list-item-props         v9.0.0/preset-safe
```

`--dry-run` で差分プレビュー可能:

```bash
npx @mui/codemod@latest v9.0.0/preset-safe ./src --dry-run | less
```

## 4. slots / slotProps への統一

### 4.1 変換表 (主要)

| 旧 API | v9 |
|---|---|
| `components={{ Root: X }}` | `slots={{ root: X }}` |
| `componentsProps={{ root: {...} }}` | `slotProps={{ root: {...} }}` |
| `TransitionComponent` / `TransitionProps` | `slots.transition` / `slotProps.transition` |
| `PaperProps` (Dialog/Drawer/Menu/Popover) | `slotProps.paper` |
| `BackdropComponent` / `BackdropProps` | `slots.backdrop` / `slotProps.backdrop` |
| `MenuListProps` (Menu) | `slotProps.list` |
| `PopperComponent` / `PopperProps` | `slots.popper` / `slotProps.popper` |
| `ListboxComponent` / `ListboxProps` | `slots.listbox` / `slotProps.listbox` |
| `ChipProps` (Autocomplete) | `slotProps.chip` |
| `renderTags` (Autocomplete) | `renderValue` |
| `InputProps` (TextField) | `slotProps.input` |
| `inputProps` (TextField) | `slotProps.htmlInput` |
| `InputLabelProps` / `FormHelperTextProps` | `slotProps.inputLabel` / `slotProps.formHelperText` |
| `SelectProps` (TextField) | `slotProps.select` |
| `titleTypographyProps` / `subheaderTypographyProps` | `slotProps.title` / `slotProps.subheader` |
| `primaryTypographyProps` / `secondaryTypographyProps` | `slotProps.primary` / `slotProps.secondary` |
| `StepIconComponent` / `StepIconProps` | `slots.stepIcon` / `slotProps.stepIcon` |
| `IconContainerComponent` (Rating) | `slotProps.icon.component` |
| `imgProps` (Avatar) | `slotProps.img` |
| `ScrollButtonComponent` / `TabScrollButtonProps` (Tabs) | `slots.scrollButtons` / `slotProps.scrollButtons` |
| `TabIndicatorProps` (Tabs) | `slotProps.indicator` |
| `slots.StartScrollButtonIcon` (Tabs) | `slots.startScrollButtonIcon` (小文字始まり) |
| `backIconButtonProps` / `nextIconButtonProps` (TablePagination) | `slotProps.actions.previousButton` / `slotProps.actions.nextButton` |
| `FabProps` (SpeedDialAction) | `slotProps.fab` |
| `ClickAwayListenerProps` / `ContentProps` (Snackbar) | `slotProps.clickAwayListener` / `slotProps.content` |
| `LinearProgressProps` (MobileStepper) | `slotProps.progress` |
| `inputProps` / `inputRef` (Checkbox/Radio/Switch) | `slotProps.input` / `slotProps.input.ref` |

### 4.2 TextField

```tsx
// ❌ v7
<TextField
  InputProps={{ startAdornment: <Search/> }}
  inputProps={{ maxLength: 100 }}
  InputLabelProps={{ shrink: true }}
  FormHelperTextProps={{ sx: { fontStyle: 'italic' } }}
  SelectProps={{ native: true }}
/>

// ✅ v9
<TextField
  slotProps={{
    input:          { startAdornment: <Search/> },
    htmlInput:      { maxLength: 100 },
    inputLabel:     { shrink: true },
    formHelperText: { sx: { fontStyle: 'italic' } },
    select:         { native: true },
  }}
/>
```

### 4.3 Autocomplete

```tsx
// ❌ v7
<Autocomplete
  multiple
  renderTags={(value, getTagProps) =>
    value.map((option, index) =>
      <Chip label={option.label} {...getTagProps({ index })} />)}
  ListboxProps={{ style: { maxHeight: 200 } }}
  PopperComponent={CustomPopper}
  ChipProps={{ size: 'small' }}
/>

// ✅ v9
<Autocomplete
  multiple
  renderValue={(value, getItemProps) =>
    value.map((option, index) =>
      <Chip label={option.label} {...getItemProps({ index })} />)}
  slots={{ popper: CustomPopper }}
  slotProps={{
    listbox: { style: { maxHeight: 200 } },
    chip:    { size: 'small' },
  }}
/>
```

`useAutocomplete` フックも変更:
- `getTagProps` → `getItemProps`
- `focusedTag` → `focusedItem`

### 4.4 Dialog / Drawer / Menu / Popover (共通パターン)

```tsx
// ❌ v7
<Dialog
  TransitionComponent={Slide}
  TransitionProps={{ timeout: 500 }}
  PaperProps={{ elevation: 3 }}
  BackdropComponent={CustomBackdrop}
  BackdropProps={{ invisible: true }}
/>

// ✅ v9
<Dialog
  slots={{
    transition: Slide,
    backdrop:   CustomBackdrop,
  }}
  slotProps={{
    transition: { timeout: 500 },
    paper:      { elevation: 3 },
    backdrop:   { invisible: true },
  }}
/>
```

## 5. styleOverrides → variants 配列

v7 は「クラス名キー」でオーバーライド:

```ts
// ❌ v7
MuiButton: {
  styleOverrides: {
    root:              { textTransform: 'none' },
    containedPrimary:  { backgroundColor: '#1976d2' },
    outlinedPrimary:   { borderColor: '#1976d2' },
    iconSizeSmall:     { fontSize: 18 },
    sizeSmall:         { padding: '4px 10px' },
  }
}
```

v9 は `variants` 配列で **props 条件**:

```ts
// ✅ v9
MuiButton: {
  styleOverrides: {
    root: {
      textTransform: 'none',
      variants: [
        { props: { variant: 'contained', color: 'primary' },
          style: { backgroundColor: '#1976d2' } },
        { props: { variant: 'outlined', color: 'primary' },
          style: { borderColor: '#1976d2' } },
        { props: { size: 'small' },
          style: { padding: '4px 10px',
                   '& .MuiButton-icon': { fontSize: 18 } } },
      ],
    },
  },
}
```

### Chip のような「スロット毎」オーバーライド
`Chip.label` のように別スロットのスタイルは、**そのスロット側の variants に置く**:

```ts
// ❌ v7
MuiChip: {
  styleOverrides: {
    root:        { borderRadius: 6 },
    labelSmall:  { padding: '0 6px' },
    iconSmall:   { fontSize: 14 },
  }
}

// ✅ v9
MuiChip: {
  styleOverrides: {
    root: {
      borderRadius: 6,
      variants: [
        { props: { size: 'small' },
          style: { '& .MuiChip-icon': { fontSize: 14 } } },
      ],
    },
    label: {
      variants: [
        { props: { size: 'small' }, style: { padding: '0 6px' } },
      ],
    },
  }
}
```

削除されたクラス名の完全リストは [../design-system-guide.md 付録 A](../design-system-guide.md#付録-a-v9-で削除された-styleoverrides-クラス名-完全リスト)。

## 6. テーマ/CSS Variables の刷新

v9 では CSS Variables が**標準推奨**。派生色は `color-mix()` で生成される。
HTML の data 属性でテーマ切替、SSR フラッシュなし。

```ts
// ✅ v9 推奨
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-color-scheme',
    cssVarPrefix: 'ds',
  },
  colorSchemes: {
    light: { palette: lightPalette },
    dark:  { palette: darkPalette },
  },
});
```

使用:
```html
<html data-color-scheme="dark">
```

生成 CSS:
```css
:root {
  --ds-palette-primary-main: #1976d2;
  --ds-palette-primary-hover: color-mix(in srgb, var(--ds-palette-primary-main) 92%, #fff);
}
```

派生色はテーマ層で完結させる: 個別コンポーネントの `sx` / `styled()` で
`alpha()` や `lighten()` を使っている箇所は CSS 変数参照に置き換え可能。

## 7. 削除された API

| 旧 | v9 での書き方 |
|---|---|
| `<Dialog disableEscapeKeyDown>` | `onClose={(_, reason) => reason !== 'escapeKeyDown' && close()}` |
| `<Typography paragraph>` | `sx={{ marginBottom: '16px' }}` |
| `.MuiTypography-paragraph` | `.MuiTypography-root:where(p)` |
| `<Divider light>` | `sx={{ opacity: 0.6 }}` |
| `import Grid from '@mui/material/GridLegacy'` | `import Grid from '@mui/material/Grid'` |
| `<Grid item xs={12}>` | `<Grid size={{ xs: 12 }}>` |
| `MuiTouchRipple` のテーマ型 | `MuiButtonBase.styleOverrides.root` に `'& .MuiTouchRipple-root': {...}` |
| `backIconButtonProps` | `slotProps.actions.previousButton` |
| `nextIconButtonProps` | `slotProps.actions.nextButton` |

## 8. Grid / GridLegacy の完全移行

```tsx
// ❌ v7 GridLegacy (互換)
import Grid from '@mui/material/GridLegacy';
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>...</Grid>
  <Grid item xs={12} sm={6}>...</Grid>
</Grid>

// ✅ v9 Grid v2
import Grid from '@mui/material/Grid';
<Grid container spacing={2}>
  <Grid size={{ xs: 12, sm: 6 }}>...</Grid>
  <Grid size={{ xs: 12, sm: 6 }}>...</Grid>
</Grid>
```

ポイント:
- `item` prop は不要 (container 直下は全部 item)
- `xs` / `sm` / `md` 個別 prop → **`size={{ xs, sm, md }}` オブジェクト**
- `zeroMinWidth`, `direction="column"` の挙動は同じ

## 9. A11y / Roving tabindex の導入

### Tabs
```diff
- <Tab>の位置は問わない
+ <Tab>は <Tabs>の子孫以外に置くとエラー
```
矢印キー移動で `tabindex="0"` が動的に遷移 (独自実装は削除)。

### Menu / MenuList
```diff
- <MenuItem>単独で使用可能
+ <MenuItem>は <Menu>/<MenuList>の外で使うとエラー
```
- `variant="selectedMenu"` でもキーボード操作で tabindex が動的に切替
- `MenuList` の `autoFocus` は List 本体に `tabindex="0"` を付けない (常に -1)
- `React.Fragment` でラップした `MenuItem` もキーボード操作対象
- `ListSubheader` / `Divider` への `muiSkipListHighlight` 不要
- 独自 `role="menuitem"` のアイテムは非サポート

### Stepper
- `<Stepper>` が `<ol>` に
- `<Step>` が `<li>` に
- `<StepButton>` があれば Roving tabindex 対応
- `role="tablist"` / `role="tab"` / `aria-selected` / `aria-posinset` / `aria-setsize` 自動付与

### Backdrop
- デフォルトの `aria-hidden="true"` が削除
- モーダル外のコンテンツを本当に隠したい場合は `inert` 属性を検討

## 10. System Props の廃止と sx 統一

`mt` / `color` / `bgcolor` / `p` などのショートハンド prop は廃止。`sx` prop に統一:

```tsx
// ❌ v7
<Box mt={2} color="primary.main" bgcolor="background.paper" p={2}/>
<Stack direction="row" spacing={2} mt={1}/>
<Typography mb={2} color="text.secondary"/>

// ✅ v9
<Box sx={{ mt: 2, color: 'primary.main', bgcolor: 'background.paper', p: 2 }}/>
<Stack direction="row" spacing={2} sx={{ mt: 1 }}/>
<Typography sx={{ mb: 2 }} color="text.secondary"/>
```

**影響コンポーネント**: `Box`, `DialogContentText`, `Grid`, `Link`, `Stack`,
`Typography`, `TimelineContent`, `TimelineOppositeContent`。

codemod: `npx @mui/codemod@latest v9.0.0/system-props ./src`

## 11. Icons の *Outline 削除

`*Outline` (末尾) は `*Outlined` と同一 SVG だったため 23 件削除。

```diff
- import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
+ import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
```

削除リスト (23件):
```
AddCircleOutline        ChatBubbleOutline       CheckCircleOutline
DeleteOutline           DoneOutline             DriveFileMoveOutline
ErrorOutline            HelpOutline             InfoOutline
LabelImportantOutline   LightbulbOutline        LockOutline
MailOutline             ModeEditOutline         PauseCircleOutline
PeopleOutline           PersonOutline           PieChartOutline
PlayCircleOutline       RemoveCircleOutline     StarOutline
WorkOutline             WorkspacesOutline
```

`InfoOutlineRounded` のようなテーマ派生 (末尾 `-Rounded` / `-Sharp` / `-TwoTone`) は残る。

一括置換 (sed):
```bash
find ./src -name '*.ts*' -exec sed -i '' \
  -E 's/(InfoOutline|HelpOutline|PersonOutline|MailOutline|DeleteOutline|ErrorOutline|CheckCircleOutline|StarOutline|InfoOutline|LockOutline|WorkOutline|AddCircleOutline|ChatBubbleOutline|DoneOutline|DriveFileMoveOutline|LabelImportantOutline|LightbulbOutline|ModeEditOutline|PauseCircleOutline|PeopleOutline|PieChartOutline|PlayCircleOutline|RemoveCircleOutline|WorkspacesOutline)([^d])/\1d\2/g' {} \;
```
(あるいは codemod を推奨)

## 12. 個別コンポーネント差分

### Alert
`standardSuccess` / `outlinedError` 等の 12 クラス名が削除。`variants` 配列へ。

### Button
`containedPrimary`, `outlinedSecondary`, `textInherit`, `iconSizeSmall` など 33 クラス名削除。

### Chip
`clickableColorPrimary`, `outlinedPrimary`, `labelSmall`, `iconSmall` 等 26 クラス名削除。

### CircularProgress
`circleDeterminate` / `circleIndeterminate` 削除。

### Dialog / Drawer
`paperScrollPaper`, `paperAnchorLeft` 等削除。`variants` で書き直し。

### List
- `ListItemIcon` の `minWidth`: 56 → **36px** (`theme.spacing` ベースに)
- `ListItem` の `ContainerComponent` / `ContainerProps` 廃止 → `component` / `slotProps.root`
- `styleOverrides.secondaryAction` が **secondaryAction スロット自体**を指すように

### Menu / MenuList
- `MenuItem` を `Menu`/`MenuList` 外で使うとエラー
- Roving tabindex 自動
- `React.Fragment` ラップ OK
- `ListSubheader` / `Divider` への `muiSkipListHighlight` 不要

### Slider
`thumbColorPrimary` 等のクラス名削除。`variants` 配列へ。

### Stepper / Step / StepButton
- `<ol>/<li>` セマンティクス
- `role="tablist"` 等 ARIA 自動付与
- Roving tabindex

### Tab / Tabs
- `Tab` は `Tabs` の子孫必須 (エラー)
- `Tabs` Roving tabindex
- `flexContainer` / `flexContainerVertical` 削除
- `iconWrapper` 削除

### TablePagination
- **`Intl.NumberFormat`** による数値整形 (`103177` → `103,177`)
- `backIconButtonProps` → `slotProps.actions.previousButton`

### TextField (select)
- `<TextField select />` の内部 `InputLabel` が `<label>` ではなく `<div>` を描画
  (単体 `InputLabel` は影響なし)

### Tooltip
`nativeColor` と `cssVariables` 同時使用時の border-bottom alpha 修正。見た目に微差。

### Typography
- `paragraph` prop 廃止 → `sx={{ mb: 2 }}`
- `.MuiTypography-paragraph` セレクタも廃止 → `.MuiTypography-root:where(p)`

### Divider
`light` prop 廃止 → `sx={{ opacity: 0.6 }}`

### Backdrop
デフォルト `aria-hidden` 削除。

### ButtonBase
- 非 `<button>` 要素で使う場合 **`nativeButton={false}`** を明示
- Enter/Space が祖先にバブリング
- `onClick` の `event` が **`MouseEvent`** に (旧: `KeyboardEvent`)
- 非ネイティブ要素で `disabled` 時、キーボード/クリックハンドラ不発火

対象: `ButtonBase`, `Button`, `Fab`, `IconButton`, `ListItemButton`, `MenuItem`,
`StepButton`, `Tab`, `ToggleButton`, `AccordionSummary`, `BottomNavigationAction`,
`CardActionArea`, `TableSortLabel`, `PaginationItem`

### MuiTouchRipple
内部コンポーネント扱いに変更。テーマ型は削除。`MuiButtonBase` 経由でカスタマイズ:

```ts
components: {
  MuiButtonBase: {
    styleOverrides: {
      root: { '& .MuiTouchRipple-root': { color: 'red' } },
    },
  },
}
```

### Dialog
`disableEscapeKeyDown` 削除 → `onClose` の `reason` で判定。

## 13. Storybook v10 対応

MUI v9 と一緒に Storybook v10 (ESM-only) に上げるのが実務的:

```bash
npx storybook@latest upgrade
```

### main.ts (v10)
```ts
import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-themes',
    '@storybook/addon-designs',
  ],
  typescript: { reactDocgen: 'react-docgen-typescript' },
};
export default config;
```

### preview.ts で CSS Variables
```ts
decorators: [
  withThemeFromJSXProvider({
    themes: { light, dark },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
  (Story, ctx) => {
    document.documentElement.setAttribute('data-color-scheme', ctx.globals.colorScheme);
    return Story();
  },
],
```

### CSF Factories (Preview → v11 default)
```ts
import { defineMeta } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

const meta = defineMeta({ title: 'Components/Button', component: Button });
export default meta;
export const Primary = meta.story({ args: { variant: 'contained' } });
export const ClickTest = meta.story({ args: {...} })
  .test(async ({ canvas }) => {
    const btn = canvas.getByRole('button');
    await userEvent.click(btn);
    await expect(btn).toHaveFocus();
  });
```

### sb.mock (依存差し替え)
```ts
import { sb } from 'storybook/test';
sb.mock('./api/drones', () => ({
  fetchDrones: sb.fn().mockResolvedValue([{ id: 1, name: 'D-001' }]),
}));
```

## 14. 手動検証チェックリスト

codemod 後にほぼ確実に手動確認が要る項目:

- [ ] `.MuiXxx-yyyZzz` の独自セレクタ (`grep -rn 'Mui.*-[a-z].*[A-Z]' src`)
- [ ] Tabs/Menu/Stepper に独自 tabindex / onKeyDown を書いていないか
- [ ] `<Dialog disableEscapeKeyDown>` → `onClose` reason 判定に置換
- [ ] `<Typography paragraph>` → `sx={{ mb: 2 }}`
- [ ] `<Divider light>` → `sx={{ opacity: 0.6 }}`
- [ ] `<Box mt={...} color="...">` → `sx={{...}}`
- [ ] `InfoOutline` 等 23 件の icon 置換
- [ ] `GridLegacy` の完全排除 + `size={{...}}` への変換
- [ ] `ListItemIcon` の幅 (56→36px) による UI 詰まり
- [ ] `TablePagination` のスナップショットテスト (数値整形)
- [ ] `ButtonBase` / 派生コンポーネントの `nativeButton` 対応
- [ ] `MenuItem` の `Menu`/`MenuList` 外使用の排除
- [ ] `Tab` の `Tabs` 外使用の排除
- [ ] テーマに `variants` 配列で移行した styleOverrides が機能しているか (dark/light 両方)
- [ ] `cssVariables: true` 化後、手書き `alpha(...)` が `color-mix()` 参照で代替されているか
- [ ] v9 新規コンポーネント (NumberField / Menubar / Chat / Schedule / DateField) のサブパス import

### 検索用 grep パターン集
```bash
# 旧 API 検出
grep -rn 'components=\{\|componentsProps=\{' src
grep -rn 'TransitionComponent=\|PaperProps=\|BackdropComponent=' src
grep -rn 'InputProps=\{\|inputProps=\{' src
grep -rn 'renderTags=' src
grep -rn 'disableEscapeKeyDown' src
grep -rn '<Typography[^>]*paragraph' src
grep -rn '<Divider[^>]*light' src
grep -rn '<Box[^>]*[^s]x=' src  # sx 以外の short prop
grep -rn 'from .@mui/material/GridLegacy' src
grep -rn 'item[[:space:]]*xs=\|item[[:space:]]*sm=' src
grep -rn 'Outline[^d]\b' src  # *Outline → *Outlined
grep -rn 'Mui.*-[a-z].*[A-Z]' src  # 独自クラス名参照
```

これで主な v7 → v9 移行作業は網羅できる。
