import React from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';

export type ToggleButtonGroupProps = {
  value: any;
  onChange?: (e: any, v: any) => void;
  exclusive?: boolean;
  size?: 'small' | 'medium';
  children?: React.ReactNode;
  sx?: React.CSSProperties;
};

export const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  value, onChange, exclusive, size = 'medium', children, sx,
}) => {
  const t = useTokens();
  const items = React.Children.toArray(children) as React.ReactElement[];
  return (
    <div style={{
      display: 'inline-flex', border: `1px solid ${t.border.default}`,
      borderRadius: 8, overflow: 'hidden', ...sx,
    }}>
      {items.map((it, i) => {
        const itValue = (it.props as any).value;
        const active = exclusive ? value === itValue : Array.isArray(value) && value.includes(itValue);
        return React.cloneElement(it, {
          key: i, selected: active, size,
          onClick: () => {
            if (exclusive) onChange?.(null, value === itValue ? null : itValue);
            else {
              const n = Array.isArray(value) && value.includes(itValue)
                ? value.filter((v: any) => v !== itValue)
                : [...(Array.isArray(value) ? value : []), itValue];
              onChange?.(null, n);
            }
          },
          isFirst: i === 0, isLast: i === items.length - 1,
        } as any);
      })}
    </div>
  );
};

export type ToggleButtonProps = {
  value: any;
  selected?: boolean;
  children?: React.ReactNode;
  size?: 'small' | 'medium';
  onClick?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  selected, children, size = 'medium', onClick, isLast,
}) => {
  const t = useTokens();
  return (
    <button onClick={onClick} style={{
      padding: size === 'small' ? '4px 10px' : '8px 14px',
      border: 'none', cursor: 'pointer',
      backgroundColor: selected ? t.brand.soft : t.bg.surface,
      color: selected ? t.brand.main : t.text.secondary,
      fontSize: size === 'small' ? 12 : 13, fontWeight: 500, fontFamily: fonts.sans,
      transition: 'all 0.15s',
      borderRight: !isLast ? `1px solid ${t.border.subtle}` : 'none',
    }}>{children}</button>
  );
};
