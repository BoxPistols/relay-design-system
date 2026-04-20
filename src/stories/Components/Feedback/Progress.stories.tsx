import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinearProgress, CircularProgress, Stack } from '../../../components';

const meta: Meta = { title: 'Components/Feedback/Progress' };
export default meta;

export const Linear: StoryObj = {
  render: () => (
    <Stack spacing={2} sx={{ width: 280 }}>
      <LinearProgress/>
      <LinearProgress variant="determinate" value={30}/>
      <LinearProgress variant="determinate" value={60} color="success"/>
      <LinearProgress variant="determinate" value={90} color="warning"/>
    </Stack>
  ),
};

export const Circular: StoryObj = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <CircularProgress/>
      <CircularProgress size={32}/>
      <CircularProgress size={64} thickness={4}/>
      <CircularProgress variant="determinate" value={75}/>
    </Stack>
  ),
};
