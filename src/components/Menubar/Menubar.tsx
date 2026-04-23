import React, { createContext, useContext, useState, useRef } from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';
import { Popover } from '../../utils/Popover';

/**
 * ★ MUI v9 新規コンポーネント: Menubar (Base UI ベース)
 *
 * 水平型メニューバー + サブメニュー。v7 までは単一レベルしか組めなかった領域が
 * v9 で正式サポート。Roving tabindex で ←→ キーで移動可能。
 *
 * Portal 化 (2026-04 の修正): `MenubarContent` / `MenubarSubmenu` は祖先の
 * `overflow: hidden` に切られないよう `Popover` (document.body portal) で描画。
 * 祖先の Card 等で `overflow: 'visible'` を毎回書き足す必要がなくなった。
 *
 * 本番移行時:
 *   import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSubmenu } from '@mui/material/Menubar';
 */

type MenubarCtx = {
  active: number | null;
  setActive: (n: number | null) => void;
  focusIdx: number;
  setFocusIdx: (n: number) => void;
};
const MenubarContext = createContext<MenubarCtx | null>(null);

/** 各 MenubarMenu 内で Trigger と Content が共有する anchor ref */
type MenuCtx = { triggerRef: React.RefObject<HTMLButtonElement | null>; menuIdx: number };
const MenuContext = createContext<MenuCtx | null>(null);

/**
 * S5: children は `MenubarMenu` 要素列を想定。cloneElement で `menuIdx` を
 * 注入するため、ReactElement 型に narrow。動的並び替えは現状未サポート
 * (index key のため)。
 */
type MenubarChild = React.ReactElement<{ menuIdx?: number; children?: React.ReactNode }>;
export const Menubar: React.FC<{ children?: MenubarChild | MenubarChild[]; sx?: React.CSSProperties }> = ({ children, sx }) => {
  const t = useTokens();
  const [active, setActive] = useState<number | null>(null);
  const [focusIdx, setFocusIdx] = useState(0);
  const items = React.Children.toArray(children) as MenubarChild[];

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); setFocusIdx((focusIdx - 1 + items.length) % items.length); }
    if (e.key === 'ArrowRight') { e.preventDefault(); setFocusIdx((focusIdx + 1) % items.length); }
    if (e.key === 'Escape') setActive(null);
  };

  return (
    <MenubarContext.Provider value={{ active, setActive, focusIdx, setFocusIdx }}>
      <div role="menubar" onKeyDown={handleKey} style={{
        display: 'inline-flex', gap: 2, padding: 4, backgroundColor: t.bg.surface,
        border: `1px solid ${t.border.subtle}`, borderRadius: 8, ...sx,
      }}>
        {items.map((item, i) => React.cloneElement(item, { key: i, menuIdx: i }))}
      </div>
    </MenubarContext.Provider>
  );
};

export const MenubarMenu: React.FC<{ children?: React.ReactNode; menuIdx?: number }> = ({ children, menuIdx = 0 }) => {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return (
    <MenuContext.Provider value={{ triggerRef, menuIdx }}>
      <div>{children}</div>
    </MenuContext.Provider>
  );
};

export const MenubarTrigger: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const t = useTokens();
  const ctx = useContext(MenubarContext)!;
  const menu = useContext(MenuContext)!;
  const active = ctx.active === menu.menuIdx;
  const focused = ctx.focusIdx === menu.menuIdx;
  return (
    <button ref={menu.triggerRef} role="menuitem" tabIndex={focused ? 0 : -1}
      onClick={() => ctx.setActive(active ? null : menu.menuIdx)}
      onMouseEnter={() => { if (ctx.active !== null) ctx.setActive(menu.menuIdx); }}
      style={{
        padding: '6px 12px', border: 'none', borderRadius: 6,
        backgroundColor: active ? t.brand.soft : 'transparent',
        color: active ? t.brand.main : t.text.primary,
        fontSize: 13, fontWeight: 500, fontFamily: fonts.sans,
        cursor: 'pointer', transition: 'all 0.1s',
      }}>{children}</button>
  );
};

export const MenubarContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const t = useTokens();
  const ctx = useContext(MenubarContext)!;
  const menu = useContext(MenuContext)!;
  const open = ctx.active === menu.menuIdx;
  return (
    <Popover
      anchorRef={menu.triggerRef} open={open} onClose={() => ctx.setActive(null)}
      placement="bottom" align="start"
      role="menu"
      style={{
        zIndex: t.z.popover,
        minWidth: 180, backgroundColor: t.bg.surface,
        border: `1px solid ${t.border.subtle}`, borderRadius: 8,
        boxShadow: t.shadow.md, padding: 4,
      }}>
      {children}
    </Popover>
  );
};

export const MenubarItem: React.FC<{
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  shortcut?: string;
}> = ({ children, onClick, disabled, shortcut }) => {
  const t = useTokens();
  const ctx = useContext(MenubarContext)!;
  const [h, setH] = useState(false);
  return (
    <button role="menuitem" disabled={disabled}
      onClick={(e) => { onClick?.(e); ctx.setActive(null); }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', border: 'none', borderRadius: 6,
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: h && !disabled ? t.bg.sunken : 'transparent',
        color: disabled ? t.text.disabled : t.text.primary,
        fontSize: 13, fontFamily: fonts.sans, textAlign: 'left',
      }}>
      <span>{children}</span>
      {shortcut && <span style={{ fontFamily: fonts.mono, color: t.text.muted, fontSize: 11 }}>{shortcut}</span>}
    </button>
  );
};

export const MenubarSubmenu: React.FC<{ label: React.ReactNode; children?: React.ReactNode }> = ({ label, children }) => {
  const t = useTokens();
  // Portal で popover が body 直下に飛ぶため、trigger 側 onMouseLeave だけだと
  // popover に mouse を移動した瞬間に閉じる。trigger / popover どちらかに
  // hover している間は open を維持するよう 2 つの mouse-state を OR する。
  const [hoverTrigger, setHoverTrigger] = useState(false);
  const [hoverContent, setHoverContent] = useState(false);
  const open = hoverTrigger || hoverContent;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div>
      <button ref={triggerRef}
        onMouseEnter={() => setHoverTrigger(true)}
        onMouseLeave={() => setHoverTrigger(false)}
        style={{
          display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 12px', border: 'none', borderRadius: 6, cursor: 'pointer',
          backgroundColor: open ? t.bg.sunken : 'transparent',
          color: t.text.primary, fontSize: 13, fontFamily: fonts.sans, textAlign: 'left',
        }}>
        <span>{label}</span>
        <span style={{ fontSize: 10, color: t.text.muted }}>▶</span>
      </button>
      <Popover
        anchorRef={triggerRef} open={open}
        onClose={() => { setHoverTrigger(false); setHoverContent(false); }}
        placement="bottom" align="end"
        role="menu"
        style={{
          zIndex: t.z.popover + 1,
          minWidth: 160, backgroundColor: t.bg.surface,
          border: `1px solid ${t.border.subtle}`, borderRadius: 8,
          boxShadow: t.shadow.md, padding: 4,
        }}>
        <div
          onMouseEnter={() => setHoverContent(true)}
          onMouseLeave={() => setHoverContent(false)}>
          {children}
        </div>
      </Popover>
    </div>
  );
};

export const MenubarSeparator: React.FC = () => {
  const t = useTokens();
  return <div style={{ height: 1, backgroundColor: t.border.subtle, margin: '4px 0' }}/>;
};
