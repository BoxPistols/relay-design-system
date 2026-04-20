import React from 'react';
import { useTokens } from '../../theme';
import { variantsMatcher } from '../../utils';

export type AvatarProps = {
  src?: string;
  alt?: string;
  variant?: 'circular' | 'rounded' | 'square';
  size?: number;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
  [k: string]: any;
};

export const Avatar: React.FC<AvatarProps> = ({ src, alt, children, variant = 'circular', size = 40, sx, ...p }) => {
  const t = useTokens();
  const rootStyle = variantsMatcher<{ variant: string }>([
    { props: { variant: 'circular' }, style: { borderRadius: '50%' } },
    { props: { variant: 'rounded' }, style: { borderRadius: 8 } },
    { props: { variant: 'square' }, style: { borderRadius: 0 } },
  ], { variant });
  return (
    <div style={{
      width: size, height: size,
      backgroundColor: t.accent.soft, color: t.accent.main,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.4, fontWeight: 600, overflow: 'hidden',
      ...rootStyle, ...sx,
    }} {...p}>
      {src ? <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : children}
    </div>
  );
};
