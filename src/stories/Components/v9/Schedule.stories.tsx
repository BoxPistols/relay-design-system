import type { Meta, StoryObj } from '@storybook/react-vite';
import { Schedule } from '../../../components/Schedule';
import type { ScheduleEvent } from '../../../components/Schedule';

const meta: Meta<typeof Schedule> = {
  title: 'Components/v9 New/Schedule',
  component: Schedule,
  parameters: { layout: 'padded' },
  decorators: [(S) => <div style={{ width: 860 }}><S/></div>],
};
export default meta;
type Story = StoryObj<typeof Schedule>;

const base = new Date();
const mk = (dayOffset: number, h: number, dur: number, title: string, color?: ScheduleEvent['color'], description?: string): ScheduleEvent => {
  const s = new Date(base); s.setDate(s.getDate() + dayOffset); s.setHours(h, 0, 0, 0);
  const e = new Date(s); e.setHours(h + dur);
  return { id: `${dayOffset}-${h}-${title}`, title, start: s, end: e, color, description };
};

const sample: ScheduleEvent[] = [
  mk(0, 9, 1, '朝礼 / 配達員ブリーフィング', 'info'),
  mk(0, 11, 2, 'ランチピーク枠', 'primary', '新宿エリア · 増員 +8名'),
  mk(0, 14, 1, '車両点検 (RDR-0203)', 'warning'),
  mk(1, 10, 3, '新規加盟店オンボーディング', 'success', 'Curry Lab'),
  mk(1, 15, 1, '配達員研修', 'secondary'),
  mk(2, 8, 1, 'レンタカー清掃 (CAR-042)'),
  mk(2, 13, 2, 'ディナー枠拡張', 'primary'),
  mk(3, 10, 1, '月次メニュー会議', 'error', '加盟店向け'),
  mk(5, 9, 4, '週末キャンペーン準備', 'info'),
];

/**
 * ★ MUI v9 新規 · Base UI ベース
 *
 * ```tsx
 * import {
 *   Schedule, ScheduleMonthView, ScheduleWeekView,
 *   ScheduleDayView, ScheduleTimeline,
 * } from '@mui/material/Schedule';
 * ```
 *
 * `view` prop で月/週/日/タイムライン を切替。
 * `events` は `{ id, title, start, end, color?, description? }` の配列。
 */
export const MonthView: Story = {
  args: { view: 'month', events: sample },
};

export const WeekView: Story = {
  args: { view: 'week', events: sample },
};

export const DayView: Story = {
  args: { view: 'day', events: sample },
};

export const TimelineView: Story = {
  args: { view: 'timeline', events: sample },
};

export const Empty: Story = {
  args: { view: 'day', events: [] },
};
