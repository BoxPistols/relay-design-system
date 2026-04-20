import React, { useState } from 'react';
import { useTokens } from '../../theme';
import { Check } from '../../icons';

export type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: { target: { checked: boolean } }) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'success' | 'error';
  sx?: React.CSSProperties;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked, defaultChecked, onChange, disabled, size = 'medium', color = 'primary', sx,
}) => {
  const t = useTokens();
  const [internal, setInternal] = useState(defaultChecked ?? false);
  const val = checked !== undefined ? checked : internal;
  const cMap: Record<string, string> = {
    primary: t.brand.main, secondary: t.accent.main,
    success: t.success.main, error: t.danger.main,
  };
  const s = size === 'small' ? 16 : 20;
  return (
    <button disabled={disabled} onClick={() => {
      setInternal(!val); onChange?.({ target: { checked: !val } });
    }}
      style={{
        width: s + 10, height: s + 10, border: 'none', background: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 4, opacity: disabled ? 0.5 : 1, ...sx,
      }}>
      <span style={{
        width: s, height: s, borderRadius: 4,
        border: `2px solid ${val ? cMap[color] : t.border.strong}`,
        backgroundColor: val ? cMap[color] : 'transparent',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s',
      }}>
        {val && <Check fontSize="small" sx={{ color: t.text.onBrand, width: s - 4, height: s - 4 }} strokeWidth={3}/>}
      </span>
    </button>
  );
};
