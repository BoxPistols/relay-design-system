import React from 'react';

export type MenuItemProps = {
  value?: any;
  children?: React.ReactNode;
  [k: string]: any;
};

export const MenuItem: React.FC<MenuItemProps> = ({ value, children, ...p }) => (
  <div data-value={value} {...p}>{children}</div>
);
