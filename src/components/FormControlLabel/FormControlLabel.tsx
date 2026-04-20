import React from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';

export type FormControlLabelProps = {
  control: React.ReactElement;
  label: React.ReactNode;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  disabled?: boolean;
  sx?: React.CSSProperties;
};

export const FormControlLabel: React.FC<FormControlLabelProps> = ({
  control, label, labelPlacement = 'end', disabled, sx,
}) => {
  const t = useTokens();
  const dir =
    labelPlacement === 'start' ? 'row-reverse' :
    labelPlacement === 'top' ? 'column-reverse' :
    labelPlacement === 'bottom' ? 'column' : 'row';
  return (
    <label style={{
      display: 'inline-flex', flexDirection: dir as any, alignItems: 'center', gap: 6,
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: disabled ? t.text.disabled : t.text.primary,
      fontSize: 14, fontFamily: fonts.sans, ...sx,
    }}>
      {control}
      <span>{label}</span>
    </label>
  );
};
