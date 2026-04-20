import React from 'react';
import { useTokens } from '../../theme';

export type LinkProps = {
  href?: string;
  underline?: 'none' | 'hover' | 'always';
  color?: 'primary' | 'secondary' | 'inherit';
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  sx?: React.CSSProperties;
};

export const Link: React.FC<LinkProps> = ({ href, underline = 'hover', color = 'primary', children, onClick, sx }) => {
  const t = useTokens();
  const cMap: Record<string, string> = { primary: t.brand.main, inherit: 'inherit', secondary: t.text.secondary };
  return (
    <a href={href} onClick={onClick}
      style={{
        color: cMap[color], textDecoration: underline === 'always' ? 'underline' : 'none',
        cursor: 'pointer', ...sx,
      }}
      onMouseEnter={(e) => { if (underline === 'hover') (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'; }}
      onMouseLeave={(e) => { if (underline === 'hover') (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'; }}>
      {children}
    </a>
  );
};
