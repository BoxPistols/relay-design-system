import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Typography } from '../../components';
import { useTokens } from '../../theme';
import { primitive, fonts } from '../../tokens';

const meta: Meta = { title: 'Foundations/Colors' };
export default meta;

const Swatch = ({ name, value }: { name: string; value: string }) => {
  const t = useTokens();
  return (
    <div>
      <div style={{ height: 56, borderRadius: 8, backgroundColor: value, border: `1px solid ${t.border.subtle}` }}/>
      <div style={{ fontSize: 11, fontFamily: fonts.mono, marginTop: 4 }}>{name}</div>
      <div style={{ fontSize: 10, fontFamily: fonts.mono, opacity: 0.6 }}>{value}</div>
    </div>
  );
};

export const Brand: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 700 }}>
      <Typography variant="h6" gutterBottom>Brand (teal)</Typography>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(88px, 1fr))', gap: 12 }}>
        {Object.entries(primitive.teal).map(([k, v]) => <Swatch key={k} name={`teal.${k}`} value={v}/>)}
      </div>
    </div>
  ),
};

export const Neutral: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 700 }}>
      <Typography variant="h6" gutterBottom>Neutral (gray)</Typography>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(88px, 1fr))', gap: 12 }}>
        {Object.entries(primitive.gray).map(([k, v]) => <Swatch key={k} name={`gray.${k}`} value={v}/>)}
      </div>
    </div>
  ),
};

export const Semantic: StoryObj = {
  render: () => {
    const t = useTokens();
    return (
      <div style={{ maxWidth: 700 }}>
        <Typography variant="h6" gutterBottom>Semantic tokens</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
          <Swatch name="brand.main" value={t.brand.main}/>
          <Swatch name="accent.main" value={t.accent.main}/>
          <Swatch name="success.main" value={t.success.main}/>
          <Swatch name="warning.main" value={t.warning.main}/>
          <Swatch name="danger.main" value={t.danger.main}/>
          <Swatch name="info.main" value={t.info.main}/>
        </div>
      </div>
    );
  },
};
