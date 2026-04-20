import React from 'react';
import { useTokens } from '../../theme';

export type SkeletonProps = {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  sx?: React.CSSProperties;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text', width, height, sx,
}) => {
  const t = useTokens();
  const defaultH = variant === 'text' ? '1em' : variant === 'circular' ? 40 : 120;
  return (
    <div style={{
      width: width || '100%', height: height || defaultH,
      backgroundColor: t.bg.sunken,
      borderRadius: variant === 'circular' ? '50%' : 4,
      animation: 'mui-skeleton-pulse 1.5s ease-in-out infinite', ...sx,
    }}>
      <style>{`@keyframes mui-skeleton-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
    </div>
  );
};
