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
    { label: 'アクティブ機体', value: '147', delta: '+12', trend: 'up', icon: <Icons.FlightTakeoff/> },
    { label: '本日のフライト', value: '2,384', delta: '+8.2%', trend: 'up', icon: <Icons.Timeline/> },
    { label: '平均飛行時間', value: '24.6m', delta: '-1.4%', trend: 'down', icon: <Icons.AccessTime/> },
    { label: 'インシデント', value: '3', delta: '-50%', trend: 'up', icon: <Icons.Shield/> },
  ];
  const drones = [
    { id: 'DRN-0042', model: 'Scout-X3', pilot: '山田 颯太', status: 'active', battery: 87, area: '東京湾', time: '12:34' },
    { id: 'DRN-0118', model: 'Cargo-P1', pilot: '佐藤 美咲', status: 'active', battery: 62, area: '羽田', time: '13:02' },
    { id: 'DRN-0203', model: 'Scout-X3', pilot: '田中 大輔', status: 'maintenance', battery: 0, area: '整備庫', time: '—' },
    { id: 'DRN-0277', model: 'Survey-M', pilot: '鈴木 彩', status: 'idle', battery: 94, area: '横浜', time: '—' },
    { id: 'DRN-0312', model: 'Cargo-P1', pilot: '伊藤 健', status: 'active', battery: 45, area: '川崎', time: '12:58' },
  ];
  const sparkData = [30, 45, 38, 55, 48, 62, 58, 70, 65, 78, 72, 85];
  const sMap: Record<string, { c: any; l: string }> = {
    active: { c: 'success', l: '飛行中' },
    maintenance: { c: 'warning', l: '整備中' },
    idle: { c: 'default', l: '待機' },
  };

  return (
    <div style={{ display: 'flex', minHeight: '100%', backgroundColor: t.bg.canvas }}>
      <aside style={{
        width: 240, flexShrink: 0, borderRight: `1px solid ${t.border.subtle}`,
        backgroundColor: t.bg.surface, padding: 12,
      }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ padding: 8, marginBottom: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: t.brand.main, display: 'grid', placeItems: 'center' }}>
            <Icons.FlightTakeoff fontSize="small" sx={{ color: t.text.onBrand }}/>
          </div>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Aeros</Typography>
        </Stack>
        <List disablePadding>
          {[
            { icon: <Icons.Dashboard/>, label: 'ダッシュボード', active: true },
            { icon: <Icons.FlightTakeoff/>, label: '機体管理' },
            { icon: <Icons.Map/>, label: 'フライトマップ' },
            { icon: <Icons.Insights/>, label: '分析' },
            { icon: <Icons.People/>, label: 'パイロット' },
            { icon: <Icons.CalendarMonth/>, label: 'スケジュール' },
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
            <TextField fullWidth placeholder="機体・パイロットを検索"
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
              <Typography variant="body2" color="secondary">2026年4月20日 · 全機体リアルタイム監視</Typography>
            </div>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" startIcon={<Icons.Download/>}>エクスポート</Button>
              <Button variant="contained" size="small" startIcon={<Icons.Add/>}>新規フライト</Button>
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
                    <Typography variant="h6">フライト数推移</Typography>
                    <Typography variant="caption" color="secondary">過去12時間</Typography>
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
                    { label: 'バッテリー低下', detail: 'DRN-0312 · 残量45%', severity: 'warning' as const },
                    { label: '強風警報', detail: '東京湾 · 風速12m/s', severity: 'error' as const },
                    { label: '整備完了', detail: 'DRN-0203 · 再稼働可能', severity: 'success' as const },
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
                <Typography variant="h6">機体一覧</Typography>
                <Button variant="outlined" size="small" startIcon={<Icons.FilterList/>}>フィルター</Button>
              </div>
              <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                <Tab label="すべて (147)"/>
                <Tab label="飛行中 (89)"/>
                <Tab label="整備 (12)"/>
                <Tab label="待機 (46)"/>
              </Tabs>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell variant="head">機体ID</TableCell>
                    <TableCell variant="head">モデル</TableCell>
                    <TableCell variant="head">パイロット</TableCell>
                    <TableCell variant="head">ステータス</TableCell>
                    <TableCell variant="head">バッテリー</TableCell>
                    <TableCell variant="head">エリア</TableCell>
                    <TableCell variant="head" align="right">開始</TableCell>
                    <TableCell variant="head"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {drones.map((d) => (
                    <TableRow key={d.id} hover>
                      <TableCell sx={{ fontFamily: fonts.mono, fontSize: 13 }}>{d.id}</TableCell>
                      <TableCell>{d.model}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Avatar size={24} sx={{ fontSize: 11 }}>{d.pilot[0]}</Avatar>
                          <Typography variant="body2">{d.pilot}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell><Chip size="small" color={sMap[d.status].c} label={sMap[d.status].l}/></TableCell>
                      <TableCell sx={{ minWidth: 140 }}>
                        {d.battery > 0 ? (
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <div style={{ flex: 1, maxWidth: 80 }}>
                              <LinearProgress variant="determinate" value={d.battery}
                                color={d.battery > 60 ? 'success' : d.battery > 30 ? 'warning' : 'error'}/>
                            </div>
                            <span style={{ fontFamily: fonts.mono, fontSize: 12, color: t.text.secondary }}>{d.battery}%</span>
                          </Stack>
                        ) : <Typography variant="caption" color="secondary">—</Typography>}
                      </TableCell>
                      <TableCell><Typography variant="body2" color="secondary">{d.area}</Typography></TableCell>
                      <TableCell align="right" sx={{ fontFamily: fonts.mono, fontSize: 13 }}>{d.time}</TableCell>
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
