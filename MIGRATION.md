# MUI v7/v8 → v9 マイグレーションガイド (Aeros Design System)

Aeros Design System は **MUI v9 互換 API** で設計されている。
本番 `@mui/material` へ切り替える場合、あるいは既存の v7/v8 コードベースを
このデザインシステムの慣習に合わせて揃える場合の移行ガイド。

## 目次

- [どのドキュメントを読むべきか](#どのドキュメントを読むべきか)
- [3 行まとめ](#3-行まとめ)
- [作業フロー (推奨)](#作業フロー-推奨)
- [Aeros DS ↔ `@mui/material` 置換表](#aeros-ds--muimaterial-置換表)
- [v9 で追加された本パッケージ独自 API](#v9-で追加された本パッケージ独自-api)
- [破壊的変更のトップ 10 (ホットスポット)](#破壊的変更のトップ-10-ホットスポット)
- [よくある落とし穴](#よくある落とし穴)

---

## どのドキュメントを読むべきか

| 出発点 | 読むべき文書 |
|---|---|
| **v7 以前 / GridLegacy 使用 / `styleOverrides` をクラス名で書いている** | [MIGRATION_V7_TO_V9.md](./MIGRATION_V7_TO_V9.md) (全網羅) |
| **v8 を一瞬挟んでいる / 最小差分で v9 にしたい** | [MIGRATION_V8_TO_V9.md](./MIGRATION_V8_TO_V9.md) (軽量版) |
| **新規構築 / v9 から入った** | [../design-system-guide.md](../design-system-guide.md) を読む |
| **新規 v9 コンポーネント (Chat / Schedule / NumberField など) だけ知りたい** | [本ドキュメントの「v9 独自 API」セクション](#v9-で追加された本パッケージ独自-api) |

> MUI v8 は MUI X とメジャー揃えのため **内部的にスキップ** されている。
> v7 → v9 のジャンプが発生するため、変更量は通常のメジャーアップグレードの
> 2 倍程度になる覚悟が必要。

## 3 行まとめ

1. **`components` / `componentsProps` / `XxxComponent` / `XxxProps` 系は全廃**
   → `slots` / `slotProps` へ。9 割は codemod で直せる。
2. **`styleOverrides` のクラス名キー (`containedPrimary` など) は全廃**
   → `root.variants` 配列に props 条件で書く。codemod あり。
3. **`Tabs` / `Menu` / `Stepper` が Roving tabindex + ARIA 自動付与**
   → 独自 a11y 実装があれば二重付与していないか検証。

残りはすべて個別の破壊的変更。codemod preset でほぼ全件潰せる。

## 作業フロー (推奨)

```bash
# 1) Node 22.19+ に揃える (Storybook v10 ESM-only のため必須)
nvm install 22.19
nvm use 22.19

# 2) 一括アップグレード (MUI + 周辺)
pnpm up -L @mui/material @mui/icons-material @mui/system \
  @emotion/react @emotion/styled storybook

# 3) 破壊的変更を codemod で一掃
npx @mui/codemod@latest v9.0.0/preset-safe ./src

# 4) 残った手動移行項目を確認
npx @mui/codemod@latest v9.0.0/preset-safe ./src --dry-run

# 5) CSS Variables テーマに寄せる (任意、高推奨)
#    createTheme({ cssVariables: { cssVarPrefix: 'ds' }, colorSchemes: {...} })

# 6) Storybook v10 へ (ESM-only)
npx storybook@latest upgrade

# 7) lint / type-check / 目視確認
pnpm tsc --noEmit
pnpm test
pnpm storybook
```

`preset-safe` が潰す内容は [付録 B: codemod 一覧](../design-system-guide.md#付録-b-利用可能な-codemod-一覧主要)。

---

## Aeros DS ↔ `@mui/material` 置換表

Aeros のコンポーネントはすべて MUI v9 と同じ props / slots 命名で書かれているため、
import 先を変えるだけで移行可能。

```diff
- import { Button, TextField } from 'aeros-design-system';
+ import { Button, TextField } from '@mui/material';
```

ただし**新規コンポーネントはサブパス import**が必要 (tree-shaking のため):

```diff
- import { NumberField, Menubar, Chat, Schedule, DateField } from 'aeros-design-system';
+ import { NumberField } from '@mui/material/NumberField';
+ import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSubmenu } from '@mui/material/Menubar';
+ import { Chat, ChatList, ChatMessage, ChatComposer, ChatHeader, ChatTypingIndicator } from '@mui/material/Chat';
+ import { Schedule, ScheduleMonthView, ScheduleWeekView, ScheduleDayView, ScheduleTimeline } from '@mui/material/Schedule';
+ import { DateField, TimeField, DateTimeField } from '@mui/material/DateField';
```

テーマについては `src/theme/createTheme.ts` の `createThemeConfig(tokens)` を
`createTheme()` にそのまま渡せる構造になっている:

```ts
import { createTheme } from '@mui/material/styles';
import { createThemeConfig } from 'aeros-design-system';
import { buildTokens } from 'aeros-design-system';

const theme = createTheme(createThemeConfig(buildTokens('light')));
```

## v9 で追加された本パッケージ独自 API

### NumberField (Base UI)
```tsx
<NumberField label="機体数" defaultValue={1} min={0} max={99} step={1}
  format={{ style: 'currency', currency: 'JPY' }}
  slotProps={{ input: { inputMode: 'numeric' } }}/>
```

### Menubar (サブメニュー対応)
```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>ファイル</MenubarTrigger>
    <MenubarContent>
      <MenubarItem shortcut="⌘N">新規作成</MenubarItem>
      <MenubarSubmenu label="エクスポート">
        <MenubarItem>PDF</MenubarItem>
      </MenubarSubmenu>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

### Chat (会話型 UI)
```tsx
<Chat height={480}>
  <ChatHeader avatar={<Avatar/>} title="田中" status="online"/>
  <ChatList>
    <ChatMessage variant="received">こんにちは</ChatMessage>
    <ChatMessage variant="sent" status="read" timestamp={new Date()}>了解です</ChatMessage>
    <ChatTypingIndicator/>
  </ChatList>
  <ChatComposer suggestions={['定型返信 1', '定型返信 2']} onSend={(t) => send(t)}/>
</Chat>
```

特徴:
- `variant`: `sent` / `received` / `system` で話者を宣言
- `status`: `sending` / `sent` / `delivered` / `read` / `error`
- `slots.bubble` で吹き出しをカスタム可能
- `role="log"` + `aria-live="polite"` で支援技術対応
- `ChatComposer` は `Enter` 送信 / `Shift+Enter` 改行

### Schedule (カレンダー / スケジュール)
```tsx
<Schedule
  view="month"  // 'month' | 'week' | 'day' | 'timeline'
  events={events}
  onEventClick={(e) => open(e)}
  onDateChange={(d) => setDate(d)}
/>
```

- 4 ビューを内部でレンダリング (`ScheduleMonthView` / `WeekView` / `DayView` / `Timeline`)
- `events`: `{ id, title, start, end, color? }[]`
- ARIA grid セマンティクス、role="columnheader" / "gridcell" / "tab" を自動付与
- `color` は MUI theme の 6 色 (`primary` / `secondary` / `success` / `warning` / `error` / `info`)

### DateField / TimeField / DateTimeField (Base UI Pickers)
```tsx
<DateField label="日付" defaultValue={new Date()}
  minDate={new Date()}
  slotProps={{
    input: { placeholder: 'YYYY/MM/DD' },
    popper: { style: { zIndex: 1400 } },
    day: { style: { fontWeight: 500 } },
  }}/>

<TimeField label="時刻" step={15} defaultValue={new Date()}/>

<DateTimeField label="日時" defaultValue={new Date()}/>
```

- `minDate` / `maxDate` で範囲制限
- 矢印キーでフィールド単位のインクリメント
- ポップオーバーにカレンダー内蔵 (`slotProps.popper` でカスタム)

### Stepper (強化)
- `<ol>/<li>` に変更
- `role="tablist"` / `role="tab"` / `aria-selected` / `aria-posinset` / `aria-setsize` 自動付与
- Roving tabindex で矢印キー移動

---

## 破壊的変更のトップ 10 (ホットスポット)

実プロジェクトで**ほぼ確実にヒットする**頻出変更:

1. **`InputProps` → `slotProps.input`** (TextField 全般)
2. **`inputProps` → `slotProps.htmlInput`** (ネイティブ input 属性)
3. **`PaperProps` → `slotProps.paper`** (Dialog / Drawer / Menu / Popover)
4. **`TransitionComponent` / `TransitionProps` → `slots.transition` / `slotProps.transition`**
5. **`components` / `componentsProps` → `slots` / `slotProps`** (全般)
6. **`GridLegacy` 削除 → `Grid` (v2, `size={{ xs: 12, sm: 6 }}`)**
7. **`<Typography paragraph />` → `sx={{ mb: 2 }}`**
8. **`<Divider light />` → `sx={{ opacity: 0.6 }}`**
9. **System Props 廃止: `<Box mt={2} bgcolor="..." />` → `sx={{ mt: 2, bgcolor: '...' }}`**
10. **`*Outline` icons → `*Outlined`** (`InfoOutline` → `InfoOutlined` など 23 件)

## よくある落とし穴

### 1) codemod で壊れる独自セレクタ
`sx` / `styled()` 内で `.MuiButton-containedPrimary` のようなクラス名を直指定している
箇所は codemod の対象外。`grep -rn 'Mui.*-[a-z].*[A-Z]' src` で洗い出す。

### 2) Roving tabindex による既存キーボード処理の競合
独自に `tabIndex={0}` / `onKeyDown` を Tabs / Menu / Stepper 子要素に実装していると、
v9 の自動付与と衝突する。削除して v9 に任せる。

### 3) `aria-hidden` 消失による読み上げ挙動変化
Backdrop / Modal の `aria-hidden="true"` がデフォルトで消えた。
独自に打ち消していた実装は不要になるが、モーダル外の読み上げを遮断したい場合は
`inert` 属性を検討。

### 4) `disableEscapeKeyDown` の onClose 対応
削除された prop のため、すべて `onClose={(e, reason) => reason !== 'escapeKeyDown' && ...}`
に置き換える。codemod あり (`dialog-props`)。

### 5) CI で落ちる User-Agent ベースの test 検出
`process.env.NODE_ENV === 'test'` 判定が UA ベースになった。
jsdom 環境で layout 関連の挙動がわずかに変わるテストがあれば `userAgent` を設定。

### 6) サブパス import のバンドルサイズ
新規コンポーネントは必ずサブパス (`@mui/material/Chat`) で import。
`@mui/material` から丸ごと import すると tree-shaking が効かず、
v9 追加分 (Chat / Schedule / NumberField / Menubar / DateField) がまとめて乗る。

### 7) `TablePagination` 数値整形で国際化バグ
`Intl.NumberFormat` が**ロケール非依存**で効くようになったため、
手動で `String(count)` にしていたテストスナップショットがずれる。

### 8) ButtonBase の Enter/Space バブリング
以前は `event.preventDefault()` で止まっていたキーボードクリックが、
v9 では祖先までバブリングするようになった。`onKeyDown` ハンドラを
祖先に持つ場合は `event.target` で判定を。

### 9) `ListItemIcon` 幅の縮小 (56px → 36px)
List の見た目が詰まる。`theme.components.MuiListItemIcon.styleOverrides.root.minWidth` で
既存寸法を復元可能。

### 10) `variants` 配列の順序依存
`variants` は先頭から走査して match 全件を**マージ**する。
同じキーを複数ルールで上書きする設計にすると、末尾ほど強くなる。
codemod 出力をそのまま信じず、実挙動で差分確認を推奨。

---

## Storybook v10 / CSF Factories への移行

MUI v9 と同時に Storybook を v10 (ESM-only) に揃えるのが実務的。詳細は
[../design-system-guide.md §8](../design-system-guide.md) を参照。

```bash
npx storybook@latest upgrade
```

CSF Factories に移行する場合は各 `*.stories.tsx` を以下のパターンへ:

```ts
import { defineMeta } from '@storybook/react-vite';
const meta = defineMeta({ title: 'Components/Button', component: Button });
export default meta;
export const Primary = meta.story({ args: {...} });
export const ClickTest = meta.story({...}).test(async ({ canvas, userEvent }) => {...});
```

本パッケージの既存ストーリーはまだ CSF3 記法 (`Meta` / `StoryObj`) のままだが、
`defineMeta` への置換は機械的に可能。
