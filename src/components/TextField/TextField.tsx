import React, { useState } from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';

export type TextFieldProps = {
  label?: string;
  placeholder?: string;
  value?: any;
  defaultValue?: any;
  onChange?: (e: React.ChangeEvent<any>) => void;
  type?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  /**
   * MUI v9: slotProps.input / slotProps.inputLabel / slotProps.formHelperText
   */
  slotProps?: {
    input?: { startAdornment?: React.ReactNode; endAdornment?: React.ReactNode; [k: string]: any };
    inputLabel?: { sx?: React.CSSProperties };
    formHelperText?: { sx?: React.CSSProperties };
    htmlInput?: { [k: string]: any };
  };
  sx?: React.CSSProperties;
  [k: string]: any;
};

export const TextField: React.FC<TextFieldProps> = ({
  label, placeholder, value, defaultValue, onChange, type = 'text',
  variant = 'outlined', size = 'small', fullWidth, disabled, error, helperText, required,
  multiline, rows = 3, slotProps = {}, sx, ...p
}) => {
  const t = useTokens();
  const [focus, setFocus] = useState(false);
  const [internal, setInternal] = useState(defaultValue ?? '');
  const val = value !== undefined ? value : internal;
  const hasValue = val !== '' && val !== undefined;
  const borderColor = error ? t.danger.main : focus ? t.brand.main : t.border.default;

  const InputEl: any = multiline ? 'textarea' : 'input';
  const inputProps = slotProps.input || {};
  const { startAdornment, endAdornment, ...restInputProps } = inputProps;

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto', ...sx }}>
      <div style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        border: `1px solid ${borderColor}`, borderRadius: 8,
        backgroundColor: disabled ? t.bg.sunken : t.bg.surface,
        transition: 'border-color 0.15s',
        padding: startAdornment || endAdornment ? '0 10px' : 0,
      }}>
        {startAdornment && <span style={{ color: t.text.muted, display: 'inline-flex', marginRight: 6 }}>{startAdornment}</span>}
        {label && (
          <label style={{
            position: 'absolute',
            left: startAdornment ? 36 : 12,
            top: focus || hasValue ? -7 : size === 'small' ? 8 : 12,
            fontSize: focus || hasValue ? 11 : 13,
            color: error ? t.danger.main : focus ? t.brand.main : t.text.muted,
            backgroundColor: t.bg.surface, padding: '0 4px',
            transition: 'all 0.15s', pointerEvents: 'none', fontFamily: fonts.sans,
            ...(slotProps.inputLabel?.sx || {}),
          }}>
            {label}{required && ' *'}
          </label>
        )}
        <InputEl
          type={type} value={val}
          onChange={(e: any) => { setInternal(e.target.value); onChange?.(e); }}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          placeholder={focus ? placeholder : undefined}
          disabled={disabled} rows={multiline ? rows : undefined}
          style={{
            flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent',
            padding: size === 'small' ? '8px 12px' : '12px 14px', fontSize: 14,
            color: t.text.primary, fontFamily: fonts.sans,
            resize: multiline ? 'vertical' : undefined,
            minHeight: multiline ? rows * 20 : undefined,
          }}
          {...restInputProps} {...(slotProps.htmlInput || {})} {...p}
        />
        {endAdornment && <span style={{ color: t.text.muted, display: 'inline-flex', marginLeft: 6 }}>{endAdornment}</span>}
      </div>
      {helperText && (
        <div style={{
          fontSize: 12, color: error ? t.danger.main : t.text.muted,
          marginTop: 4, padding: '0 4px',
          ...(slotProps.formHelperText?.sx || {}),
        }}>{helperText}</div>
      )}
    </div>
  );
};
