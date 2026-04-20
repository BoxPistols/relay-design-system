import React from 'react';
import { useTokens } from '../../theme';

export type BadgeProps = {
  badgeContent?: React.ReactNode;
  color?: 'default' | 'primary' | 'error' | 'warning' | 'success';
  variant?: 'standard' | 'dot';
  max?: number;
  invisible?: boolean;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
};

export const Badge: React.FC<BadgeProps> = ({
  badgeContent, color = 'default', variant = 'standard', max = 99, invisible, children, sx,
}) => {
  const t = useTokens();
  const cMap: Record<string, string> = {
    default: t.text.muted, primary: t.brand.main, error: t.danger.main,
    warning: t.warning.main, success: t.success.main,
  };
  const showBadge = !invisible && (variant === 'dot' || badgeContent != null);
  const display = typeof badgeContent === 'number' && badgeContent > max ? `${max}+` : badgeContent;
  return (
    <span style={{ position: 'relative', display: 'inline-flex', ...sx }}>
      {children}
      {showBadge && (
        <span style={{
          position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)',
          backgroundColor: cMap[color] || cMap.default, color: t.text.onBrand,
          borderRadius: variant === 'dot' ? '50%' : 10,
          minWidth: variant === 'dot' ? 8 : 18, height: variant === 'dot' ? 8 : 18,
          padding: variant === 'dot' ? 0 : '0 5px',
          fontSize: 10, fontWeight: 600, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          border: `2px solid ${t.bg.surface}`,
        }}>{variant === 'dot' ? null : display as any}</span>
      )}
    </span>
  );
};
