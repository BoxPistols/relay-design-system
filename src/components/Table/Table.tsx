import React, { useState } from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';

export const TableContainer: React.FC<{ children?: React.ReactNode; sx?: React.CSSProperties; component?: any }> = ({ children, sx, component: C = 'div' }) => {
  const Comp: any = C;
  return <Comp style={{ width: '100%', overflowX: 'auto', ...sx }}>{children}</Comp>;
};

export const Table: React.FC<{ children?: React.ReactNode; sx?: React.CSSProperties; size?: 'small' | 'medium' }> = ({ children, sx, size = 'medium' }) => (
  <table style={{
    width: '100%', borderCollapse: 'collapse',
    fontSize: size === 'small' ? 13 : 14, fontFamily: fonts.sans, ...sx,
  }}>{children}</table>
);

export const TableHead: React.FC<{ children?: React.ReactNode }> = ({ children }) => <thead>{children}</thead>;
export const TableBody: React.FC<{ children?: React.ReactNode }> = ({ children }) => <tbody>{children}</tbody>;

export const TableRow: React.FC<{
  children?: React.ReactNode;
  hover?: boolean;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  sx?: React.CSSProperties;
}> = ({ children, hover, selected, onClick, sx }) => {
  const t = useTokens();
  const [h, setH] = useState(false);
  return (
    <tr onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: selected ? t.brand.soft : hover && h ? t.bg.sunken : 'transparent',
        transition: 'background 0.1s', ...sx,
      }}>{children}</tr>
  );
};

export const TableCell: React.FC<{
  children?: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  variant?: 'body' | 'head';
  colSpan?: number;
  sx?: React.CSSProperties;
}> = ({ children, align = 'left', variant = 'body', colSpan, sx }) => {
  const t = useTokens();
  const head = variant === 'head';
  return (
    <td colSpan={colSpan} style={{
      padding: head ? '12px 16px' : '14px 16px', textAlign: align,
      borderBottom: `1px solid ${t.border.subtle}`,
      color: head ? t.text.secondary : t.text.primary,
      fontSize: head ? 12 : 14, fontWeight: head ? 600 : 400,
      textTransform: head ? 'uppercase' : 'none',
      letterSpacing: head ? '0.06em' : 0, whiteSpace: 'nowrap', ...sx,
    }}>{children}</td>
  );
};
