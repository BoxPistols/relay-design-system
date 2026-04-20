import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, MenuItem } from '../../../components';

const meta = {
  title: 'Components/Inputs/Select',
  decorators: [(S) => <div style={{ width: 220 }}><S/></div>],
} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <Select label="ステータス" defaultValue="active">
      <MenuItem value="active">稼働中</MenuItem>
      <MenuItem value="maintenance">整備中</MenuItem>
      <MenuItem value="idle">待機</MenuItem>
    </Select>
  ),
};
