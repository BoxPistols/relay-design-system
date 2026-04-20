import React from 'react';
import { useTokens } from '../../theme';

export type RadioProps = {
  checked?: boolean;
  onChange?: (e: { target: { value: any } }) => void;
  value?: any;
  name?: string;
  disabled?: boolean;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary';
  sx?: React.CSSProperties;
};

export const Radio: React.FC<RadioProps> = ({
  checked, onChange, value, disabled, size = 'medium', color = 'primary', sx,
}) => {
  const t = useTokens();
  const cMap: Record<string, string> = { primary: t.brand.main, secondary: t.accent.main };
  const s = size === 'small' ? 16 : 20;
  return (
    <button disabled={disabled} onClick={() => onChange?.({ target: { value } })}
      style={{
        width: s + 10, height: s + 10, border: 'none', background: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '50%', opacity: disabled ? 0.5 : 1, ...sx,
      }}>
      <span style={{
        width: s, height: s, borderRadius: '50%',
        border: `2px solid ${checked ? cMap[color] : t.border.strong}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <span style={{ width: s / 2, height: s / 2, borderRadius: '50%', backgroundColor: cMap[color] }} />}
      </span>
    </button>
  );
};
