import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton, Stack } from '../../../components';
import * as Icons from '../../../icons';

const meta: Meta<typeof IconButton> = {
  title: 'Components/Inputs/IconButton',
  component: IconButton,
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'inherit'] },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = { args: { children: <Icons.Settings/> } };
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton size="small"><Icons.Notifications/></IconButton>
      <IconButton size="medium"><Icons.Notifications/></IconButton>
      <IconButton size="large"><Icons.Notifications/></IconButton>
    </Stack>
  ),
};
