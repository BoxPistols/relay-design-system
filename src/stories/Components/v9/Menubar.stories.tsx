import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSubmenu, MenubarSeparator,
} from '../../../components';

const meta: Meta = { title: 'Components/v9 New/Menubar' };
export default meta;

/**
 * ★ MUI v9 新規 · Base UI ベース
 *
 * v9でネストしたサブメニューが正式サポートされた。
 * ←→ キーでトリガー移動、Esc で閉じる。
 */
export const Basic: StoryObj = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>ファイル</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="⌘N">新規作成</MenubarItem>
          <MenubarItem shortcut="⌘O">開く…</MenubarItem>
          <MenubarSeparator/>
          <MenubarItem shortcut="⌘Q">終了</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>編集</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="⌘Z">元に戻す</MenubarItem>
          <MenubarItem shortcut="⌘C">コピー</MenubarItem>
          <MenubarItem shortcut="⌘V">貼り付け</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const WithSubmenu: StoryObj = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>ファイル</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>新規作成</MenubarItem>
          <MenubarSubmenu label="エクスポート">
            <MenubarItem>PDF (.pdf)</MenubarItem>
            <MenubarItem>CSV (.csv)</MenubarItem>
            <MenubarItem>GeoJSON (.geojson)</MenubarItem>
          </MenubarSubmenu>
          <MenubarSubmenu label="最近使った項目">
            <MenubarItem>flight-plan-042.json</MenubarItem>
            <MenubarItem>mission-brief.pdf</MenubarItem>
          </MenubarSubmenu>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
