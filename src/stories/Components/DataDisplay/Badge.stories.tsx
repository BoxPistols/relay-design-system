import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, IconButton, Stack } from '../../../components';
import * as Icons from '../../../icons';

const meta: Meta<typeof Badge> = {
  title: 'Components/Data Display/Badge',
  component: Badge,
  argTypes: {
    color: { control: 'select', options: ['default', 'primary', 'error', 'warning', 'success'] },
    variant: { control: 'inline-radio', options: ['standard', 'dot'] },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const WithCount: Story = {
  args: { badgeContent: 4, color: 'error', children: <IconButton><Icons.Notifications/></IconButton> },
};
export const Dot: Story = {
  args: { variant: 'dot', color: 'success', children: <IconButton><Icons.Settings/></IconButton> },
};
export const Max: Story = {
  args: { badgeContent: 150, max: 99, color: 'primary', children: <IconButton><Icons.Notifications/></IconButton> },
};
