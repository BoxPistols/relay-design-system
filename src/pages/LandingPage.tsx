import React from 'react';
import {
  Typography, Stack, Button, Chip, Card, CardContent,
  AppBar, Toolbar, Sparkline,
} from '../components';
import { useTokens } from '../theme';
import { fonts } from '../tokens';
import * as Icons from '../icons';

export const LandingPage: React.FC = () => {
  const t = useTokens();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar sx={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: t.brand.main, display: 'grid', placeItems: 'center' }}>
              <Icons.FlightTakeoff fontSize="small" sx={{ color: t.text.onBrand, width: 14, height: 14 }}/>
            </div>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Aeros</Typography>
          </Stack>
          <Stack direction="row" spacing={3} sx={{ marginLeft: 40 }}>
            {['プロダクト', 'ソリューション', '料金', 'ドキュメント'].map((x) => (
              <Typography key={x} variant="body2" color="secondary" sx={{ cursor: 'pointer' }}>{x}</Typography>
            ))}
          </Stack>
          <div style={{ flex: 1 }}/>
          <Button size="small" variant="text" sx={{ marginRight: 8 }}>ログイン</Button>
          <Button size="small" variant="contained">デモを予約</Button>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: t.bg.canvas, padding: '100px 24px' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at 70% 30%, ${t.brand.soft}, transparent 60%), radial-gradient(circle at 20% 80%, ${t.accent.soft}, transparent 50%)`,
        }}/>
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>
          <Stack spacing={3} sx={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
            <Chip size="small" color="primary" label="AIアシスト運航 ベータ公開"
              icon={<Icons.AutoAwesome fontSize="small"/>} sx={{ alignSelf: 'center' }}/>
            <Typography variant="h1" sx={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              空を、<em style={{ fontStyle: 'italic', color: t.brand.main }}>統合</em>する。
            </Typography>
            <Typography variant="h6" color="secondary" sx={{ fontWeight: 400, maxWidth: 620, margin: '0 auto' }}>
              ドローン運航の全てを1つのプラットフォームに。機体管理、フライト計画、リアルタイム監視、
              そしてAIによる自律判断。産業用途のための次世代OS。
            </Typography>
            <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ paddingTop: 16 }}>
              <Button size="large" variant="contained" endIcon={<Icons.ArrowForward/>}>無料で始める</Button>
              <Button size="large" variant="outlined" startIcon={<Icons.PlayArrow/>}>デモを見る (2分)</Button>
            </Stack>
          </Stack>

          <div style={{ marginTop: 64 }}>
            <Card sx={{
              maxWidth: 1000, margin: '0 auto', borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 20px 80px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <div style={{ backgroundColor: t.bg.sunken, padding: '10px 16px', display: 'flex', gap: 6, borderBottom: `1px solid ${t.border.subtle}` }}>
                {[t.danger.main, t.warning.main, t.success.main].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c, opacity: 0.7 }}/>
                ))}
              </div>
              <div style={{ aspectRatio: '16/9', backgroundColor: t.bg.canvas, display: 'flex' }}>
                <div style={{ width: 180, borderRight: `1px solid ${t.border.subtle}`, padding: 12 }}>
                  {[Icons.Dashboard, Icons.FlightTakeoff, Icons.Map, Icons.Insights].map((Ic, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: 8, marginBottom: 4,
                      borderRadius: 6, backgroundColor: i === 0 ? t.brand.soft : 'transparent',
                    }}>
                      <Ic fontSize="small" sx={{ color: i === 0 ? t.brand.main : t.text.muted }}/>
                      <div style={{
                        height: 6, flex: 1, borderRadius: 3,
                        backgroundColor: i === 0 ? t.brand.main : t.border.default,
                        opacity: i === 0 ? 1 : 0.5,
                      }}/>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, padding: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} style={{ padding: 12, border: `1px solid ${t.border.subtle}`, borderRadius: 8 }}>
                        <div style={{ width: 40, height: 6, backgroundColor: t.border.default, borderRadius: 3, marginBottom: 6 }}/>
                        <div style={{ width: 60, height: 14, backgroundColor: t.text.primary, borderRadius: 3, opacity: 0.8 }}/>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 140, border: `1px solid ${t.border.subtle}`, borderRadius: 8, overflow: 'hidden' }}>
                    <Sparkline data={[40, 50, 45, 65, 58, 75, 70, 85, 78, 92, 85, 100]} showDots={false} gradientId="hero-sp"/>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ marginTop: 64, textAlign: 'center' }}>
            <Typography variant="overline" color="text.muted">導入企業</Typography>
            <Stack direction="row" spacing={5} justifyContent="center" flexWrap="wrap" sx={{ marginTop: 12 }}>
              {['NIPPON LOGISTICS', 'SKY WORKS', 'TERRA SURVEY', 'AETHER', 'MERIDIAN'].map((l) => (
                <span key={l} style={{
                  fontFamily: fonts.mono, color: t.text.muted, fontWeight: 600,
                  fontSize: 13, letterSpacing: '0.1em',
                }}>{l}</span>
              ))}
            </Stack>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Stack spacing={2} sx={{ marginBottom: 56, maxWidth: 640 }}>
            <Typography variant="overline" color="brand">プロダクト</Typography>
            <Typography variant="h2" sx={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              運航の全レイヤーを、<em style={{ fontStyle: 'italic' }}>一つに</em>。
            </Typography>
          </Stack>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { icon: <Icons.Bolt/>, title: 'リアルタイム監視', desc: '数千機の機体を同時に追跡、50ms以下のテレメトリ更新。' },
              { icon: <Icons.Shield/>, title: '安全性ファースト', desc: 'ISO 21384準拠、多重冗長化、自動帰還システム標準搭載。' },
              { icon: <Icons.AutoAwesome/>, title: 'AI自律判断', desc: '天候・空域情報を統合し、最適な飛行経路を自動生成。' },
              { icon: <Icons.Timeline/>, title: '統合ダッシュボード', desc: 'KPI、インシデント、整備計画まで一画面で把握。' },
              { icon: <Icons.Map/>, title: '高精度マップ', desc: 'リアルタイム3D空域表示、NOTAM/METAR自動取込。' },
              { icon: <Icons.People/>, title: 'チーム運用', desc: 'ロール別権限、監査ログ、SSO/SCIM対応。' },
            ].map((f, i) => (
              <Card key={i}>
                <CardContent>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    backgroundColor: t.brand.soft, color: t.brand.main,
                    display: 'grid', placeItems: 'center', marginBottom: 16,
                  }}>{f.icon}</div>
                  <Typography variant="h6" gutterBottom>{f.title}</Typography>
                  <Typography variant="body2" color="secondary">{f.desc}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Big stat */}
      <section style={{ padding: '100px 24px', backgroundColor: t.bg.sunken }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontSize: 'clamp(3rem, 10vw, 7rem)', marginBottom: 8 }}>1,247,000+</Typography>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 400 }}>累計フライト数 · 99.97% 完遂率</Typography>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 24, marginTop: 48, maxWidth: 840, margin: '48px auto 0',
          }}>
            {[
              { value: '147+', label: '導入企業' },
              { value: '28国', label: '対応地域' },
              { value: '24/7', label: 'サポート' },
              { value: 'SOC2', label: 'コンプライアンス' },
            ].map((s, i) => (
              <div key={i}>
                <Typography variant="h4" sx={{ fontFamily: fonts.display, marginBottom: 4 }}>{s.value}</Typography>
                <Typography variant="body2" color="secondary">{s.label}</Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px' }}>
        <Card sx={{
          maxWidth: 960, margin: '0 auto', padding: 56, textAlign: 'center',
          background: `linear-gradient(135deg, ${t.brand.main}, ${t.accent.main})`,
          border: 'none', color: t.text.onBrand,
        }}>
          <Typography variant="h2" sx={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'inherit', marginBottom: 16 }}>
            今すぐ、空を動かす。
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
            14日間の無料トライアル。クレジットカード不要。いつでもキャンセル可能。
          </Typography>
          <Stack direction="row" spacing={1.5} justifyContent="center">
            <Button size="large" variant="contained" sx={{ backgroundColor: t.bg.surface, color: t.text.primary }}>無料で始める</Button>
            <Button size="large" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.4)', color: 'inherit' }}>営業に相談</Button>
          </Stack>
        </Card>
      </section>
    </div>
  );
};
