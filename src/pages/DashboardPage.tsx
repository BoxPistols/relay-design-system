import React, { useState } from 'react';
import {
  Typography, Stack, Button, IconButton, Chip, Avatar, Badge, TextField,
  Card, CardContent, List, ListItemButton, ListItemIcon, ListItemText,
  Tabs, Tab, ToggleButtonGroup, ToggleButton, LinearProgress, Alert,
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
  Sparkline,
} from '../components';
import { useTokens } from '../theme';
import { fonts } from '../tokens';
import * as Icons from '../icons';

export const DashboardPage: React.FC = () => {
  const t = useTokens();
  const [tab, setTab] = useState(0);

  const kpis = [
    { label: '本日の注文数', value: '2,384', delta: '+8.2%', trend: 'up', icon: <Icons.ReceiptLong/> },
    { label: '稼働中の配達員', value: '147', delta: '+12', trend: 'up', icon: <Icons.DeliveryDining/> },
    { label: '平均配達時間', value: '24.6分', delta: '-1.4分', trend: 'up', icon: <Icons.AccessTime/> },
    { label: '未完了・要対応', value: '3', delta: '-50%', trend: 'up', icon: <Icons.Shield/> },
  ];
  const orders = [
    { id: 'ORD-20426', store: 'Bistro MARU', rider: '山田 颯太', status: 'delivering', eta: 12, area: '渋谷', time: '12:34' },
    { id: 'ORD-20427', store: 'Curry Lab', rider: '佐藤 美咲', status: 'delivering', eta: 8, area: '新宿', time: '13:02' },
    { id: 'ORD-20428', store: 'Sushi Tora', rider: '—', status: 'preparing', eta: 0, area: '恵比寿', time: '—' },
    { id: 'ORD-20429', store: 'Ramen Yuki', rider: '鈴木 彩', status: 'picked', eta: 18, area: '目黒', time: '—' },
    { id: 'ORD-20430', store: 'Pizza Cielo', rider: '伊藤 健', status: 'delivering', eta: 4, area: '代々木', time: '12:58' },
  ];
  const sparkData = [30, 45, 38, 55, 48, 62, 58, 70, 65, 78, 72, 85];
  const sMap: Record<string, { c: any; l: string }> = {
    delivering: { c: 'success', l: '配達中' },
    preparing: { c: 'warning', l: '調理中' },
    picked: { c: 'info', l: '受取済' },
  };

  return (
    <div style={{ display: 'flex', minHeight: '100%', backgroundColor: t.bg.canvas }}>
      <aside style={{
        width: 240, flexShrink: 0, borderRight: `1px solid ${t.border.subtle}`,
        backgroundColor: t.bg.surface, padding: 12,
      }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ padding: 8, marginBottom: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: t.brand.main, display: 'grid', placeItems: 'center' }}>
            <Icons.DeliveryDining fontSize="small" sx={{ color: t.text.onBrand }}/>
          </div>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Relay</Typography>
        </Stack>
        <List disablePadding>
          {[
            { icon: <Icons.Dashboard/>, label: 'ダッシュボード', active: true },
            { icon: <Icons.ReceiptLong/>, label: '注文管理' },
            { icon: <Icons.DeliveryDining/>, label: '配達員' },
            { icon: <Icons.Store/>, label: '加盟店' },
            { icon: <Icons.Map/>, label: '配達エリア' },
            { icon: <Icons.Insights/>, label: '分析' },
            { icon: <Icons.CalendarMonth/>, label: 'シフト' },
            { icon: <Icons.Settings/>, label: '設定' },
          ].map((item, i) => (
            <ListItemButton key={i} selected={item.active}>
              <ListItemIcon>{React.cloneElement(item.icon, { fontSize: 'small' } as any)}</ListItemIcon>
              <ListItemText primary={item.label}/>
            </ListItemButton>
          ))}
        </List>
      </aside>

      <main style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12,
          borderBottom: `1px solid ${t.border.subtle}`, backgroundColor: t.bg.surface,
        }}>
          <div style={{ flex: 1, maxWidth: 420 }}>
            <TextField fullWidth placeholder="注文 ID・店舗・配達員を検索"
              slotProps={{ input: { startAdornment: <Icons.Search fontSize="small"/> } }}/>
          </div>
          <div style={{ flex: 1 }}/>
          <Badge badgeContent={3} color="error"><IconButton><Icons.Notifications/></IconButton></Badge>
          <Avatar size={32} sx={{ backgroundColor: t.accent.soft, color: t.accent.main }}>Y</Avatar>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
            <div>
              <Typography variant="h4">運用概要</Typography>
              <Typography variant="body2" color="secondary">2026年4月20日 · 全エリアリアルタイム監視</Typography>
            </div>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" startIcon={<Icons.Download/>}>エクスポート</Button>
              <Button variant="contained" size="small" startIcon={<Icons.Add/>}>新規キャンペーン</Button>
            </Stack>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 16 }}>
            {kpis.map((k) => (
              <Card key={k.label}>
                <CardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      backgroundColor: t.brand.soft, color: t.brand.main,
                      display: 'grid', placeItems: 'center',
                    }}>
                      {React.cloneElement(k.icon, { fontSize: 'small' } as any)}
                    </div>
                    <Chip size="small"
                      color={k.trend === 'up' ? 'success' : 'error'}
                      label={k.delta}
                      icon={k.trend === 'up' ? <Icons.TrendingUp/> : <Icons.TrendingDown/>}/>
                  </div>
                  <Typography variant="body2" color="secondary">{k.label}</Typography>
                  <Typography variant="h3" sx={{ fontFamily: fonts.display, marginTop: 4 }}>{k.value}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(260px, 1fr)', gap: 16, marginBottom: 16 }}>
            <Card>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <Typography variant="h6">注文数推移</Typography>
                    <Typography variant="caption" color="secondary">過去 12 時間</Typography>
                  </div>
                  <ToggleButtonGroup size="small" exclusive value="12h">
                    <ToggleButton value="12h">12H</ToggleButton>
                    <ToggleButton value="24h">24H</ToggleButton>
                    <ToggleButton value="7d">7D</ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <Sparkline data={sparkData}/>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>本日のアラート</Typography>
                <Stack spacing={1.25}>
                  {[
                    { label: '配達員不足', detail: '渋谷エリア · 需要 +140%', severity: 'warning' as const },
                    { label: '天候警報', detail: '豪雨 · 配達時間 +8分見込', severity: 'error' as const },
                    { label: '売上目標達成', detail: 'Bistro MARU · 日次目標 110%', severity: 'success' as const },
                  ].map((a, i) => (
                    <Alert key={i} severity={a.severity}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{a.label}</Typography>
                      <Typography variant="caption" sx={{ color: 'inherit', opacity: 0.85 }}>{a.detail}</Typography>
                    </Alert>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </div>

          <Card>
            <div style={{ padding: '20px 24px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Typography variant="h6">進行中の注文</Typography>
                <Button variant="outlined" size="small" startIcon={<Icons.FilterList/>}>フィルター</Button>
              </div>
              <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                <Tab label="すべて (2,384)"/>
                <Tab label="配達中 (89)"/>
                <Tab label="調理中 (24)"/>
                <Tab label="受取待ち (12)"/>
              </Tabs>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell variant="head">注文 ID</TableCell>
                    <TableCell variant="head">店舗</TableCell>
                    <TableCell variant="head">配達員</TableCell>
                    <TableCell variant="head">ステータス</TableCell>
                    <TableCell variant="head">到着まで</TableCell>
                    <TableCell variant="head">エリア</TableCell>
                    <TableCell variant="head" align="right">受注</TableCell>
                    <TableCell variant="head"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id} hover>
                      <TableCell sx={{ fontFamily: fonts.mono, fontSize: 13 }}>{o.id}</TableCell>
                      <TableCell>{o.store}</TableCell>
                      <TableCell>
                        {o.rider === '—' ? (
                          <Typography variant="caption" color="secondary">未アサイン</Typography>
                        ) : (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar size={24} sx={{ fontSize: 11 }}>{o.rider[0]}</Avatar>
                            <Typography variant="body2">{o.rider}</Typography>
                          </Stack>
                        )}
                      </TableCell>
                      <TableCell><Chip size="small" color={sMap[o.status].c} label={sMap[o.status].l}/></TableCell>
                      <TableCell sx={{ minWidth: 140 }}>
                        {o.eta > 0 ? (
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <div style={{ flex: 1, maxWidth: 80 }}>
                              <LinearProgress variant="determinate" value={Math.max(5, 100 - o.eta * 4)}
                                color={o.eta < 10 ? 'success' : o.eta < 20 ? 'warning' : 'error'}/>
                            </div>
                            <span style={{ fontFamily: fonts.mono, fontSize: 12, color: t.text.secondary }}>{o.eta}分</span>
                          </Stack>
                        ) : <Typography variant="caption" color="secondary">—</Typography>}
                      </TableCell>
                      <TableCell><Typography variant="body2" color="secondary">{o.area}</Typography></TableCell>
                      <TableCell align="right" sx={{ fontFamily: fonts.mono, fontSize: 13 }}>{o.time}</TableCell>
                      <TableCell align="right"><IconButton size="small"><Icons.MoreVert fontSize="small"/></IconButton></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </div>
      </main>
    </div>
  );
};
