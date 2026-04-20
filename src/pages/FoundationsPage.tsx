import React, { useState } from 'react';
import {
  Typography, Stack, Divider, Button, IconButton, Chip, TextField, Select, MenuItem,
  FormControlLabel, Switch, Checkbox, Radio, Slider, Alert, LinearProgress, CircularProgress,
  Skeleton, Avatar, AvatarGroup, Badge, Breadcrumbs, Link, Tabs, Tab, ToggleButtonGroup,
  ToggleButton, Card, CardContent, CardHeader, CardActions, Paper, Accordion, AccordionSummary,
  AccordionDetails, Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  Dialog, DialogTitle, DialogContent, DialogActions, Drawer, Tooltip,
} from '../components';
import { useTokens } from '../theme';
import { primitive, fonts } from '../tokens';
import * as Icons from '../icons';

const Section: React.FC<{ title: string; desc?: string; children?: React.ReactNode }> = ({ title, desc, children }) => (
  <div style={{ marginBottom: 48 }}>
    <Typography variant="h5" gutterBottom>{title}</Typography>
    {desc && <Typography variant="body2" color="secondary" sx={{ marginBottom: 16 }}>{desc}</Typography>}
    {children}
  </div>
);

const Row: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>{children}</div>
);

function OverlayDemo() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button variant="outlined" onClick={() => setDialogOpen(true)}>Open Dialog</Button>
        <Button variant="outlined" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
        <Tooltip title="ツールチップ"><Button variant="outlined">Hover for Tooltip</Button></Tooltip>
      </div>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>注文のキャンセル</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="secondary">
            この操作は取り消せません。対象の注文と関連する配達履歴・決済レコードが完全に削除されます。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setDialogOpen(false)}>キャンセル</Button>
          <Button variant="contained" color="error" onClick={() => setDialogOpen(false)}>削除</Button>
        </DialogActions>
      </Dialog>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} anchor="right">
        <div style={{ padding: 24, width: 300 }}>
          <Typography variant="h5" gutterBottom>Drawer</Typography>
          <Typography variant="body2" color="secondary" sx={{ marginBottom: 16 }}>
            右側から出現するパネル。slotProps で paper のスタイルをカスタム可能。
          </Typography>
          <Button variant="contained" fullWidth onClick={() => setDrawerOpen(false)}>閉じる</Button>
        </div>
      </Drawer>
    </>
  );
}

export const FoundationsPage: React.FC = () => {
  const t = useTokens();
  const Swatch: React.FC<{ name: string; value: string }> = ({ name, value }) => (
    <div>
      <div style={{ height: 56, borderRadius: 8, backgroundColor: value, border: `1px solid ${t.border.subtle}` }}/>
      <div style={{ fontSize: 11, fontFamily: fonts.mono, color: t.text.secondary, marginTop: 4 }}>{name}</div>
      <div style={{ fontSize: 10, fontFamily: fonts.mono, color: t.text.muted }}>{value}</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 40 }}>
        <Typography variant="overline" color="brand">Design System v1.0</Typography>
        <Typography variant="h2" gutterBottom>Foundations &amp; Components</Typography>
        <Typography variant="body1" color="secondary" sx={{ maxWidth: 640 }}>
          MUI v9 互換 API。tokens → theme → components.styleOverrides.root.variants の 3 層。
          全 color / size / variant は props で切り替え、ハードコード一切なし。
        </Typography>
      </div>

      <Section title="Color — Brand Scale">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(88px, 1fr))', gap: 12 }}>
          {Object.entries(primitive.teal).map(([k, v]) => <Swatch key={k} name={`teal.${k}`} value={v}/>)}
        </div>
      </Section>
      <Section title="Color — Neutral Scale">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(88px, 1fr))', gap: 12 }}>
          {Object.entries(primitive.gray).map(([k, v]) => <Swatch key={k} name={`gray.${k}`} value={v}/>)}
        </div>
      </Section>
      <Section title="Color — Semantic" desc="役割で引ける意味付きトークン。ブランド差し替え時はここだけ書き換える。">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
          <Swatch name="brand.main" value={t.brand.main}/>
          <Swatch name="accent.main" value={t.accent.main}/>
          <Swatch name="success.main" value={t.success.main}/>
          <Swatch name="warning.main" value={t.warning.main}/>
          <Swatch name="danger.main" value={t.danger.main}/>
          <Swatch name="info.main" value={t.info.main}/>
        </div>
      </Section>

      <Divider sx={{ marginTop: 40, marginBottom: 40 }}/>

      <Section title="Typography">
        <Stack spacing={1}>
          <Typography variant="h1">見出し Display h1</Typography>
          <Typography variant="h2">見出し Headline h2</Typography>
          <Typography variant="h3">見出し Title h3</Typography>
          <Typography variant="h4">見出し h4</Typography>
          <Typography variant="h5">見出し h5</Typography>
          <Typography variant="subtitle1">Subtitle 1 — やや強調された小見出し</Typography>
          <Typography variant="body1">Body 1 — 本文テキスト。日本語と英字が混在する文章の可読性を優先し、行間 1.65。</Typography>
          <Typography variant="body2" color="secondary">Body 2 — 補助的な説明テキスト。</Typography>
          <Typography variant="caption" color="secondary">Caption · 0.75rem</Typography>
          <Typography variant="overline" color="brand">OVERLINE · Tracked</Typography>
        </Stack>
      </Section>

      <Section title="Button">
        <Row>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button variant="contained" disabled>Disabled</Button>
          <Button variant="contained" startIcon={<Icons.Add/>}>Icon Start</Button>
          <Button variant="contained" endIcon={<Icons.ArrowForward/>}>Icon End</Button>
        </Row>
        <Row>
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="contained" color="success">Success</Button>
          <Button variant="contained" color="warning">Warning</Button>
          <Button variant="contained" color="error">Error</Button>
        </Row>
        <Row>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
          <IconButton><Icons.Settings/></IconButton>
          <IconButton color="primary"><Icons.Notifications/></IconButton>
          <IconButton size="small"><Icons.Close/></IconButton>
        </Row>
      </Section>

      <Section title="Chip">
        <Row>
          <Chip label="Default"/>
          <Chip label="Primary" color="primary"/>
          <Chip label="Success" color="success"/>
          <Chip label="Warning" color="warning"/>
          <Chip label="Error" color="error"/>
          <Chip label="Info" color="info"/>
        </Row>
        <Row>
          <Chip label="Outlined" variant="outlined"/>
          <Chip label="Outlined Primary" variant="outlined" color="primary"/>
          <Chip label="Deletable" onDelete={() => {}}/>
          <Chip label="Clickable" onClick={() => {}}/>
          <Chip label="With Icon" icon={<Icons.Star/>} color="warning"/>
          <Chip label="Small" size="small" color="primary"/>
        </Row>
      </Section>

      <Section title="Form Controls">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 16 }}>
          <TextField label="注文 ID" placeholder="ORD-00000"/>
          <TextField label="Email" type="email" helperText="通知先メールアドレス"/>
          <TextField label="Password" type="password" error helperText="8文字以上"/>
          <TextField label="検索" slotProps={{ input: { startAdornment: <Icons.Search fontSize="small"/> } }}/>
        </div>
        <div style={{ marginBottom: 16, maxWidth: 480 }}>
          <TextField label="備考" multiline rows={3} fullWidth placeholder="任意のメモを入力..."/>
        </div>
        <Row>
          <div style={{ width: 200 }}>
            <Select label="ステータス" defaultValue="active">
              <MenuItem value="active">配達中</MenuItem>
              <MenuItem value="maintenance">調理中</MenuItem>
              <MenuItem value="idle">受付済</MenuItem>
            </Select>
          </div>
          <FormControlLabel control={<Switch defaultChecked/>} label="通知を受け取る"/>
          <FormControlLabel control={<Checkbox defaultChecked/>} label="利用規約に同意"/>
          <FormControlLabel control={<Radio checked={true}/>} label="ラジオ"/>
        </Row>
        <div style={{ maxWidth: 400, marginTop: 12 }}>
          <Typography variant="caption" color="secondary">Slider</Typography>
          <Slider defaultValue={60}/>
        </div>
      </Section>

      <Section title="Feedback">
        <Stack spacing={1.5}>
          <Alert severity="success">配達が完了しました。支払いも確定しています。</Alert>
          <Alert severity="info">新メニューが公開可能です。</Alert>
          <Alert severity="warning">配達員バッテリー残量が 30% を下回っています。</Alert>
          <Alert severity="error" onClose={() => {}}>配達員との通信が切断されました。接続を確認してください。</Alert>
          <Alert severity="success" variant="outlined">Outlined variant</Alert>
          <Alert severity="info" variant="filled">Filled variant</Alert>
        </Stack>
        <Row>
          <div style={{ width: 160 }}><LinearProgress variant="determinate" value={72}/></div>
          <div style={{ width: 160 }}><LinearProgress/></div>
          <CircularProgress size={32}/>
          <CircularProgress size={32} variant="determinate" value={72}/>
        </Row>
        <Row>
          <Skeleton width={120}/>
          <Skeleton variant="circular" width={40} height={40}/>
          <Skeleton variant="rectangular" width={160} height={56}/>
        </Row>
      </Section>

      <Section title="Avatars &amp; Badges">
        <Row>
          <Avatar>YK</Avatar>
          <Avatar size={32}>SM</Avatar>
          <Avatar variant="rounded" size={48}>田</Avatar>
          <AvatarGroup max={3}>
            <Avatar>Y</Avatar>
            <Avatar sx={{ backgroundColor: t.brand.soft, color: t.brand.main }}>S</Avatar>
            <Avatar sx={{ backgroundColor: t.warning.soft, color: t.warning.main }}>T</Avatar>
            <Avatar>+</Avatar>
            <Avatar>+</Avatar>
          </AvatarGroup>
          <Badge badgeContent={4} color="error"><IconButton><Icons.Notifications/></IconButton></Badge>
          <Badge variant="dot" color="success"><IconButton><Icons.Settings/></IconButton></Badge>
        </Row>
      </Section>

      <Section title="Navigation">
        <Row>
          <Breadcrumbs>
            <Link href="#">Home</Link>
            <Link href="#">Orders</Link>
            <Typography variant="body2" color="secondary">ORD-20426</Typography>
          </Breadcrumbs>
        </Row>
        <div style={{ marginBottom: 16, maxWidth: 480 }}>
          <Tabs value={0} onChange={() => {}}>
            <Tab label="概要"/>
            <Tab label="注文"/>
            <Tab label="配達員"/>
            <Tab label="ログ"/>
          </Tabs>
        </div>
        <ToggleButtonGroup exclusive value="12h">
          <ToggleButton value="1h">1H</ToggleButton>
          <ToggleButton value="12h">12H</ToggleButton>
          <ToggleButton value="24h">24H</ToggleButton>
          <ToggleButton value="7d">7D</ToggleButton>
        </ToggleButtonGroup>
      </Section>

      <Section title="Containers">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 16 }}>
          <Card>
            <CardHeader title="Card Title" subheader="Subheader text"/>
            <CardContent>
              <Typography variant="body2" color="secondary">
                Cardの標準的なレイアウト。header + content + actions。
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Action</Button>
              <Button size="small" variant="text">Cancel</Button>
            </CardActions>
          </Card>
          <Card variant="elevation">
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Elevation Variant</Typography>
              <Typography variant="body2" color="secondary">軽い影付きバリアント。</Typography>
            </CardContent>
          </Card>
          <Paper variant="outlined" sx={{ padding: 20 }}>
            <Typography variant="subtitle2" gutterBottom>Paper</Typography>
            <Typography variant="body2" color="secondary">素のコンテナ要素。</Typography>
          </Paper>
        </div>
        <Accordion>
          <AccordionSummary>Accordion 1 - クリックで展開</AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="secondary">展開時のコンテンツ。</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary>Accordion 2 - 初期展開済み</AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="secondary">初期値で開いた状態。</Typography>
          </AccordionDetails>
        </Accordion>
      </Section>

      <Section title="Data Display">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head">注文 ID</TableCell>
                <TableCell variant="head">店舗</TableCell>
                <TableCell variant="head">ステータス</TableCell>
                <TableCell variant="head" align="right">合計</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { id: 'ORD-20426', store: 'Bistro MARU', s: 'active', amount: 2480 },
                { id: 'ORD-20427', store: 'Curry Lab', s: 'active', amount: 1680 },
                { id: 'ORD-20428', store: 'Sushi Tora', s: 'maintenance', amount: 4200 },
              ].map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell sx={{ fontFamily: fonts.mono, fontSize: 13 }}>{r.id}</TableCell>
                  <TableCell>{r.store}</TableCell>
                  <TableCell>
                    <Chip size="small" label={r.s === 'active' ? '配達中' : '調理中'} color={r.s === 'active' ? 'success' : 'warning'}/>
                  </TableCell>
                  <TableCell align="right">¥{r.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Section>

      <Section title="Overlays" desc="Dialog, Drawer, Tooltip も MUI 互換の slots/slotProps API。">
        <OverlayDemo/>
      </Section>
    </div>
  );
};
