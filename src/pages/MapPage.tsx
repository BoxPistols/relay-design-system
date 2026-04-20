import React, { useState } from 'react';
import {
  Typography, Stack, Button, IconButton, TextField, Paper,
} from '../components';
import { useTheme, useTokens } from '../theme';
import { fonts, primitive } from '../tokens';
import * as Icons from '../icons';

export const MapPage: React.FC = () => {
  const t = useTokens();
  const { mode } = useTheme();
  const [selected, setSelected] = useState(2);

  // 配達員の現在位置 (ピン)
  const pins = [
    { id: 1, x: 32, y: 42, label: 'RDR-0042', status: 'active' },
    { id: 2, x: 58, y: 28, label: 'RDR-0118', status: 'active' },
    { id: 3, x: 72, y: 58, label: 'RDR-0312', status: 'warning' },
    { id: 4, x: 45, y: 72, label: 'RDR-0277', status: 'idle' },
  ];
  const pinColor = (s: string) => s === 'active' ? t.brand.main : s === 'warning' ? t.warning.main : t.text.muted;

  const isDark = mode === 'dark';
  const mapBg = isDark ? primitive.gray[900] : '#e8efea';
  const landColor = isDark ? primitive.gray[800] : '#f3f7f1';
  const waterColor = isDark ? '#0a1524' : '#cfe2ea';
  const roadColor = isDark ? primitive.gray[700] : '#ffffff';
  const roadMinor = isDark ? primitive.gray[800] : '#e4e9ef';

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 50px)', overflow: 'hidden', backgroundColor: mapBg }}>
      <svg viewBox="0 0 1000 700" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        <rect width="1000" height="700" fill={landColor}/>
        <path d="M 600 0 Q 700 150 680 300 Q 720 450 800 550 L 1000 600 L 1000 0 Z" fill={waterColor}/>
        <path d="M 0 550 Q 100 500 200 560 Q 300 600 400 570 L 400 700 L 0 700 Z" fill={waterColor}/>
        <circle cx="280" cy="380" r="55" fill={isDark ? primitive.teal[900] : '#dbead0'} opacity="0.6"/>
        <circle cx="450" cy="200" r="40" fill={isDark ? primitive.teal[900] : '#dbead0'} opacity="0.6"/>
        <path d="M 0 350 Q 300 330 500 380 T 1000 340" stroke={roadColor} strokeWidth="6" fill="none" opacity="0.9"/>
        <path d="M 400 0 Q 420 200 380 400 T 500 700" stroke={roadColor} strokeWidth="6" fill="none" opacity="0.9"/>
        <path d="M 0 150 L 1000 180" stroke={roadColor} strokeWidth="4" fill="none" opacity="0.8"/>
        <path d="M 200 0 L 240 700" stroke={roadColor} strokeWidth="4" fill="none" opacity="0.8"/>
        {[...Array(12)].map((_, i) => (
          <line key={i} x1={80 * i} y1="0" x2={80 * i + 40} y2="700" stroke={roadMinor} strokeWidth="1" opacity="0.6"/>
        ))}
        {[...Array(9)].map((_, i) => (
          <line key={i} x1="0" y1={80 * i + 30} x2="1000" y2={80 * i + 80} stroke={roadMinor} strokeWidth="1" opacity="0.6"/>
        ))}
        {/* 配達ルート (店舗 → 配達員 → 配達先) */}
        <path d="M 320 294 Q 450 200 580 196 Q 680 250 720 406"
          stroke={t.brand.main} strokeWidth="2.5" fill="none" strokeDasharray="6 4" opacity="0.8"/>
      </svg>

      {pins.map((p) => (
        <div key={p.id} onClick={() => setSelected(p.id)} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          transform: 'translate(-50%, -100%)',
          cursor: 'pointer', zIndex: selected === p.id ? 10 : 2,
        }}>
          {selected === p.id && (
            <div style={{
              position: 'absolute', left: '50%', top: -6, transform: 'translateX(-50%)',
              width: 56, height: 56, borderRadius: '50%',
              backgroundColor: pinColor(p.status), opacity: 0.2,
              animation: 'map-pulse 2s ease-out infinite',
            }}/>
          )}
          <div style={{
            width: 36, height: 36, borderRadius: '50% 50% 50% 0',
            backgroundColor: pinColor(p.status), transform: 'rotate(-45deg)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            display: 'grid', placeItems: 'center',
            border: `3px solid ${t.bg.surface}`,
          }}>
            <Icons.DeliveryDining fontSize="small" sx={{ transform: 'rotate(45deg)', color: t.text.onBrand, width: 16, height: 16 }}/>
          </div>
        </div>
      ))}
      <style>{`@keyframes map-pulse { 0% { transform: translateX(-50%) scale(0.8); opacity: 0.3; } 100% { transform: translateX(-50%) scale(2); opacity: 0; } }`}</style>

      <Paper sx={{
        position: 'absolute', top: 16, left: 16, right: 16, padding: 8,
        display: 'flex', alignItems: 'center', gap: 8,
        maxWidth: 480, margin: '0 auto', boxShadow: t.shadow.md,
      }}>
        <IconButton size="small"><Icons.Layers/></IconButton>
        <div style={{ flex: 1 }}>
          <TextField fullWidth placeholder="エリア・配達員・店舗を検索"
            slotProps={{ input: { startAdornment: <Icons.Search fontSize="small"/> } }}/>
        </div>
        <IconButton size="small" sx={{ backgroundColor: t.brand.main, color: t.text.onBrand }}>
          <Icons.MyLocation fontSize="small"/>
        </IconButton>
      </Paper>

      <Stack spacing={1} sx={{ position: 'absolute', right: 16, top: 80, zIndex: 5 }}>
        {[<Icons.Add/>, <Icons.Navigation/>, <Icons.Layers/>].map((icon, i) => (
          <Paper key={i}><IconButton size="small">{icon}</IconButton></Paper>
        ))}
      </Stack>

      <Paper sx={{
        position: 'absolute', bottom: 16, left: 16, right: 16,
        maxWidth: 480, margin: '0 auto', borderRadius: 16,
        boxShadow: '0 -4px 24px rgba(0,0,0,0.12)', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: t.border.default }}/>
        </div>
        <div style={{ padding: 20 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ marginBottom: 16 }}>
            <div>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: 4 }}>
                <Typography variant="overline" color="brand">LIVE</Typography>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  backgroundColor: t.brand.main,
                  animation: 'map-blink 1.4s infinite',
                }}/>
              </Stack>
              <Typography variant="h5" sx={{ fontFamily: fonts.mono }}>RDR-0118</Typography>
              <Typography variant="body2" color="secondary">佐藤 美咲 · 新宿エリア · Curry Lab 配達中</Typography>
            </div>
            <IconButton size="small"><Icons.MoreVert/></IconButton>
          </Stack>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
            {[
              { icon: <Icons.Moped/>, label: '62%', sub: 'バッテリー' },
              { icon: <Icons.LocationOn/>, label: '1.2km', sub: '配達先まで' },
              { icon: <Icons.AccessTime/>, label: '8分', sub: '到着予定' },
            ].map((s, i) => (
              <div key={i} style={{ padding: 12, borderRadius: 8, backgroundColor: t.bg.sunken, textAlign: 'center' }}>
                <div style={{ color: t.text.muted, marginBottom: 4 }}>
                  {React.cloneElement(s.icon, { fontSize: 'small' } as any)}
                </div>
                <Typography variant="subtitle2" sx={{ fontFamily: fonts.mono }}>{s.label}</Typography>
                <Typography variant="caption" color="secondary">{s.sub}</Typography>
              </div>
            ))}
          </div>
          <Stack direction="row" spacing={1}>
            <Button fullWidth variant="contained">注文を開く</Button>
            <Button variant="outlined">連絡</Button>
          </Stack>
        </div>
      </Paper>
      <style>{`@keyframes map-blink { 50% { opacity: 0.3; } }`}</style>
    </div>
  );
};
