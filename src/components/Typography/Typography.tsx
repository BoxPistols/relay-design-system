import React from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';

export type TypographyVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2' | 'body1' | 'body2'
  | 'caption' | 'overline' | 'button';

export type TypographyColor =
  | 'primary' | 'secondary' | 'disabled' | 'brand' | 'danger' | 'success' | 'warning'
  | 'text.primary' | 'text.secondary' | 'text.muted' | 'inherit' | string;

export type TypographyProps = {
  variant?: TypographyVariant;
  color?: TypographyColor;
  component?: keyof JSX.IntrinsicElements;
  gutterBottom?: boolean;
  noWrap?: boolean;
  align?: 'left' | 'right' | 'center' | 'justify';
  sx?: React.CSSProperties;
  children?: React.ReactNode;
  [k: string]: any;
};

export const typographyVariants: Record<TypographyVariant, React.CSSProperties> = {
  h1: { fontFamily: fonts.display, fontSize: '3.5rem', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 },
  h2: { fontFamily: fonts.display, fontSize: '2.5rem', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 },
  h3: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.015em', margin: 0 },
  h4: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.25, margin: 0 },
  h5: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3, margin: 0 },
  h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.4, margin: 0 },
  subtitle1: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.5, margin: 0 },
  subtitle2: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5, margin: 0 },
  body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.65, margin: 0 },
  body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6, margin: 0 },
  caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.5, margin: 0 },
  overline: { fontSize: '0.6875rem', fontWeight: 600, lineHeight: 1.4, letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 },
  button: { fontSize: '0.875rem', fontWeight: 500, letterSpacing: 0, textTransform: 'none', margin: 0 },
};

const defaultComponents: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1:'h1', h2:'h2', h3:'h3', h4:'h4', h5:'h5', h6:'h6',
  subtitle1:'h6', subtitle2:'h6', body1:'p', body2:'p',
  caption:'span', overline:'span', button:'span',
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1', color = 'primary', component, gutterBottom, align, noWrap, children, sx, ...p
}) => {
  const t = useTokens();
  const Comp: any = component || defaultComponents[variant] || 'p';
  const colorMap: Record<string, string> = {
    primary: t.text.primary,
    secondary: t.text.secondary,
    disabled: t.text.disabled,
    brand: t.brand.main,
    danger: t.danger.main,
    success: t.success.main,
    warning: t.warning.main,
    'text.primary': t.text.primary,
    'text.secondary': t.text.secondary,
    'text.muted': t.text.muted,
    inherit: 'inherit',
  };
  return (
    <Comp style={{
      color: colorMap[color as string] || color,
      marginBottom: gutterBottom ? '0.35em' : 0,
      textAlign: align,
      whiteSpace: noWrap ? 'nowrap' : undefined,
      overflow: noWrap ? 'hidden' : undefined,
      textOverflow: noWrap ? 'ellipsis' : undefined,
      ...typographyVariants[variant],
      ...sx,
    }} {...p}>{children}</Comp>
  );
};
