import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton, Stack } from '../../../components';

const meta: Meta = { title: 'Components/Feedback/Skeleton' };
export default meta;

export const Shapes: StoryObj = {
  render: () => (
    <Stack spacing={2} sx={{ width: 280 }}>
      <Skeleton width="60%"/>
      <Skeleton width="80%"/>
      <Skeleton variant="rectangular" width={280} height={120}/>
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton variant="circular" width={48} height={48}/>
        <Stack spacing={0.5} sx={{ flex: 1 }}>
          <Skeleton width="40%"/>
          <Skeleton width="70%"/>
        </Stack>
      </Stack>
    </Stack>
  ),
};
