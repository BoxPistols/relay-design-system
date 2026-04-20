import React, { useState } from 'react';
import { useTokens } from '../../theme';
import { variantsMatcher } from '../../utils';

export type IconButtonProps = {
  size?: 'small' | 'medium' | 'large';
  color?: 'default' | 'primary' | 'secondary' | 'inherit';
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  sx?: React.CSSProperties;
  [k: string]: any;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'medium', color = 'default', disabled, children, sx, ...p }, ref) => {
    const t = useTokens();
    const [hover, setHover] = useState(false);
    const rootStyle = variantsMatcher<{ size: string }>([
      { props: { size: 'small' },  style: { width: 32, height: 32 } },
      { props: { size: 'medium' }, style: { width: 40, height: 40 } },
      { props: { size: 'large' },  style: { width: 48, height: 48 } },
    ], { size });
    return (
      <button ref={ref} disabled={disabled}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50%', border: 'none',
          background: hover && !disabled ? t.bg.sunken : 'transparent',
          cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
          color: color === 'primary' ? t.brand.main : color === 'inherit' ? 'inherit' : t.text.secondary,
          transition: 'background 0.15s', ...rootStyle, ...sx,
        }} {...p}>{children}</button>
    );
  }
);
IconButton.displayName = 'IconButton';
