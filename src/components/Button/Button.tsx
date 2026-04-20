import React, { useState } from 'react';
import { useTokens } from '../../theme';
import { variantsMatcher } from '../../utils';
import { typographyVariants } from '../Typography/Typography';
import { fonts } from '../../tokens';

export type ButtonVariant = 'text' | 'outlined' | 'contained';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'inherit';
export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  component?: React.ElementType;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  sx?: React.CSSProperties;
  [k: string]: any;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'text', color = 'primary', size = 'medium',
  disabled, fullWidth, startIcon, endIcon, children, onClick, sx,
  component: C = 'button', ...p
}, ref) => {
  const t = useTokens();
  const [hover, setHover] = useState(false);

  const colorMap: Record<string, any> = {
    primary: t.brand, secondary: t.accent, success: t.success, warning: t.warning,
    error: t.danger, info: t.info, inherit: { main: 'inherit', hover: 'inherit', soft: 'inherit' },
  };
  const c = colorMap[color] || colorMap.primary;

  // ★ MUI v9: styleOverrides.root.variants と同じセマンティクス
  const rootStyle = variantsMatcher<{ variant: ButtonVariant; size: ButtonSize; color: ButtonColor }>([
    { props: { size: 'small' },  style: { height: 32, fontSize: '0.8125rem', padding: '0 12px' } },
    { props: { size: 'medium' }, style: { height: 40, fontSize: '0.875rem', padding: '0 16px' } },
    { props: { size: 'large' },  style: { height: 48, fontSize: '0.9375rem', padding: '0 22px' } },
    {
      props: { variant: 'contained' },
      style: {
        backgroundColor: hover ? c.hover || c.dark : c.main,
        color: t.text.onBrand, border: 'none',
      },
    },
    {
      props: { variant: 'outlined' },
      style: {
        backgroundColor: hover ? t.bg.sunken : 'transparent',
        color: color === 'primary' ? t.text.primary : c.main,
        border: `1px solid ${color === 'primary' ? t.border.default : c.main}`,
      },
    },
    {
      props: { variant: 'text' },
      style: {
        backgroundColor: hover ? t.bg.sunken : 'transparent',
        color: color === 'primary' ? t.text.primary : c.main, border: 'none',
      },
    },
  ], { variant, size, color });

  const Comp = C as any;
  return (
    <Comp ref={ref} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        ...typographyVariants.button,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 8, borderRadius: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.15s ease', fontFamily: fonts.sans, userSelect: 'none',
        ...rootStyle, ...sx,
      }} {...p}>
      {startIcon && React.cloneElement(startIcon, { fontSize: 'small' } as any)}
      {children}
      {endIcon && React.cloneElement(endIcon, { fontSize: 'small' } as any)}
    </Comp>
  );
});
Button.displayName = 'Button';
