import React, { useState } from 'react';
import { useTokens } from '../../theme';

export type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: { target: { checked: boolean } }) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'success';
  sx?: React.CSSProperties;
};

export const Switch: React.FC<SwitchProps> = ({
  checked, defaultChecked, onChange, disabled, size = 'medium', color = 'primary', sx,
}) => {
  const t = useTokens();
  const [internal, setInternal] = useState(defaultChecked ?? false);
  const val = checked !== undefined ? checked : internal;
  const cMap: Record<string, string> = {
    primary: t.brand.main, secondary: t.accent.main, success: t.success.main,
  };
  const w = size === 'small' ? 32 : 40, h = size === 'small' ? 18 : 22, thumb = size === 'small' ? 14 : 18;
  return (
    <button disabled={disabled} onClick={() => {
      setInternal(!val); onChange?.({ target: { checked: !val } });
    }}
      style={{
        width: w, height: h, borderRadius: h, padding: 2, border: 'none',
        backgroundColor: val ? cMap[color] : t.border.default,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s', position: 'relative',
        opacity: disabled ? 0.5 : 1, ...sx,
      }}>
      <span style={{
        display: 'block', width: thumb, height: thumb, borderRadius: '50%',
        backgroundColor: '#fff',
        transform: val ? `translateX(${w - thumb - 4}px)` : 'translateX(0)',
        transition: 'transform 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }} />
    </button>
  );
};
