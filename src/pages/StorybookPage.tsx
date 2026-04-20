import React, { useState } from 'react';
import {
  Typography, Stack, Divider, IconButton, Chip, TextField, Select, MenuItem,
  Switch, Alert, LinearProgress, CircularProgress, Button,
  Breadcrumbs, Tabs, Tab, ToggleButtonGroup, ToggleButton,
  Card, TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
  Tooltip, NumberField,
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSubmenu, MenubarSeparator,
} from '../components';
import { useTheme, useTokens } from '../theme';
import { fonts, primitive } from '../tokens';
import * as Icons from '../icons';

export const StorybookPage: React.FC = () => {
  const t = useTokens();
  const { mode } = useTheme();
  const [selected, setSelected] = useState('button-primary');
  const [bottomTab, setBottomTab] = useState('controls');
  const [viewTab, setViewTab] = useState('canvas');
  const [bgMode, setBgMode] = useState('light');
  const [viewport, setViewport] = useState('responsive');

  const tree: any[] = [
    { type: 'folder', label: 'Foundations', children: [
      { id: 'colors', label: 'Colors' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
    ]},
    { type: 'folder', label: 'Inputs', defaultOpen: true, children: [
      { type: 'folder', label: 'Button', defaultOpen: true, children: [
        { id: 'button-primary', label: 'Primary' },
        { id: 'button-secondary', label: 'Secondary' },
        { id: 'button-with-icon', label: 'WithIcon' },
        { id: 'button-sizes', label: 'Sizes' },
      ]},
      { type: 'folder', label: 'TextField', children: [
        { id: 'tf-basic', label: 'Basic' },
        { id: 'tf-adornment', label: 'WithAdornment' },
      ]},
      { type: 'folder', label: 'NumberField', badge: 'v9', children: [
        { id: 'nf-basic', label: 'Basic' },
        { id: 'nf-currency', label: 'Currency' },
      ]},
    ]},
    { type: 'folder', label: 'Navigation', children: [
      { type: 'folder', label: 'Menubar', badge: 'v9', children: [
        { id: 'mb-basic', label: 'Basic' },
        { id: 'mb-submenu', label: 'WithSubmenu' },
      ]},
      { type: 'folder', label: 'Tabs', children: [{ id: 'tabs', label: 'Default' }]},
    ]},
    { type: 'folder', label: 'Feedback', children: [
      { id: 'alert', label: 'Alert' },
      { id: 'progress', label: 'Progress' },
    ]},
  ];

  const stories: Record<string, any> = {
    'button-primary': {
      title: 'Inputs / Button', name: 'Primary',
      args: { variant: 'contained', color: 'primary', size: 'medium', label: 'Primary', disabled: false },
      argTypes: {
        variant: { control: 'inline-radio', options: ['text', 'outlined', 'contained'] },
        color: { control: 'select', options: ['primary', 'secondary', 'success', 'warning', 'error'] },
        size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
        label: { control: 'text' }, disabled: { control: 'boolean' },
      },
      render: (args: any) => <Button {...args}>{args.label}</Button>,
      code: "import { Button } from 'bento-design-system';\nimport { defineMeta } from '@storybook/react-vite';\n\nconst meta = defineMeta({ title: 'Inputs/Button', component: Button });\nexport default meta;\n\nexport const Primary = meta.story({\n  args: { variant: 'contained', color: 'primary', children: 'Primary' },\n});",
    },
    'button-secondary': {
      title: 'Inputs / Button', name: 'Secondary',
      args: { variant: 'outlined', color: 'secondary', size: 'medium', label: 'Secondary' },
      argTypes: {
        variant: { control: 'inline-radio', options: ['text', 'outlined', 'contained'] },
        color: { control: 'select', options: ['primary', 'secondary', 'success', 'warning', 'error'] },
      },
      render: (args: any) => <Button {...args}>{args.label}</Button>,
      code: "export const Secondary = meta.story({\n  args: { variant: 'outlined', color: 'secondary', children: 'Secondary' },\n});",
    },
    'button-with-icon': {
      title: 'Inputs / Button', name: 'WithIcon',
      args: { variant: 'contained', color: 'primary', label: 'Send' },
      argTypes: { color: { control: 'select', options: ['primary', 'secondary', 'success'] } },
      render: (args: any) => <Button variant="contained" color={args.color} startIcon={<Icons.Navigation/>}>{args.label}</Button>,
      code: "export const WithIcon = meta.story({\n  args: { variant: 'contained', startIcon: <NavigationIcon />, children: 'Send' },\n});",
    },
    'button-sizes': {
      title: 'Inputs / Button', name: 'Sizes',
      args: { color: 'primary' },
      argTypes: { color: { control: 'select', options: ['primary', 'secondary', 'error'] } },
      render: (args: any) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button variant="contained" size="small" color={args.color}>Small</Button>
          <Button variant="contained" size="medium" color={args.color}>Medium</Button>
          <Button variant="contained" size="large" color={args.color}>Large</Button>
        </Stack>
      ),
      code: "export const Sizes = meta.story({\n  render: (args) => (\n    <Stack direction=\"row\" spacing={1.5}>\n      <Button size=\"small\" {...args}>Small</Button>\n      <Button size=\"medium\" {...args}>Medium</Button>\n      <Button size=\"large\" {...args}>Large</Button>\n    </Stack>\n  ),\n});",
    },
    'tf-basic': {
      title: 'Inputs / TextField', name: 'Basic',
      args: { label: '注文 ID', placeholder: 'ORD-00000', helperText: '', error: false, disabled: false },
      argTypes: {
        label: { control: 'text' }, placeholder: { control: 'text' },
        helperText: { control: 'text' }, error: { control: 'boolean' }, disabled: { control: 'boolean' },
      },
      render: (args: any) => <div style={{ width: 280 }}><TextField {...args}/></div>,
      code: "export const Basic = meta.story({\n  args: { label: '注文 ID', placeholder: 'ORD-00000' },\n});",
    },
    'tf-adornment': {
      title: 'Inputs / TextField', name: 'WithAdornment',
      args: {}, argTypes: {},
      render: () => <div style={{ width: 280 }}><TextField label="検索" slotProps={{ input: { startAdornment: <Icons.Search fontSize="small"/> } }}/></div>,
      code: "export const WithAdornment = meta.story({\n  args: {\n    label: '検索',\n    slotProps: { input: { startAdornment: <SearchIcon /> } },\n  },\n});",
    },
    'nf-basic': {
      title: 'Inputs / NumberField', name: 'Basic',
      args: { label: '数量', defaultValue: 1, min: 0, max: 99, step: 1 },
      argTypes: {
        label: { control: 'text' }, min: { control: 'number' },
        max: { control: 'number' }, step: { control: 'number' },
      },
      render: (args: any) => <div style={{ width: 220 }}><NumberField {...args}/></div>,
      code: "// ★ MUI v9 新規\n// 本番: import { NumberField } from '@mui/material/NumberField';\nimport { NumberField } from 'bento-design-system';\n\nexport const Basic = meta.story({\n  args: { label: '数量', defaultValue: 1, min: 0, max: 99 },\n});",
    },
    'nf-currency': {
      title: 'Inputs / NumberField', name: 'Currency',
      args: { defaultValue: 1500000, step: 10000 },
      argTypes: { step: { control: 'number' } },
      render: (args: any) => <div style={{ width: 220 }}><NumberField label="予算" {...args} format={{ style: 'currency', currency: 'JPY' }}/></div>,
      code: "export const Currency = meta.story({\n  args: {\n    defaultValue: 1500000,\n    step: 10000,\n    format: { style: 'currency', currency: 'JPY' },\n  },\n});",
    },
    'mb-basic': {
      title: 'Navigation / Menubar', name: 'Basic',
      args: {}, argTypes: {},
      render: () => (
        <Menubar>
          <MenubarMenu><MenubarTrigger>ファイル</MenubarTrigger>
            <MenubarContent>
              <MenubarItem shortcut="⌘N">新規作成</MenubarItem>
              <MenubarItem shortcut="⌘O">開く…</MenubarItem>
              <MenubarSeparator/>
              <MenubarItem shortcut="⌘Q">終了</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu><MenubarTrigger>編集</MenubarTrigger>
            <MenubarContent>
              <MenubarItem shortcut="⌘Z">元に戻す</MenubarItem>
              <MenubarItem shortcut="⌘C">コピー</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ),
      code: "// ★ MUI v9 新規\nimport { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from 'bento-design-system';\n\nexport const Basic = meta.story({\n  render: () => (\n    <Menubar>\n      <MenubarMenu>\n        <MenubarTrigger>ファイル</MenubarTrigger>\n        <MenubarContent>\n          <MenubarItem>新規作成</MenubarItem>\n        </MenubarContent>\n      </MenubarMenu>\n    </Menubar>\n  ),\n});",
    },
    'mb-submenu': {
      title: 'Navigation / Menubar', name: 'WithSubmenu',
      args: {}, argTypes: {},
      render: () => (
        <Menubar>
          <MenubarMenu><MenubarTrigger>ファイル</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>新規作成</MenubarItem>
              <MenubarSubmenu label="エクスポート">
                <MenubarItem>PDF</MenubarItem>
                <MenubarItem>CSV</MenubarItem>
                <MenubarItem>GeoJSON</MenubarItem>
              </MenubarSubmenu>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ),
      code: "// v9でサブメニュー正式対応\nexport const WithSubmenu = meta.story({\n  render: () => (\n    <Menubar>\n      <MenubarMenu>\n        <MenubarTrigger>ファイル</MenubarTrigger>\n        <MenubarContent>\n          <MenubarSubmenu label=\"エクスポート\">\n            <MenubarItem>PDF</MenubarItem>\n          </MenubarSubmenu>\n        </MenubarContent>\n      </MenubarMenu>\n    </Menubar>\n  ),\n});",
    },
    'tabs': {
      title: 'Navigation / Tabs', name: 'Default',
      args: { activeTab: 0 },
      argTypes: { activeTab: { control: 'inline-radio', options: [0, 1, 2] } },
      render: (args: any) => <div style={{ width: 400 }}><Tabs value={args.activeTab} onChange={() => {}}><Tab label="概要"/><Tab label="注文"/><Tab label="ログ"/></Tabs></div>,
      code: "export const Default = meta.story({\n  render: () => (\n    <Tabs value={0}>\n      <Tab label=\"概要\" />\n      <Tab label=\"注文\" />\n      <Tab label=\"ログ\" />\n    </Tabs>\n  ),\n});",
    },
    'alert': {
      title: 'Feedback / Alert', name: 'AllSeverities',
      args: { variant: 'standard' },
      argTypes: { variant: { control: 'inline-radio', options: ['standard', 'filled', 'outlined'] } },
      render: (args: any) => (
        <Stack spacing={1} sx={{ width: 360 }}>
          <Alert severity="success" variant={args.variant}>配達完了しました</Alert>
          <Alert severity="info" variant={args.variant}>新メニュー公開</Alert>
          <Alert severity="warning" variant={args.variant}>配達員バッテリー残量低下</Alert>
          <Alert severity="error" variant={args.variant}>通信切断</Alert>
        </Stack>
      ),
      code: "export const AllSeverities = meta.story({\n  render: (args) => (\n    <Stack spacing={1}>\n      <Alert severity=\"success\" {...args}>Success</Alert>\n      <Alert severity=\"info\" {...args}>Info</Alert>\n      <Alert severity=\"warning\" {...args}>Warning</Alert>\n      <Alert severity=\"error\" {...args}>Error</Alert>\n    </Stack>\n  ),\n});",
    },
    'progress': {
      title: 'Feedback / Progress', name: 'Variants',
      args: { value: 60 },
      argTypes: { value: { control: 'number' } },
      render: (args: any) => (
        <Stack spacing={2} sx={{ width: 240 }}>
          <LinearProgress variant="determinate" value={args.value}/>
          <LinearProgress/>
          <Stack direction="row" spacing={2}>
            <CircularProgress size={32}/>
            <CircularProgress size={32} variant="determinate" value={args.value}/>
          </Stack>
        </Stack>
      ),
      code: "export const Variants = meta.story({\n  render: (args) => (\n    <Stack spacing={2}>\n      <LinearProgress variant=\"determinate\" value={args.value} />\n      <LinearProgress />\n      <CircularProgress />\n    </Stack>\n  ),\n});",
    },
    'colors': {
      title: 'Foundations / Colors', name: 'Palette', args: {}, argTypes: {},
      render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, maxWidth: 600 }}>
          {Object.entries(primitive.teal).map(([k, v]) => (
            <div key={k}>
              <div style={{ height: 40, borderRadius: 6, backgroundColor: v, border: `1px solid ${t.border.subtle}` }}/>
              <div style={{ fontSize: 10, fontFamily: fonts.mono, color: t.text.muted, marginTop: 4 }}>teal.{k}</div>
            </div>
          ))}
        </div>
      ),
      code: "import { primitive } from 'bento-design-system';\n\nexport const Palette = meta.story({\n  render: () => <ColorSwatchGrid colors={primitive.teal} />,\n});",
    },
    'typography': {
      title: 'Foundations / Typography', name: 'Scale', args: {}, argTypes: {},
      render: () => (
        <Stack spacing={1}>
          <Typography variant="h1">Display h1</Typography>
          <Typography variant="h3">Title h3</Typography>
          <Typography variant="body1">Body text 日本語混在</Typography>
          <Typography variant="caption" color="secondary">Caption</Typography>
        </Stack>
      ),
      code: "export const Scale = meta.story({\n  render: () => (\n    <Stack spacing={1}>\n      <Typography variant=\"h1\">Display</Typography>\n      <Typography variant=\"body1\">Body</Typography>\n    </Stack>\n  ),\n});",
    },
    'spacing': {
      title: 'Foundations / Spacing', name: 'Grid', args: {}, argTypes: {},
      render: () => (
        <Stack spacing={1}>
          {[4, 8, 12, 16, 24, 32, 48].map((s) => (
            <Stack key={s} direction="row" alignItems="center" spacing={2}>
              <div style={{ width: 60, fontFamily: fonts.mono, fontSize: 12, color: t.text.muted }}>{s}px</div>
              <div style={{ height: 16, width: s, backgroundColor: t.brand.main, borderRadius: 2 }}/>
            </Stack>
          ))}
        </Stack>
      ),
      code: "// 4px base spacing scale\nexport const spacing = (n: number) => `${4 * n}px`;",
    },
  };

  const currentStory = stories[selected] || stories['button-primary'];

  const TreeNode: React.FC<{ node: any; depth?: number }> = ({ node, depth = 0 }) => {
    const [open, setOpen] = useState(node.defaultOpen ?? false);
    if (node.type === 'folder') {
      return (
        <div>
          <button onClick={() => setOpen(!open)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 4,
            padding: `4px ${8 + depth * 12}px`, border: 'none', background: 'transparent', cursor: 'pointer',
            color: t.text.primary, fontSize: 12, fontWeight: 500, fontFamily: fonts.sans, textAlign: 'left',
          }}>
            <span style={{ fontSize: 9, color: t.text.muted, transition: 'transform 0.1s', transform: open ? 'rotate(90deg)' : 'none' }}>▶</span>
            <Icons.Folder fontSize="small" sx={{ width: 12, height: 12, color: t.warning.main }}/>
            <span style={{ flex: 1 }}>{node.label}</span>
            {node.badge && <span style={{ fontSize: 9, padding: '1px 4px', borderRadius: 3, backgroundColor: t.brand.soft, color: t.brand.main, fontWeight: 600 }}>{node.badge}</span>}
          </button>
          {open && node.children.map((child: any, i: number) => <TreeNode key={i} node={child} depth={depth + 1}/>)}
        </div>
      );
    }
    const isSel = selected === node.id;
    return (
      <button onClick={() => setSelected(node.id)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 6,
        padding: `4px ${8 + depth * 12}px`, border: 'none',
        background: isSel ? t.brand.soft : 'transparent', cursor: 'pointer',
        color: isSel ? t.brand.main : t.text.secondary,
        fontSize: 12, fontFamily: fonts.sans, textAlign: 'left',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', border: `1.5px solid ${isSel ? t.brand.main : t.border.strong}`, flexShrink: 0 }}/>
        <span>{node.label}</span>
      </button>
    );
  };

  const vpMap: Record<string, any> = { responsive: '100%', mobile: 375, tablet: 768, desktop: 1200 };
  const canvasBg = bgMode === 'dark' ? primitive.gray[900] : bgMode === 'grid' ? 'transparent' : '#ffffff';

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 50px)', backgroundColor: t.bg.canvas, overflow: 'hidden' }}>
      <div style={{ width: 240, flexShrink: 0, borderRight: `1px solid ${t.border.subtle}`, backgroundColor: t.bg.surface, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 14px', borderBottom: `1px solid ${t.border.subtle}` }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <div style={{ width: 22, height: 22, borderRadius: 4, background: 'linear-gradient(135deg, #FF4785, #FF8A37)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontSize: 12 }}>S</div>
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: 12 }}>
              Storybook <span style={{ color: t.text.muted, fontFamily: fonts.mono, fontSize: 10 }}>10.3</span>
            </Typography>
          </Stack>
        </div>
        <div style={{ padding: '8px 10px', borderBottom: `1px solid ${t.border.subtle}` }}>
          <TextField fullWidth placeholder="Find components..." slotProps={{ input: { startAdornment: <Icons.Search fontSize="small"/> } }}/>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '4px 0' }}>
          {tree.map((node, i) => <TreeNode key={i} node={node}/>)}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ padding: '8px 16px', borderBottom: `1px solid ${t.border.subtle}`, backgroundColor: t.bg.surface, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Breadcrumbs>
            {currentStory.title.split(' / ').map((seg: string, i: number, arr: string[]) =>
              i === arr.length - 1
                ? <Typography key={i} variant="caption" sx={{ fontWeight: 600 }}>{seg}</Typography>
                : <Typography key={i} variant="caption" color="secondary">{seg}</Typography>
            )}
            <Typography variant="caption" color="brand" sx={{ fontWeight: 600 }}>{currentStory.name}</Typography>
          </Breadcrumbs>
          <div style={{ flex: 1 }}/>
          <Tooltip title="Zoom out"><IconButton size="small"><span style={{ fontSize: 14 }}>−</span></IconButton></Tooltip>
          <Tooltip title="Zoom in"><IconButton size="small"><span style={{ fontSize: 14 }}>＋</span></IconButton></Tooltip>
          <Divider orientation="vertical" flexItem sx={{ height: 16, alignSelf: 'center' }}/>
          <div style={{ display: 'flex', gap: 2 }}>
            {[{ v: 'light', label: 'Light' }, { v: 'dark', label: 'Dark' }, { v: 'grid', label: 'Grid' }].map((x) => (
              <button key={x.v} onClick={() => setBgMode(x.v)} style={{
                padding: '4px 8px', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 11,
                backgroundColor: bgMode === x.v ? t.brand.soft : 'transparent',
                color: bgMode === x.v ? t.brand.main : t.text.secondary,
              }}>{x.label}</button>
            ))}
          </div>
          <Divider orientation="vertical" flexItem sx={{ height: 16, alignSelf: 'center' }}/>
          <div style={{ display: 'flex', gap: 2 }}>
            {[{ v: 'responsive', label: 'Auto' }, { v: 'mobile', label: '375' }, { v: 'tablet', label: '768' }, { v: 'desktop', label: '1200' }].map((x) => (
              <button key={x.v} onClick={() => setViewport(x.v)} style={{
                padding: '4px 8px', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 11, fontFamily: fonts.mono,
                backgroundColor: viewport === x.v ? t.brand.soft : 'transparent',
                color: viewport === x.v ? t.brand.main : t.text.secondary,
              }}>{x.label}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 16px', borderBottom: `1px solid ${t.border.subtle}`, backgroundColor: t.bg.surface, display: 'flex', gap: 0 }}>
          {[{ v: 'canvas', label: 'Canvas' }, { v: 'docs', label: 'Docs' }, { v: 'code', label: 'Story' }].map((x) => (
            <button key={x.v} onClick={() => setViewTab(x.v)} style={{
              padding: '10px 14px', border: 'none', background: 'transparent', cursor: 'pointer',
              fontSize: 12, fontWeight: 500, fontFamily: fonts.sans,
              color: viewTab === x.v ? t.brand.main : t.text.secondary,
              borderBottom: `2px solid ${viewTab === x.v ? t.brand.main : 'transparent'}`,
              marginBottom: -1,
            }}>{x.label}</button>
          ))}
        </div>

        <div style={{ flex: 1, overflow: 'auto', backgroundColor: bgMode === 'dark' ? primitive.gray[900] : t.bg.sunken, padding: 16, display: 'flex', flexDirection: 'column' }}>
          {viewTab === 'canvas' && (
            <div style={{
              margin: '0 auto', flex: 1, width: vpMap[viewport], maxWidth: '100%',
              backgroundColor: canvasBg,
              backgroundImage: bgMode === 'grid' ? `linear-gradient(${t.border.subtle} 1px, transparent 1px), linear-gradient(90deg, ${t.border.subtle} 1px, transparent 1px)` : 'none',
              backgroundSize: bgMode === 'grid' ? '20px 20px' : 'auto',
              borderRadius: 8, border: `1px solid ${t.border.subtle}`,
              padding: 40, display: 'grid', placeItems: 'center', minHeight: 200,
            }}>
              {currentStory.render(currentStory.args)}
            </div>
          )}
          {viewTab === 'docs' && (
            <div style={{ maxWidth: 720, margin: '0 auto', backgroundColor: t.bg.surface, padding: 40, borderRadius: 8, border: `1px solid ${t.border.subtle}` }}>
              <Typography variant="h3" gutterBottom>{currentStory.title}</Typography>
              <Typography variant="body1" color="secondary" sx={{ marginBottom: 24 }}>
                Auto-generated documentation from component source + story metadata.
              </Typography>
              <div style={{ padding: 32, border: `1px solid ${t.border.subtle}`, borderRadius: 8, display: 'grid', placeItems: 'center', marginBottom: 24 }}>
                {currentStory.render(currentStory.args)}
              </div>
              <Typography variant="h5" gutterBottom>Props</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell variant="head">Name</TableCell>
                      <TableCell variant="head">Type</TableCell>
                      <TableCell variant="head">Default</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(currentStory.argTypes).map(([k, v]: any) => (
                      <TableRow key={k}>
                        <TableCell sx={{ fontFamily: fonts.mono, fontSize: 12 }}>{k}</TableCell>
                        <TableCell sx={{ fontFamily: fonts.mono, fontSize: 12, color: t.accent.main }}>
                          {v.control === 'select' || v.control === 'inline-radio'
                            ? v.options.map((o: any) => `'${o}'`).join(' | ')
                            : v.control}
                        </TableCell>
                        <TableCell sx={{ fontFamily: fonts.mono, fontSize: 12 }}>
                          {JSON.stringify(currentStory.args[k]) || '—'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          {viewTab === 'code' && (
            <div style={{ maxWidth: 900, margin: '0 auto', width: '100%' }}>
              <Card sx={{ overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', backgroundColor: t.bg.sunken, borderBottom: `1px solid ${t.border.subtle}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ fontFamily: fonts.mono, color: t.text.secondary }}>
                    {currentStory.name}.stories.tsx
                  </Typography>
                  <Chip size="small" label="CSF Factories (v10)" variant="outlined"/>
                </div>
                <pre style={{
                  margin: 0, padding: 20, fontFamily: fonts.mono, fontSize: 12,
                  backgroundColor: mode === 'dark' ? primitive.gray[900] : primitive.gray[50],
                  color: t.text.primary, overflow: 'auto', lineHeight: 1.65,
                }}>
                  <code>{currentStory.code}</code>
                </pre>
              </Card>
            </div>
          )}
        </div>

        <div style={{ borderTop: `1px solid ${t.border.subtle}`, backgroundColor: t.bg.surface, maxHeight: 280 }}>
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${t.border.subtle}`, padding: '0 12px' }}>
            {[
              { v: 'controls', label: 'Controls', badge: Object.keys(currentStory.argTypes).length },
              { v: 'actions', label: 'Actions' },
              { v: 'a11y', label: 'Accessibility', badge: 0 },
              { v: 'interactions', label: 'Interactions' },
            ].map((x: any) => (
              <button key={x.v} onClick={() => setBottomTab(x.v)} style={{
                padding: '10px 12px', border: 'none', background: 'transparent', cursor: 'pointer',
                fontSize: 11, fontWeight: 500, fontFamily: fonts.sans,
                color: bottomTab === x.v ? t.brand.main : t.text.secondary,
                borderBottom: `2px solid ${bottomTab === x.v ? t.brand.main : 'transparent'}`,
                marginBottom: -1, display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                {x.label}
                {x.badge != null && (
                  <span style={{
                    fontSize: 10, padding: '0 5px', borderRadius: 8, minWidth: 16, textAlign: 'center',
                    backgroundColor: x.badge > 0 ? t.border.subtle : 'transparent',
                    color: x.badge > 0 ? t.text.secondary : t.text.muted,
                  }}>{x.badge}</span>
                )}
              </button>
            ))}
          </div>
          <div style={{ padding: 12, overflow: 'auto', maxHeight: 240 }}>
            {bottomTab === 'controls' && (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell variant="head">Name</TableCell>
                      <TableCell variant="head">Control</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(currentStory.argTypes).map(([k, v]: any) => (
                      <TableRow key={k}>
                        <TableCell sx={{ fontFamily: fonts.mono, fontSize: 12, width: 140 }}>{k}</TableCell>
                        <TableCell>
                          {v.control === 'text' && <div style={{ maxWidth: 260 }}><TextField value={String(currentStory.args[k] ?? '')} onChange={() => {}}/></div>}
                          {v.control === 'number' && <div style={{ maxWidth: 140 }}><NumberField value={Number(currentStory.args[k] ?? 0)} onValueChange={() => {}}/></div>}
                          {v.control === 'boolean' && <Switch checked={!!currentStory.args[k]} onChange={() => {}}/>}
                          {v.control === 'inline-radio' && (
                            <ToggleButtonGroup size="small" exclusive value={currentStory.args[k]} onChange={() => {}}>
                              {v.options.map((o: any) => <ToggleButton key={o} value={o}>{String(o)}</ToggleButton>)}
                            </ToggleButtonGroup>
                          )}
                          {v.control === 'select' && (
                            <div style={{ width: 200 }}>
                              <Select defaultValue={currentStory.args[k]}>
                                {v.options.map((o: any) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                              </Select>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {Object.keys(currentStory.argTypes).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          <Typography variant="caption" color="secondary">このストーリーにはControlsがありません</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {bottomTab === 'actions' && (
              <Stack spacing={0.5}>
                {[
                  { t: '12:34:56', e: 'onClick', args: '{ target: button }' },
                  { t: '12:34:58', e: 'onChange', args: '{ value: "primary" }' },
                ].map((log, i) => (
                  <div key={i} style={{
                    fontFamily: fonts.mono, fontSize: 11, padding: '6px 8px',
                    backgroundColor: i % 2 ? t.bg.sunken : 'transparent', borderRadius: 4,
                  }}>
                    <span style={{ color: t.text.muted }}>[{log.t}]</span>{' '}
                    <span style={{ color: t.brand.main }}>{log.e}</span>{' '}
                    <span style={{ color: t.text.secondary }}>{log.args}</span>
                  </div>
                ))}
              </Stack>
            )}
            {bottomTab === 'a11y' && (
              <Stack spacing={1}>
                <Alert severity="success" sx={{ padding: '6px 10px' }}>
                  <Typography variant="caption" sx={{ color: 'inherit' }}>
                    <strong>0 violations</strong> · axe-core による自動チェックに合格
                  </Typography>
                </Alert>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell variant="head">Rule</TableCell>
                        <TableCell variant="head">Impact</TableCell>
                        <TableCell variant="head">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[
                        { r: 'color-contrast', i: 'serious', s: 'pass' },
                        { r: 'button-name', i: 'critical', s: 'pass' },
                        { r: 'aria-valid-attr', i: 'critical', s: 'pass' },
                        { r: 'focus-order-semantics', i: 'moderate', s: 'pass' },
                      ].map((r) => (
                        <TableRow key={r.r}>
                          <TableCell sx={{ fontFamily: fonts.mono, fontSize: 11 }}>{r.r}</TableCell>
                          <TableCell><Chip size="small" variant="outlined" label={r.i}/></TableCell>
                          <TableCell><Chip size="small" color="success" label={r.s} icon={<Icons.Check fontSize="small"/>}/></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            )}
            {bottomTab === 'interactions' && (
              <Stack spacing={1}>
                <Typography variant="caption" color="secondary">Vitest browser mode で story.test() を実行</Typography>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, padding: 12, backgroundColor: t.bg.sunken, borderRadius: 6 }}>
                  <div><span style={{ color: t.success.main }}>✓</span> renders with default args <span style={{ color: t.text.muted }}>(12ms)</span></div>
                  <div><span style={{ color: t.success.main }}>✓</span> click triggers onClick <span style={{ color: t.text.muted }}>(8ms)</span></div>
                  <div><span style={{ color: t.success.main }}>✓</span> disabled prevents interaction <span style={{ color: t.text.muted }}>(5ms)</span></div>
                  <div style={{ marginTop: 8, color: t.text.muted }}>3 tests passed · 0.025s</div>
                </div>
              </Stack>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
