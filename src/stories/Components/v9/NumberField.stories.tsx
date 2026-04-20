import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberField } from '../../../components';

const meta: Meta<typeof NumberField> = {
  title: 'Components/v9 New/NumberField',
  component: NumberField,
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['small', 'medium'] },
  },
  args: { label: '数量', defaultValue: 1, min: 0, max: 99, step: 1 },
  decorators: [(S) => <div style={{ width: 220 }}><S/></div>],
};
export default meta;
type Story = StoryObj<typeof NumberField>;

/**
 * ★ MUI v9 新規 · Base UI ベース
 *
 * ```tsx
 * import { NumberField } from '@mui/material/NumberField';
 * ```
 */
export const Basic: Story = {};

export const Range: Story = {
  args: { label: '飛行高度 (m)', defaultValue: 120, min: 0, max: 500, step: 10 },
};

export const Currency: Story = {
  args: {
    label: '予算',
    defaultValue: 1500000,
    step: 10000,
    format: { style: 'currency', currency: 'JPY' },
  },
};

export const Percent: Story = {
  args: {
    label: 'バッテリー',
    defaultValue: 75,
    min: 0,
    max: 100,
    format: { style: 'percent' },
  },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: 42 } };
