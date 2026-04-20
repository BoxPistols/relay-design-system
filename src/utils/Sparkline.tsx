import React from 'react';
import { useTokens } from '../theme';

export type SparklineProps = {
  data: number[];
  color?: string;
  height?: number;
  showDots?: boolean;
  gradientId?: string;
};

/** 依存ゼロのSVGスパークライン。本番では recharts/visx に置換可能。 */
export const Sparkline: React.FC<SparklineProps> = ({
  data, color, height = 180, showDots = true, gradientId = 'sp-grad',
}) => {
  const t = useTokens();
  const c = color || t.brand.main;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * 460 + 10,
    height - 20 - ((v - min) / range) * (height - 40),
  ]);
  const d = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ');
  const area = d + ` L ${pts[pts.length - 1][0]},${height - 10} L ${pts[0][0]},${height - 10} Z`;
  return (
    <svg viewBox={`0 0 480 ${height}`} width="100%" height={height} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"  stopColor={c} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={c} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`}/>
      <path d={d} fill="none" stroke={c} strokeWidth="2"/>
      {showDots && pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={t.bg.surface} stroke={c} strokeWidth="2"/>
      ))}
    </svg>
  );
};
