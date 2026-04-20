import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from '../../../components';
import * as Icons from '../../../icons';

const meta: Meta<typeof TextField> = {
  title: 'Components/Inputs/TextField',
  component: TextField,
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    required: { control: 'boolean' },
    multiline: { control: 'boolean' },
  },
  args: { label: '機体ID', placeholder: 'DRN-0000' },
  decorators: [(S) => <div style={{ width: 280 }}><S/></div>],
};
export default meta;
type Story = StoryObj<typeof TextField>;

export const Basic: Story = {};
export const WithHelperText: Story = { args: { helperText: '5〜10文字で入力', label: 'Email' } };
export const ErrorState: Story = { args: { error: true, helperText: '必須項目です' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'DRN-0042' } };
export const WithAdornment: Story = {
  args: { label: '検索', slotProps: { input: { startAdornment: <Icons.Search fontSize="small"/> } } },
};
export const Multiline: Story = { args: { multiline: true, rows: 4, label: '備考', placeholder: '任意のメモ...' } };
