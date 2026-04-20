import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup, Stack } from '../../../components';

const meta = {
  title: 'Components/Data Display/Avatar',
  component: Avatar,
  argTypes: {
    variant: { control: 'inline-radio', options: ['circular', 'rounded', 'square'] },
    size: { control: 'number' },
  },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = { args: { children: 'YK' } };
export const Rounded: Story = { args: { variant: 'rounded', children: '田', size: 48 } };
export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar>Y</Avatar>
      <Avatar>S</Avatar>
      <Avatar>T</Avatar>
      <Avatar>+</Avatar>
      <Avatar>+</Avatar>
    </AvatarGroup>
  ),
};
