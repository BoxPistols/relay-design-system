import React from 'react';

export type FormControlProps = {
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
};

export const FormControl: React.FC<FormControlProps> = ({ fullWidth, children, sx }) => (
  <div style={{ width: fullWidth ? '100%' : 'auto', ...sx }}>{children}</div>
);

export const InputLabel: React.FC<{ children?: React.ReactNode }> = () => null;
