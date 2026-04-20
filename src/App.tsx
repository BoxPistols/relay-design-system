import React, { useState } from 'react';
import { ThemeProvider } from './theme';
import { IconButton, Stack, Typography, ToggleButtonGroup, ToggleButton } from './components';
import * as Icons from './icons';
import {
  FoundationsPage, V9NewPage, StorybookPage,
  DashboardPage, MapPage, LandingPage,
} from './pages';

type Page = 'foundations' | 'v9new' | 'storybook' | 'dashboard' | 'map' | 'landing';

const Nav: React.FC<{
  page: Page; setPage: (p: Page) => void;
  mode: 'light' | 'dark'; setMode: (m: 'light' | 'dark') => void;
}> = ({ page, setPage, mode, setMode }) => (
  <div style={{
    position: 'sticky', top: 0, zIndex: 100,
    padding: '8px 16px',
    display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
    backdropFilter: 'blur(12px)',
    background: mode === 'dark' ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.9)',
    borderBottom: `1px solid ${mode === 'dark' ? '#1a2233' : '#dde1e8'}`,
  }}>
    <Stack direction="row" spacing={1} alignItems="center" sx={{ marginRight: 8 }}>
      <div style={{
        width: 22, height: 22, borderRadius: 4,
        backgroundColor: mode === 'dark' ? '#3cc0a2' : '#11856e',
        display: 'grid', placeItems: 'center',
      }}>
        <Icons.DeliveryDining sx={{ color: '#fff', width: 13, height: 13 }}/>
      </div>
      <Typography variant="caption" sx={{ fontWeight: 700, fontSize: 13 }}>Bento DS</Typography>
    </Stack>
    <ToggleButtonGroup size="small" exclusive value={page} onChange={(_: any, v: any) => v && setPage(v as Page)}>
      <ToggleButton value="foundations">Foundations</ToggleButton>
      <ToggleButton value="v9new">v9 New</ToggleButton>
      <ToggleButton value="storybook">Storybook</ToggleButton>
      <ToggleButton value="dashboard">Dashboard</ToggleButton>
      <ToggleButton value="map">Map</ToggleButton>
      <ToggleButton value="landing">Landing</ToggleButton>
    </ToggleButtonGroup>
    <div style={{ flex: 1 }}/>
    <IconButton size="small" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      {mode === 'light' ? <Icons.Moon fontSize="small"/> : <Icons.Sun fontSize="small"/>}
    </IconButton>
  </div>
);

export const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [page, setPage] = useState<Page>('foundations');

  return (
    <ThemeProvider mode={mode}>
      <Nav page={page} setPage={setPage} mode={mode} setMode={setMode}/>
      <main style={{ minHeight: 'calc(100vh - 50px)' }}>
        {page === 'foundations' && <FoundationsPage/>}
        {page === 'v9new'       && <V9NewPage/>}
        {page === 'storybook'   && <StorybookPage/>}
        {page === 'dashboard'   && <DashboardPage/>}
        {page === 'map'         && <MapPage/>}
        {page === 'landing'     && <LandingPage/>}
      </main>
    </ThemeProvider>
  );
};
