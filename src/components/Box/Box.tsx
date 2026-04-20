import React from 'react';

export type BoxProps = {
  component?: keyof JSX.IntrinsicElements;
  sx?: React.CSSProperties;
  children?: React.ReactNode;
  [k: string]: any;
};

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ component: C = 'div', sx, style, children, ...p }, ref) => {
    const Comp = C as any;
    return <Comp ref={ref} style={{ ...sx, ...style }} {...p}>{children}</Comp>;
  }
);
Box.displayName = 'Box';
