import React from 'react';
import { useTokens } from '../../theme';
import { variantsMatcher } from '../../utils';
import { fonts } from '../../tokens';
import { Close } from '../../icons';

export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export type ChipProps = {
  label?: React.ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: 'small' | 'medium';
  icon?: React.ReactElement;
  onDelete?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  sx?: React.CSSProperties;
};

export const Chip: React.FC<ChipProps> = ({
  label, variant = 'filled', color = 'default', size = 'medium',
  icon, onDelete, onClick, sx,
}) => {
  const t = useTokens();
  const colorMap: Record<string, any> = {
    default: null, primary: t.brand, secondary: t.accent,
    success: t.success, warning: t.warning, error: t.danger, info: t.info,
  };
  const c = colorMap[color];
  const rootStyle = variantsMatcher<{ variant: ChipVariant; color: ChipColor; size: string }>([
    { props: { size: 'small' },  style: { height: 22, fontSize: '0.75rem', padding: '0 8px' } },
    { props: { size: 'medium' }, style: { height: 28, fontSize: '0.8125rem', padding: '0 10px' } },
    { props: { variant: 'filled', color: 'default' },
      style: { backgroundColor: t.bg.sunken, color: t.text.primary } },
    { props: { variant: 'outlined' },
      style: { backgroundColor: 'transparent',
        border: `1px solid ${c ? c.main : t.border.default}`,
        color: c ? c.main : t.text.secondary } },
    { props: { variant: 'filled', color: (v: any) => v !== 'default' },
      style: c ? { backgroundColor: c.soft, color: c.main } : {} },
  ], { variant, color, size });
  return (
    <div onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6,
      fontWeight: 500, fontFamily: fonts.sans,
      cursor: onClick ? 'pointer' : 'default', ...rootStyle, ...sx,
    }}>
      {icon && React.cloneElement(icon, { fontSize: 'small', sx: { width: size === 'small' ? 12 : 14, height: size === 'small' ? 12 : 14 } } as any)}
      <span>{label}</span>
      {onDelete && (
        <button onClick={(e) => { e.stopPropagation(); onDelete(e); }} style={{
          display: 'inline-flex', padding: 2, border: 'none', background: 'transparent',
          cursor: 'pointer', color: 'inherit', borderRadius: '50%', opacity: 0.7,
        }}>
          <Close fontSize="small" sx={{ width: 12, height: 12 }}/>
        </button>
      )}
    </div>
  );
};
