import React from 'react';

export type StackProps = {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  spacing?: number;
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
  flexWrap?: React.CSSProperties['flexWrap'];
  useFlexGap?: boolean;
  sx?: React.CSSProperties;
  children?: React.ReactNode;
  [k: string]: any;
};

export const Stack: React.FC<StackProps> = ({
  direction = 'column', spacing = 0, alignItems, justifyContent, flexWrap, sx, children, ...p
}) => (
  <div style={{
    display: 'flex', flexDirection: direction,
    gap: spacing * 8, alignItems, justifyContent, flexWrap,
    ...sx,
  }} {...p}>{children}</div>
);
