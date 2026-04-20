import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Stack } from '../../../components';
import * as Icons from '../../../icons';

const meta = {
  title: 'Components/Inputs/Button',
  component: Button,
  argTypes: {
    variant: { control: 'inline-radio', options: ['text', 'outlined', 'contained'] },
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'] },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: { children: 'Button' },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'contained', color: 'primary' } };
export const Secondary: Story = { args: { variant: 'outlined' } };
export const Text: Story = { args: { variant: 'text' } };
export const Disabled: Story = { args: { variant: 'contained', disabled: true } };
export const WithStartIcon: Story = {
  args: { variant: 'contained', startIcon: <Icons.Add/>, children: 'Create' },
};
export const WithEndIcon: Story = {
  args: { variant: 'contained', endIcon: <Icons.ArrowForward/>, children: 'Next' },
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Button {...args} size="small">Small</Button>
      <Button {...args} size="medium">Medium</Button>
      <Button {...args} size="large">Large</Button>
    </Stack>
  ),
  args: { variant: 'contained' },
};

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={1.5} flexWrap="wrap">
      {(['primary','secondary','success','warning','error','info'] as const).map((c) => (
        <Button key={c} variant="contained" color={c}>{c}</Button>
      ))}
    </Stack>
  ),
};
