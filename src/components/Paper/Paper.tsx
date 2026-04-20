import React from 'react';
import { useTokens } from '../../theme';
import { variantsMatcher } from '../../utils';

export type PaperProps = {
  elevation?: number;
  variant?: 'elevation' | 'outlined';
  square?: boolean;
  sx?: React.CSSProperties;
  children?: React.ReactNode;
  [k: string]: any;
};

export const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  ({ elevation = 1, variant = 'elevation', square, sx, children, ...p }, ref) => {
    const t = useTokens();
    const style = variantsMatcher<{ variant: string; elevation: number }>([
      { props: { variant: 'outlined' }, style: { border: `1px solid ${t.border.subtle}`, boxShadow: 'none' } },
      { props: { variant: 'elevation', elevation: (e: number) => e === 0 }, style: { boxShadow: 'none', border: `1px solid ${t.border.subtle}` } },
      { props: { variant: 'elevation', elevation: (e: number) => e >= 1 && e < 4 }, style: { boxShadow: t.shadow.sm } },
      { props: { variant: 'elevation', elevation: (e: number) => e >= 4 }, style: { boxShadow: t.shadow.md } },
    ], { variant, elevation });
    return (
      <div ref={ref} style={{
        backgroundColor: t.bg.surface, borderRadius: square ? 0 : 10,
        color: t.text.primary, ...style, ...sx,
      }} {...p}>{children}</div>
    );
  }
);
Paper.displayName = 'Paper';
