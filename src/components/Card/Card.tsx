import React from 'react';
import { useTokens } from '../../theme';
import { typographyVariants } from '../Typography/Typography';

export type CardProps = {
  variant?: 'outlined' | 'elevation';
  children?: React.ReactNode;
  sx?: React.CSSProperties;
  [k: string]: any;
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'outlined', children, sx, ...p }, ref) => {
    const t = useTokens();
    return (
      <div ref={ref} style={{
        backgroundColor: t.bg.surface, borderRadius: 12,
        border: variant === 'outlined' ? `1px solid ${t.border.subtle}` : 'none',
        boxShadow: variant === 'elevation' ? t.shadow.sm : 'none',
        overflow: 'hidden', ...sx,
      }} {...p}>{children}</div>
    );
  }
);
Card.displayName = 'Card';

export const CardContent: React.FC<{ children?: React.ReactNode; sx?: React.CSSProperties; [k: string]: any }> = ({ children, sx, ...p }) => (
  <div style={{ padding: 20, ...sx }} {...p}>{children}</div>
);

export const CardHeader: React.FC<{
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  sx?: React.CSSProperties;
}> = ({ title, subheader, avatar, action, sx }) => {
  const t = useTokens();
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '16px 20px 0', ...sx }}>
      {avatar}
      <div style={{ flex: 1 }}>
        {title && <div style={{ ...typographyVariants.h6, color: t.text.primary }}>{title}</div>}
        {subheader && <div style={{ ...typographyVariants.body2, color: t.text.secondary, marginTop: 2 }}>{subheader}</div>}
      </div>
      {action}
    </div>
  );
};

export const CardActions: React.FC<{ children?: React.ReactNode; sx?: React.CSSProperties }> = ({ children, sx }) => (
  <div style={{ display: 'flex', gap: 8, padding: '8px 16px 16px', alignItems: 'center', ...sx }}>{children}</div>
);
