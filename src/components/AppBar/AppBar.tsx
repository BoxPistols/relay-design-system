import React from 'react';
import { useTokens } from '../../theme';

export type AppBarProps = {
  position?: 'fixed' | 'sticky' | 'static' | 'absolute';
  color?: 'default' | 'transparent';
  children?: React.ReactNode;
  sx?: React.CSSProperties;
};

export const AppBar: React.FC<AppBarProps> = ({
  position = 'fixed', color = 'default', children, sx,
}) => {
  const t = useTokens();
  return (
    <header style={{
      position: position === 'sticky' ? 'sticky' : position === 'fixed' ? 'fixed' : 'static',
      top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: color === 'transparent' ? 'transparent' : t.bg.surface,
      borderBottom: `1px solid ${t.border.subtle}`,
      backdropFilter: 'saturate(180%) blur(12px)', ...sx,
    }}>{children}</header>
  );
};
