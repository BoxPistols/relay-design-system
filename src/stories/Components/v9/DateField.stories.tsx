import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateField, TimeField, DateTimeField } from '../../../components/DateField';
import { Stack } from '../../../components';

const meta = {
  title: 'Components/v9 New/DateField',
  component: DateField,
  parameters: { layout: 'centered' },
  decorators: [(S) => <div style={{ width: 280 }}><S/></div>],
} satisfies Meta<typeof DateField>;
export default meta;
type Story = StoryObj<typeof DateField>;

/**
 * ★ MUI v9 · Base UI pickers
 *
 * ```tsx
 * import { DateField, TimeField, DateTimeField } from '@mui/material/DateField';
 * ```
 *
 * - セクション単位の入力 (YYYY/MM/DD)
 * - 矢印キー / 直接タイプで更新
 * - `slotProps.input` / `slotProps.popper` / `slotProps.day` 対応
 */
export const Basic: Story = {
  args: { label: '配達希望日', defaultValue: new Date() },
};

export const WithRange: Story = {
  render: (args) => (
    <DateField {...args}
      label="配車予約日" defaultValue={new Date()}
      minDate={new Date()}
      maxDate={(() => { const d = new Date(); d.setMonth(d.getMonth() + 3); return d; })()}
    />
  ),
};

export const Time: Story = {
  render: () => <TimeField label="出発時刻" defaultValue={new Date()} step={15}/>,
};

export const DateTime: Story = {
  render: () => <DateTimeField label="予約日時" defaultValue={new Date()}/>,
};

export const Combo: Story = {
  render: () => (
    <Stack spacing={2}>
      <DateField label="日付" defaultValue={new Date()}/>
      <TimeField label="時刻" defaultValue={new Date()}/>
      <DateTimeField label="日時"/>
    </Stack>
  ),
  decorators: [(S) => <div style={{ width: 420 }}><S/></div>],
};
