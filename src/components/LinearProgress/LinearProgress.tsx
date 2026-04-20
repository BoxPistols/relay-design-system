import React from 'react';
import { useTokens } from '../../theme';

export type LinearProgressProps = {
  variant?: 'indeterminate' | 'determinate';
  value?: number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  sx?: React.CSSProperties;
};

export const LinearProgress: React.FC<LinearProgressProps> = ({
  variant = 'indeterminate', value = 0, color = 'primary', sx,
}) => {
  const t = useTokens();
  const cMap: Record<string, string> = {
    primary: t.brand.main, secondary: t.accent.main, success: t.success.main,
    warning: t.warning.main, error: t.danger.main,
  };
  return (
    <div style={{
      position: 'relative', height: 4, width: '100%',
      backgroundColor: t.border.subtle, borderRadius: 2, overflow: 'hidden', ...sx,
    }}>
      {variant === 'determinate' ? (
        <div style={{
          height: '100%', width: `${value}%`,
          backgroundColor: cMap[color], transition: 'width 0.3s',
        }}/>
      ) : (
        <div style={{
          position: 'absolute', height: '100%', width: '30%',
          backgroundColor: cMap[color],
          animation: 'mui-linear-indeterminate 2s cubic-bezier(.4,0,.2,1) infinite',
        }}/>
      )}
      <style>{`@keyframes mui-linear-indeterminate { 0% { left: -30%; } 100% { left: 100%; } }`}</style>
    </div>
  );
};
