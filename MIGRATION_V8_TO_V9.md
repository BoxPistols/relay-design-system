# MUI v8 → v9 軽量マイグレーションガイド

v8 を経由済みのコードベース向けの**差分だけ**のマイグレーションガイド。
v7 以前から直接来る場合は [MIGRATION_V7_TO_V9.md](./MIGRATION_V7_TO_V9.md) の網羅版を参照。

> 注: MUI v8 は MUI X とのメジャー整合のため**一般公開されていない内部バージョン**。
> 実務上「v8 相当の RC / canary 版を長く使っていた」プロジェクトや、
> `@mui/material@next` を踏んでいたケース向け。

## TL;DR — 3 項目だけ

v8 → v9 で実質残っている作業は以下の 3 点に集約される:

1. **新コンポーネントのサブパス import**
   `NumberField` / `Menubar` / `Chat` / `Schedule` / `DateField` は各サブパスから取得。
2. **`cssVariables` 化 (任意、高推奨)**
   派生色が `color-mix()` ベースに置き換わり、テーマ切替フラッシュが消える。
3. **Storybook v10 / Node 22.19 化**
   ESM-only 環境への移行。これは v9 のためというより周辺エコシステムの追従。

それ以外の API は v8 の時点で `slots` / `slotProps` / `variants` ベースに
揃っているため、コード側の変更は最小限で済む。

## 1. 新コンポーネントを取り込む

v9 で追加された 5 つのコンポーネントは**サブパス import**が必須
(tree-shaking のため全体 barrel に含まれていない):

```ts
import { NumberField } from '@mui/material/NumberField';
import {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSubmenu, MenubarSeparator,
} from '@mui/material/Menubar';
import {
  Chat, ChatList, ChatMessage, ChatComposer,
  ChatHeader, ChatTypingIndicator,
} from '@mui/material/Chat';
import {
  Schedule, ScheduleMonthView, ScheduleWeekView,
  ScheduleDayView, ScheduleTimeline,
} from '@mui/material/Schedule';
import { DateField, TimeField, DateTimeField } from '@mui/material/DateField';
```

`@mui/material` 直下 import で使えない点に注意。
barrel に混ぜるとバンドルに Chat / Schedule 一式が常時乗る。

## 2. テーマを `cssVariables` へ

v8 時点で `cssVariables` はオプトインだった。v9 は**ほぼ強制的に推奨**:

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

派生色は `color-mix()` で自動生成:
```css
:root {
  --ds-palette-primary-main: #1976d2;
  --ds-palette-primary-hover: color-mix(in srgb, var(--ds-palette-primary-main) 92%, #fff);
}
```

手書きで `alpha()` / `lighten()` を呼んでいる箇所は CSS 変数参照に寄せられる。

## 3. 追加の細かい変更

### 3.1 TablePagination の数値整形

`Intl.NumberFormat` によるロケール整形が入ったため、スナップショットテストで
`103177` → `103,177` のような差分が出る:

```tsx
<TablePagination
  labelDisplayedRows={({ from, to, count }) =>
    `${from}–${to} / ${count}`}
/>
```

### 3.2 Backdrop の `aria-hidden="true"` 削除

独自に打ち消していた a11y 対応は不要になるが、
モーダル外の読み上げを遮断したい場合は `inert` 属性を検討。

### 3.3 Tooltip の border-bottom alpha 順序

`nativeColor` と `cssVariables` 同時使用時の border 色計算が修正。
見た目に微差が出る可能性あり (visual regression で確認)。

### 3.4 ButtonBase の挙動

- Enter/Space でクリックが**祖先にバブリング**するように
- `onClick` の `event` が `MouseEvent` に (旧: `KeyboardEvent`)
- 非 `<button>` 要素で使う場合 **`nativeButton={false}`** 明示を推奨

対象: `ButtonBase`, `Button`, `Fab`, `IconButton`, `ListItemButton`, `MenuItem`,
`StepButton`, `Tab`, `ToggleButton`, `AccordionSummary`, `BottomNavigationAction`,
`CardActionArea`, `TableSortLabel`, `PaginationItem`

### 3.5 jsdom / happy-dom 検出

`process.env.NODE_ENV === 'test'` ではなく User-Agent で検出されるように。
CI 環境の layout 関連テストで挙動がわずかに変わる可能性。

## 4. 新機能 (Chat / Schedule / NumberField / Menubar / DateField)

v9 固有のサンプルは [MIGRATION.md#v9-で追加された本パッケージ独自-api](./MIGRATION.md#v9-で追加された本パッケージ独自-api) 参照。

### クイックリファレンス

```tsx
// NumberField (数値入力 · Base UI)
<NumberField label="注文数" defaultValue={1} min={0} max={99} step={1}
  format={{ style: 'currency', currency: 'JPY' }}/>

// Menubar (サブメニュー対応メニューバー)
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>ファイル</MenubarTrigger>
    <MenubarContent>
      <MenubarItem shortcut="⌘N">新規</MenubarItem>
      <MenubarSubmenu label="エクスポート">
        <MenubarItem>PDF</MenubarItem>
      </MenubarSubmenu>
    </MenubarContent>
  </MenubarMenu>
</Menubar>

// Chat (会話型 UI)
<Chat>
  <ChatHeader title="田中" status="online"/>
  <ChatList>
    <ChatMessage variant="received">おはようございます</ChatMessage>
    <ChatMessage variant="sent" status="read">了解です</ChatMessage>
    <ChatTypingIndicator/>
  </ChatList>
  <ChatComposer onSend={(t) => send(t)}/>
</Chat>

// Schedule (月/週/日/タイムライン)
<Schedule view="month" events={events} onEventClick={handle}/>

// DateField (セクション型日付入力 + カレンダー popover)
<DateField label="日付" defaultValue={new Date()}
  slotProps={{ popper: { style: { zIndex: 1400 } } }}/>
```

## 5. Storybook v10 / Node 22.19

```bash
nvm install 22.19 && nvm use 22.19
npx storybook@latest upgrade
```

### main.ts (ESM-only)
```ts
import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
};
export default config;
```

### CSF Factories (v11 default 予定 · 10.3 ではまだ非公開)

> ⚠️ `defineMeta` は **Storybook 10.3 ではまだ公開 export されていない** (internal)。
> 10.3 では CSF3 (`const meta = {...} satisfies Meta<typeof X>`) を維持し、
> preview 側のみ `definePreview` で型安全化する運用を推奨。

```ts
import { defineMeta } from '@storybook/react-vite';
const meta = defineMeta({ title: 'Components/NumberField', component: NumberField });
export default meta;
export const Basic = meta.story({ args: { label: '数量', defaultValue: 1 } });
```

## 6. 作業スクリプト (最小構成)

```bash
# v8 → v9 を最小手順で踏む
pnpm up -L @mui/material @mui/icons-material @mui/system \
  @emotion/react @emotion/styled
npx @mui/codemod@latest v9.0.0/preset-safe ./src --dry-run | less
# 問題なければ dry-run を外して適用
npx @mui/codemod@latest v9.0.0/preset-safe ./src
pnpm tsc --noEmit
pnpm test
pnpm storybook
```

v8 → v9 の変更はほとんどが **追加**か**内部改善**なので、通常は
`preset-safe` だけでコンパイルが通る。通らなければ [MIGRATION_V7_TO_V9.md](./MIGRATION_V7_TO_V9.md)
の対応表を参照。
