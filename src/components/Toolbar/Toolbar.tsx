import React from 'react';

export type ToolbarProps = { children?: React.ReactNode; sx?: React.CSSProperties };

export const Toolbar: React.FC<ToolbarProps> = ({ children, sx }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '12px 20px', minHeight: 56, ...sx,
  }}>{children}</div>
);
