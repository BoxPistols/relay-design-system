import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from '../../../components';

const meta = {
  title: 'Components/Inputs/Slider',
  component: Slider,
  decorators: [(S) => <div style={{ width: 280, padding: 16 }}><S/></div>],
} satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = { args: { defaultValue: 60 } };
export const WithRange: Story = { args: { defaultValue: 30, min: 0, max: 200, step: 10 } };
export const Small: Story = { args: { defaultValue: 50, size: 'small' } };
