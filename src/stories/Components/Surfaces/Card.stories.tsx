import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardContent, CardActions, Button, Typography } from '../../../components';

const meta: Meta = { title: 'Components/Surfaces/Card' };
export default meta;

export const Basic: StoryObj = {
  render: () => (
    <Card sx={{ width: 320 }}>
      <CardHeader title="運用レポート" subheader="2026年4月20日"/>
      <CardContent>
        <Typography variant="body2" color="secondary">
          本日の運用状況サマリー。全加盟店・配達員が正常に稼働中。
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">詳細</Button>
        <Button size="small" variant="text">閉じる</Button>
      </CardActions>
    </Card>
  ),
};

export const Elevation: StoryObj = {
  render: () => (
    <Card variant="elevation" sx={{ width: 280, padding: 20 }}>
      <Typography variant="subtitle2" gutterBottom>Elevation variant</Typography>
      <Typography variant="body2" color="secondary">軽い影付きのカード。</Typography>
    </Card>
  ),
};
