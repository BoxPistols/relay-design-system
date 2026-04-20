import React, { useState, useEffect, useRef } from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';
import { ArrowDown } from '../../icons';

export type SelectProps = {
  value?: any;
  defaultValue?: any;
  onChange?: (e: { target: { value: any } }) => void;
  label?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
};

export const Select: React.FC<SelectProps> = ({
  value, defaultValue, onChange, children, label, size = 'small', fullWidth, sx,
}) => {
  const t = useTokens();
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue ?? '');
  const val = value !== undefined ? value : internal;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const opts = React.Children.toArray(children) as React.ReactElement[];
  const selected = opts.find((o) => (o.props as any).value === val);

  return (
    <div ref={ref} style={{ position: 'relative', width: fullWidth ? '100%' : 'auto', ...sx }}>
      <button onClick={() => setOpen(!open)}
        style={{
          width: '100%', height: size === 'small' ? 38 : 48, padding: '0 12px',
          border: `1px solid ${open ? t.brand.main : t.border.default}`,
          borderRadius: 8, backgroundColor: t.bg.surface, color: t.text.primary,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 14, fontFamily: fonts.sans, textAlign: 'left',
        }}>
        <span style={{ color: selected ? t.text.primary : t.text.muted }}>
          {(selected?.props as any)?.children || label || '選択'}
        </span>
        <ArrowDown fontSize="small" sx={{
          color: t.text.muted,
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s',
        }} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 1000,
          backgroundColor: t.bg.surface, border: `1px solid ${t.border.subtle}`,
          borderRadius: 8, boxShadow: t.shadow.md,
          maxHeight: 280, overflow: 'auto', padding: 4,
        }}>
          {opts.map((o, i) => (
            <div key={i} onClick={() => {
              const v = (o.props as any).value;
              setInternal(v); onChange?.({ target: { value: v } }); setOpen(false);
            }}
              style={{
                padding: '8px 10px', borderRadius: 6, fontSize: 14, cursor: 'pointer',
                backgroundColor: val === (o.props as any).value ? t.brand.soft : 'transparent',
                color: val === (o.props as any).value ? t.brand.main : t.text.primary,
              }}>
              {(o.props as any).children}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
