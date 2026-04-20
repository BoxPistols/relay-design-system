import React from 'react';
import { useTokens } from '../../theme';

export type CircularProgressProps = {
  size?: number;
  thickness?: number;
  color?: 'primary' | 'secondary';
  variant?: 'indeterminate' | 'determinate';
  value?: number;
  sx?: React.CSSProperties;
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 40, thickness = 3.6, color = 'primary', variant = 'indeterminate', value = 0, sx,
}) => {
  const t = useTokens();
  const cMap: Record<string, string> = { primary: t.brand.main, secondary: t.accent.main };
  const r = (size - thickness) / 2, circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ ...sx }}>
      <circle cx={size/2} cy={size/2} r={r} stroke={t.border.subtle} strokeWidth={thickness} fill="none" />
      {variant === 'determinate' ? (
        <circle cx={size/2} cy={size/2} r={r}
          stroke={cMap[color]} strokeWidth={thickness} fill="none"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - value / 100)}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.3s' }}/>
      ) : (
        <circle cx={size/2} cy={size/2} r={r}
          stroke={cMap[color]} strokeWidth={thickness} fill="none"
          strokeDasharray={`${circ * 0.3} ${circ * 0.7}`} strokeLinecap="round"
          style={{ transformOrigin: 'center', animation: 'mui-circ-rot 1.4s linear infinite' }}/>
      )}
      <style>{`@keyframes mui-circ-rot { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
};
