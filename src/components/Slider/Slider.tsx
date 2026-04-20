import React, { useState } from 'react';
import { useTokens } from '../../theme';

export type SliderProps = {
  value?: number;
  defaultValue?: number;
  onChange?: (e: any, v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  sx?: React.CSSProperties;
};

export const Slider: React.FC<SliderProps> = ({
  value, defaultValue = 0, onChange, min = 0, max = 100, step = 1,
  size = 'medium', color = 'primary', disabled, sx,
}) => {
  const t = useTokens();
  const [internal, setInternal] = useState(defaultValue);
  const val = value !== undefined ? value : internal;
  const cMap: Record<string, string> = { primary: t.brand.main, secondary: t.accent.main };
  const pct = ((val - min) / (max - min)) * 100;
  return (
    <div style={{ padding: '8px 0', width: '100%', ...sx }}>
      <div style={{ position: 'relative', height: size === 'small' ? 4 : 6, backgroundColor: t.border.default, borderRadius: 3 }}>
        <div style={{ position: 'absolute', height: '100%', width: `${pct}%`, backgroundColor: cMap[color], borderRadius: 3 }}/>
        <input type="range" min={min} max={max} step={step} value={val} disabled={disabled}
          onChange={(e) => { const v = Number(e.target.value); setInternal(v); onChange?.(e, v); }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}/>
        <div style={{
          position: 'absolute', left: `${pct}%`, top: '50%',
          transform: 'translate(-50%, -50%)',
          width: size === 'small' ? 14 : 18, height: size === 'small' ? 14 : 18,
          borderRadius: '50%', backgroundColor: cMap[color],
          border: `2px solid ${t.bg.surface}`, boxShadow: t.shadow.sm, pointerEvents: 'none',
        }}/>
      </div>
    </div>
  );
};
