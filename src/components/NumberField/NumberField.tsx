import React, { useState } from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';
import { Typography } from '../Typography';

/**
 * ★ MUI v9 新規コンポーネント: NumberField (Base UI ベース)
 *
 * numeric input 専用プリミティブ。本番移行時は:
 *   import { NumberField } from '@mui/material/NumberField';
 * に置き換え可能。
 *
 * - キーボード (↑↓ / PgUp / PgDn)
 * - マウスホイールでインクリメント
 * - `format` prop で Intl.NumberFormat による表示整形 (locale / currency / percent)
 * - インクリメント/デクリメントボタン内蔵
 */
export type NumberFieldProps = {
  value?: number;
  defaultValue?: number;
  onValueChange?: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  size?: 'small' | 'medium';
  format?: Intl.NumberFormatOptions;
  locale?: string;
  slotProps?: { input?: { [k: string]: any } };
  sx?: React.CSSProperties;
};

export const NumberField: React.FC<NumberFieldProps> = ({
  value, defaultValue = 0, onValueChange,
  min, max, step = 1,
  label, disabled, size = 'small', format, locale, slotProps = {}, sx,
}) => {
  const t = useTokens();
  const [internal, setInternal] = useState(defaultValue);
  const val = value !== undefined ? value : internal;
  const [focus, setFocus] = useState(false);

  const formatNum = (n: number) => {
    if (format) return new Intl.NumberFormat(locale || 'ja-JP', format).format(n);
    return String(n);
  };

  const update = (n: number) => {
    const clamped = Math.max(min ?? -Infinity, Math.min(max ?? Infinity, n));
    setInternal(clamped);
    onValueChange?.(clamped);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp')   { e.preventDefault(); update(val + step); }
    if (e.key === 'ArrowDown') { e.preventDefault(); update(val - step); }
    if (e.key === 'PageUp')    { e.preventDefault(); update(val + step * 10); }
    if (e.key === 'PageDown')  { e.preventDefault(); update(val - step * 10); }
  };

  const borderColor = focus ? t.brand.main : t.border.default;

  return (
    <div style={{ width: '100%', ...sx }}>
      {label && (
        <Typography variant="caption" color="secondary" sx={{ display: 'block', marginBottom: 4 }}>
          {label}
        </Typography>
      )}
      <div style={{
        display: 'flex', alignItems: 'stretch',
        border: `1px solid ${borderColor}`, borderRadius: 8,
        backgroundColor: disabled ? t.bg.sunken : t.bg.surface,
        transition: 'border-color 0.15s', overflow: 'hidden',
      }}>
        <button onClick={() => update(val - step)} disabled={disabled || val <= (min ?? -Infinity)}
          aria-label="decrement"
          style={{
            width: size === 'small' ? 32 : 40, border: 'none',
            borderRight: `1px solid ${t.border.subtle}`,
            background: 'transparent', cursor: disabled ? 'not-allowed' : 'pointer',
            color: t.text.secondary,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>−</button>
        <input
          type="text" value={focus ? String(val) : formatNum(val)}
          onChange={(e) => {
            const n = Number(e.target.value.replace(/[^\d.-]/g, ''));
            if (!Number.isNaN(n)) update(n);
          }}
          onKeyDown={handleKey}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          onWheel={(e) => {
            if (focus) { e.preventDefault(); update(val + (e.deltaY < 0 ? step : -step)); }
          }}
          disabled={disabled}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent', textAlign: 'center',
            padding: size === 'small' ? '8px 4px' : '12px 4px', fontSize: 14, color: t.text.primary,
            fontFamily: fonts.mono, minWidth: 0,
          }}
          {...(slotProps.input || {})}
        />
        <button onClick={() => update(val + step)} disabled={disabled || val >= (max ?? Infinity)}
          aria-label="increment"
          style={{
            width: size === 'small' ? 32 : 40, border: 'none',
            borderLeft: `1px solid ${t.border.subtle}`,
            background: 'transparent', cursor: disabled ? 'not-allowed' : 'pointer',
            color: t.text.secondary,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>＋</button>
      </div>
    </div>
  );
};
