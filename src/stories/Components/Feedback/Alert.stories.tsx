import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, Stack } from '../../../components';

const meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  argTypes: {
    severity: { control: 'inline-radio', options: ['success', 'info', 'warning', 'error'] },
    variant: { control: 'inline-radio', options: ['standard', 'filled', 'outlined'] },
  },
  args: { severity: 'info', children: '新しいファームウェアが利用可能です' },
  decorators: [(S) => <div style={{ width: 420 }}><S/></div>],
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof Alert>;

export const Standard: Story = {};
export const Filled: Story = { args: { variant: 'filled' } };
export const Outlined: Story = { args: { variant: 'outlined' } };
export const WithClose: Story = { args: { severity: 'error', onClose: () => {}, children: '通信が切断されました' } };

export const AllSeverities: Story = {
  render: (args) => (
    <Stack spacing={1}>
      <Alert severity="success" variant={args.variant}>整備が完了しました</Alert>
      <Alert severity="info" variant={args.variant}>新しいファームウェアが利用可能です</Alert>
      <Alert severity="warning" variant={args.variant}>バッテリー残量低下</Alert>
      <Alert severity="error" variant={args.variant}>通信が切断されました</Alert>
    </Stack>
  ),
};
