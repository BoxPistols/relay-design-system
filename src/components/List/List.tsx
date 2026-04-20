import React, { useState } from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';

export const List: React.FC<{ children?: React.ReactNode; sx?: React.CSSProperties; disablePadding?: boolean }> = ({ children, sx, disablePadding }) => (
  <ul style={{ listStyle: 'none', margin: 0, padding: disablePadding ? 0 : '8px 0', ...sx }}>{children}</ul>
);

export const ListItem: React.FC<{ children?: React.ReactNode; sx?: React.CSSProperties }> = ({ children, sx }) => (
  <li style={{ ...sx }}>{children}</li>
);

export const ListItemButton: React.FC<{
  selected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
}> = ({ selected, onClick, children, sx }) => {
  const t = useTokens();
  const [h, setH] = useState(false);
  return (
    <li><button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
        border: 'none', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
        fontFamily: fonts.sans,
        backgroundColor: selected ? t.brand.soft : h ? t.bg.sunken : 'transparent',
        color: selected ? t.brand.main : t.text.primary,
        fontSize: 14, fontWeight: selected ? 500 : 400,
        transition: 'all 0.1s', ...sx,
      }}>{children}</button></li>
  );
};

export const ListItemIcon: React.FC<{ children?: React.ReactNode; sx?: React.CSSProperties }> = ({ children, sx }) => (
  <span style={{ display: 'inline-flex', color: 'inherit', opacity: 0.8, ...sx }}>{children}</span>
);

export const ListItemText: React.FC<{
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
}> = ({ primary, secondary, children, sx }) => {
  const t = useTokens();
  return (
    <span style={{ flex: 1, ...sx }}>
      <div style={{ fontSize: 14, color: 'inherit' }}>{primary || children}</div>
      {secondary && <div style={{ fontSize: 12, color: t.text.muted }}>{secondary}</div>}
    </span>
  );
};
