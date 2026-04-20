import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip, Stack } from '../../../components';
import * as Icons from '../../../icons';

const meta = {
  title: 'Components/Data Display/Chip',
  component: Chip,
  argTypes: {
    variant: { control: 'inline-radio', options: ['filled', 'outlined'] },
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'] },
    size: { control: 'inline-radio', options: ['small', 'medium'] },
  },
  args: { label: 'Chip' },
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};
export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {(['default','primary','secondary','success','warning','error','info'] as const).map((c) => (
        <Chip key={c} label={c} color={c}/>
      ))}
    </Stack>
  ),
};
export const Outlined: Story = { args: { variant: 'outlined', color: 'primary' } };
export const Deletable: Story = { args: { onDelete: () => alert('deleted') } };
export const WithIcon: Story = { args: { icon: <Icons.Star/>, color: 'warning' } };
