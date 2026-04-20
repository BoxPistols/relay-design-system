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
              <Icons.DeliveryDining fontSize="small" sx={{ color: t.text.onBrand, width: 14, height: 14 }}/>
            </div>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Bento</Typography>
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
            <Chip size="small" color="primary" label="AI 配車最適化 ベータ公開"
              icon={<Icons.AutoAwesome fontSize="small"/>} sx={{ alignSelf: 'center' }}/>
            <Typography variant="h1" sx={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              街を、<em style={{ fontStyle: 'italic', color: t.brand.main }}>つなぐ</em>。
            </Typography>
            <Typography variant="h6" color="secondary" sx={{ fontWeight: 400, maxWidth: 620, margin: '0 auto' }}>
              フードデリバリーとモビリティを 1 つのプラットフォームに。
              注文管理、配達員オペレーション、予約枠管理、リアルタイム追跡。
              ローカルサービスのための運用 OS。
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
                  {[Icons.Dashboard, Icons.DeliveryDining, Icons.Map, Icons.Insights].map((Ic, i) => (
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
              {['TOKYO EATS', 'URBAN CART', 'FLEET MOBILITY', 'KITCHEN LAB', 'MERIDIAN'].map((l) => (
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
              オペレーションの全レイヤーを、<em style={{ fontStyle: 'italic' }}>一つに</em>。
            </Typography>
          </Stack>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { icon: <Icons.Bolt/>, title: 'リアルタイム配車', desc: '注文発生から 30 秒で最寄りの配達員に自動アサイン。' },
              { icon: <Icons.Shield/>, title: '温度・衛生管理', desc: '配達中の温度ログ、食品衛生法準拠の証跡を自動保存。' },
              { icon: <Icons.AutoAwesome/>, title: 'AI 需要予測', desc: '天候・イベント・曜日から注文数を予測し、配達員をプレポジション。' },
              { icon: <Icons.Timeline/>, title: '統合ダッシュボード', desc: '売上・配達完遂率・クレームまで 1 画面で把握。' },
              { icon: <Icons.Map/>, title: '配達エリア制御', desc: 'ヒートマップで需要を可視化、エリア別の稼働率を最適化。' },
              { icon: <Icons.People/>, title: 'マルチテナント', desc: 'レストラン / 配達員 / 管理者のロール別画面、SSO/SCIM 対応。' },
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
          <Typography variant="h1" sx={{ fontSize: 'clamp(3rem, 10vw, 7rem)', marginBottom: 8 }}>3,842,000+</Typography>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 400 }}>累計配達件数 · 平均 24 分以内配達</Typography>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 24, marginTop: 48, maxWidth: 840, margin: '48px auto 0',
          }}>
            {[
              { value: '2,400+', label: '加盟店' },
              { value: '28都市', label: '対応エリア' },
              { value: '24/7', label: 'サポート' },
              { value: 'PCI-DSS', label: '決済準拠' },
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
            今すぐ、街を動かす。
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
            14 日間の無料トライアル。クレジットカード不要。いつでもキャンセル可能。
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
