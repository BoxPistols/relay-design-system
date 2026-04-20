import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography, Stack } from '../../components';

const meta: Meta = { title: 'Foundations/Typography' };
export default meta;

export const Scale: StoryObj = {
  render: () => (
    <Stack spacing={1.5}>
      <Typography variant="h1">Display h1 · Instrument Serif</Typography>
      <Typography variant="h2">Headline h2 · Instrument Serif</Typography>
      <Typography variant="h3">Title h3 · Inter 600</Typography>
      <Typography variant="h4">Title h4</Typography>
      <Typography variant="h5">Title h5</Typography>
      <Typography variant="h6">Title h6</Typography>
      <Typography variant="subtitle1">Subtitle 1 · やや強調</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>
      <Typography variant="body1">Body 1 — 本文テキスト。日本語と英字が混在する文章の可読性を優先。</Typography>
      <Typography variant="body2" color="secondary">Body 2 — 補助テキスト</Typography>
      <Typography variant="caption" color="secondary">Caption · 0.75rem</Typography>
      <Typography variant="overline" color="brand">OVERLINE · TRACKED</Typography>
    </Stack>
  ),
};
