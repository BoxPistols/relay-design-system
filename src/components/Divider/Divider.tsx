import React from 'react';
import { useTokens } from '../../theme';

export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  flexItem?: boolean;
  sx?: React.CSSProperties;
  children?: React.ReactNode;
};

export const Divider: React.FC<DividerProps> = ({ orientation = 'horizontal', flexItem, sx, children, ...p }) => {
  const t = useTokens();
  if (children) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: t.text.muted, fontSize: 13, ...sx }} {...p}>
      <div style={{ flex: 1, height: 1, backgroundColor: t.border.subtle }} />
      {children}
      <div style={{ flex: 1, height: 1, backgroundColor: t.border.subtle }} />
    </div>
  );
  return <div style={{
    ...(orientation === 'horizontal'
      ? { height: 1, width: '100%' }
      : { width: 1, alignSelf: flexItem ? 'stretch' : undefined, height: 'auto' }),
    backgroundColor: t.border.subtle, border: 0, ...sx,
  }} {...p} />;
};
