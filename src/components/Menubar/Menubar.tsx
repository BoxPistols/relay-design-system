import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';

/**
 * ★ MUI v9 新規コンポーネント: Menubar (Base UI ベース)
 *
 * 水平型メニューバー + サブメニュー。v7までは単一レベルしか組めなかった領域が
 * v9で正式サポート。Roving tabindex で ←→ キーで移動可能。
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

/**
 * S5: children は `MenubarMenu` 要素列を想定。cloneElement で `menuIdx` を
 * 注入するため、ReactElement 型に narrow。動的並び替えは現状未サポート
 * (index key のため)。要る場合は MenubarMenu に id prop を追加。
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

export const MenubarMenu: React.FC<{ children?: React.ReactNode; menuIdx?: number }> = ({ children, menuIdx }) => (
  <div style={{ position: 'relative' }}>
    {React.Children.map(children, (c: any) => c && React.cloneElement(c, { menuIdx }))}
  </div>
);

export const MenubarTrigger: React.FC<{ children?: React.ReactNode; menuIdx?: number }> = ({ children, menuIdx = 0 }) => {
  const t = useTokens();
  const ctx = useContext(MenubarContext)!;
  const active = ctx.active === menuIdx;
  const focused = ctx.focusIdx === menuIdx;
  return (
    <button role="menuitem" tabIndex={focused ? 0 : -1}
      onClick={() => ctx.setActive(active ? null : menuIdx)}
      onMouseEnter={() => { if (ctx.active !== null) ctx.setActive(menuIdx); }}
      style={{
        padding: '6px 12px', border: 'none', borderRadius: 6,
        backgroundColor: active ? t.brand.soft : 'transparent',
        color: active ? t.brand.main : t.text.primary,
        fontSize: 13, fontWeight: 500, fontFamily: fonts.sans,
        cursor: 'pointer', transition: 'all 0.1s',
      }}>{children}</button>
  );
};

export const MenubarContent: React.FC<{ children?: React.ReactNode; menuIdx?: number }> = ({ children, menuIdx = 0 }) => {
  const t = useTokens();
  const ctx = useContext(MenubarContext)!;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) ctx.setActive(null);
    };
    if (ctx.active === menuIdx) {
      document.addEventListener('mousedown', h);
      return () => document.removeEventListener('mousedown', h);
    }
  }, [ctx.active, menuIdx]);

  if (ctx.active !== menuIdx) return null;
  return (
    <div ref={ref} role="menu" style={{
      position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 1000,
      minWidth: 180, backgroundColor: t.bg.surface,
      border: `1px solid ${t.border.subtle}`, borderRadius: 8,
      boxShadow: t.shadow.md, padding: 4,
    }}>{children}</div>
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
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button style={{
        display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', border: 'none', borderRadius: 6, cursor: 'pointer',
        backgroundColor: open ? t.bg.sunken : 'transparent',
        color: t.text.primary, fontSize: 13, fontFamily: fonts.sans, textAlign: 'left',
      }}>
        <span>{label}</span>
        <span style={{ fontSize: 10, color: t.text.muted }}>▶</span>
      </button>
      {open && (
        <div role="menu" style={{
          position: 'absolute', left: '100%', top: 0, marginLeft: 4, minWidth: 160,
          backgroundColor: t.bg.surface, border: `1px solid ${t.border.subtle}`,
          borderRadius: 8, boxShadow: t.shadow.md, padding: 4, zIndex: 1001,
        }}>{children}</div>
      )}
    </div>
  );
};

export const MenubarSeparator: React.FC = () => {
  const t = useTokens();
  return <div style={{ height: 1, backgroundColor: t.border.subtle, margin: '4px 0' }}/>;
};
