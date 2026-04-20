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
  mk(0, 9, 1, '朝会', 'info'),
  mk(0, 11, 2, 'D-001 フライト', 'primary', '大手町 → 羽田'),
  mk(0, 14, 1, '機体点検', 'warning'),
  mk(1, 10, 3, 'D-003 長距離ミッション', 'success', '東京湾巡回'),
  mk(1, 15, 1, '安全講習', 'secondary'),
  mk(2, 8, 1, 'バッテリー交換'),
  mk(2, 13, 2, 'D-007 撮影案件', 'primary'),
  mk(3, 10, 1, '整備検査', 'error', '年次点検'),
  mk(5, 9, 4, 'D-010 広域調査', 'info'),
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
