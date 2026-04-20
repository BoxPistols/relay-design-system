import React from 'react';
import { useTokens } from '../../theme';
import { Avatar } from '../Avatar';

export type AvatarGroupProps = {
  max?: number;
  spacing?: number;
  children?: React.ReactNode;
};

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ max = 4, spacing = -8, children }) => {
  const t = useTokens();
  const arr = React.Children.toArray(children) as React.ReactElement[];
  const visible = arr.slice(0, max);
  const hidden = arr.length - visible.length;
  return (
    <div style={{ display: 'inline-flex' }}>
      {visible.map((child, i) => React.cloneElement(child, {
        key: i,
        sx: { marginLeft: i === 0 ? 0 : spacing, border: `2px solid ${t.bg.surface}`, ...(child.props as any).sx },
      } as any))}
      {hidden > 0 && (
        <Avatar size={40} sx={{
          marginLeft: spacing, border: `2px solid ${t.bg.surface}`,
          backgroundColor: t.bg.sunken, color: t.text.secondary,
        }}>+{hidden}</Avatar>
      )}
    </div>
  );
};
