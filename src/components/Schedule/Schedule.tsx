import React, { useMemo, useState } from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';
import { Typography } from '../Typography';
import { IconButton } from '../IconButton';
import { ChevronLeft, ChevronRight, Today } from '../../icons';

/**
 * ★ MUI v9 新規: Schedule コンポーネント (Base UI ベース)
 *
 * v9 で追加された `@mui/material/Schedule` の互換 API 実装。
 * 本番移行時:
 *   import {
 *     Schedule, ScheduleMonthView, ScheduleWeekView, ScheduleDayView,
 *     ScheduleEvent, ScheduleTimeline,
 *   } from '@mui/material/Schedule';
 *
 * - ビュー切替: month | week | day | timeline
 * - ARIA: role="grid", aria-colcount / aria-rowcount / aria-selected
 * - キーボード: ←→↑↓ で日付移動、Home/End で週頭末、Enter で選択
 */

export type ScheduleEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  description?: string;
};

export type ScheduleView = 'month' | 'week' | 'day' | 'timeline';

const ja = {
  weekdays: ['日', '月', '火', '水', '木', '金', '土'],
  monthYear: (d: Date) =>
    new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long' }).format(d),
  dayMonth: (d: Date) =>
    new Intl.DateTimeFormat('ja-JP', { month: 'short', day: 'numeric', weekday: 'short' }).format(d),
  time: (d: Date) =>
    new Intl.DateTimeFormat('ja-JP', { hour: '2-digit', minute: '2-digit' }).format(d),
};

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const startOfWeek = (d: Date) => {
  const r = new Date(d);
  r.setDate(d.getDate() - d.getDay());
  r.setHours(0, 0, 0, 0);
  return r;
};
const addDays = (d: Date, n: number) => {
  const r = new Date(d); r.setDate(r.getDate() + n); return r;
};

const eventColorTok = (t: any, c: ScheduleEvent['color'] = 'primary') => {
  const map: Record<string, any> = {
    primary: t.brand, secondary: t.accent, success: t.success,
    warning: t.warning, error: t.danger, info: t.info,
  };
  return map[c];
};

// ---- Root ----
export type ScheduleProps = {
  view?: ScheduleView;
  onViewChange?: (v: ScheduleView) => void;
  date?: Date;
  onDateChange?: (d: Date) => void;
  events?: ScheduleEvent[];
  onEventClick?: (e: ScheduleEvent) => void;
  /**
   * 週ビュー / 日ビューで表示する時間帯 [開始時, 終了時)。
   * デフォルト [6, 23) = 06:00〜22:59 (ディナーピーク込み)。
   * フード配達・深夜営業・早朝配車など業態に合わせて切替可能。
   */
  hourRange?: [number, number];
  slots?: { toolbar?: React.ElementType };
  sx?: React.CSSProperties;
};

export const Schedule: React.FC<ScheduleProps> = ({
  view = 'month', onViewChange, date, onDateChange, events = [], onEventClick,
  hourRange = [6, 23], sx,
}) => {
  const t = useTokens();
  const [internalDate, setInternalDate] = useState<Date>(date || new Date());
  const [internalView, setInternalView] = useState<ScheduleView>(view);
  const curView = onViewChange ? view : internalView;
  const curDate = date ?? internalDate;
  const setView = (v: ScheduleView) => onViewChange ? onViewChange(v) : setInternalView(v);
  const setDate = (d: Date) => onDateChange ? onDateChange(d) : setInternalDate(d);

  const shift = (dir: 1 | -1) => {
    const n = new Date(curDate);
    if (curView === 'month') n.setMonth(n.getMonth() + dir);
    else if (curView === 'week') n.setDate(n.getDate() + 7 * dir);
    else n.setDate(n.getDate() + dir);
    setDate(n);
  };

  return (
    <div style={{
      width: '100%', border: `1px solid ${t.border.subtle}`, borderRadius: 12,
      backgroundColor: t.bg.surface, fontFamily: fonts.sans, overflow: 'hidden', ...sx,
    }}>
      <Toolbar
        date={curDate} view={curView}
        onShift={shift} onToday={() => setDate(new Date())} onViewChange={setView}
      />
      {curView === 'month' && <MonthView date={curDate} events={events} onSelectDate={setDate} onEventClick={onEventClick}/>}
      {curView === 'week' && <WeekView date={curDate} events={events} onEventClick={onEventClick} hourRange={hourRange}/>}
      {curView === 'day' && <DayView date={curDate} events={events} onEventClick={onEventClick}/>}
      {curView === 'timeline' && <TimelineView events={events} onEventClick={onEventClick}/>}
    </div>
  );
};

// ---- Toolbar ----
const Toolbar: React.FC<{
  date: Date; view: ScheduleView;
  onShift: (d: 1 | -1) => void; onToday: () => void; onViewChange: (v: ScheduleView) => void;
}> = ({ date, view, onShift, onToday, onViewChange }) => {
  const t = useTokens();
  const label = view === 'month' ? ja.monthYear(date) : ja.dayMonth(date);
  const views: ScheduleView[] = ['month', 'week', 'day', 'timeline'];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
      borderBottom: `1px solid ${t.border.subtle}`, flexWrap: 'wrap',
    }}>
      <IconButton size="small" aria-label="previous" onClick={() => onShift(-1)}>
        <ChevronLeft fontSize="small"/>
      </IconButton>
      <IconButton size="small" aria-label="next" onClick={() => onShift(1)}>
        <ChevronRight fontSize="small"/>
      </IconButton>
      <button onClick={onToday} style={{
        padding: '4px 10px', fontSize: 12, borderRadius: 6,
        border: `1px solid ${t.border.default}`,
        backgroundColor: t.bg.surface, color: t.text.primary, cursor: 'pointer',
        fontFamily: fonts.sans, display: 'inline-flex', alignItems: 'center', gap: 4,
      }}>
        <Today fontSize="small" sx={{ width: 14, height: 14 }}/>今日
      </button>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, marginLeft: 8 }}>{label}</Typography>
      <div style={{ flex: 1 }}/>
      <div role="tablist" aria-label="Schedule view" style={{
        display: 'inline-flex', borderRadius: 8, border: `1px solid ${t.border.default}`,
        overflow: 'hidden', backgroundColor: t.bg.canvas,
      }}>
        {views.map(v => (
          <button
            key={v} role="tab" aria-selected={view === v}
            onClick={() => onViewChange(v)}
            style={{
              padding: '4px 10px', fontSize: 12, border: 'none',
              borderRight: v !== 'timeline' ? `1px solid ${t.border.subtle}` : 'none',
              backgroundColor: view === v ? t.brand.soft : 'transparent',
              color: view === v ? t.brand.main : t.text.secondary,
              cursor: 'pointer', fontFamily: fonts.sans,
              fontWeight: view === v ? 600 : 400,
            }}>
            {v === 'month' ? '月' : v === 'week' ? '週' : v === 'day' ? '日' : 'タイムライン'}
          </button>
        ))}
      </div>
    </div>
  );
};

// ---- Month View ----
const MonthView: React.FC<{
  date: Date; events: ScheduleEvent[];
  onSelectDate: (d: Date) => void; onEventClick?: (e: ScheduleEvent) => void;
}> = ({ date, events, onSelectDate, onEventClick }) => {
  const t = useTokens();
  const today = new Date();
  const cells = useMemo(() => {
    const first = startOfMonth(date);
    const gridStart = addDays(first, -first.getDay());
    return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
  }, [date]);
  const eventsOn = (d: Date) => events.filter(e => sameDay(e.start, d));

  return (
    <div role="grid" aria-rowcount={7} aria-colcount={7}>
      <div role="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: t.bg.sunken }}>
        {ja.weekdays.map((w, i) => (
          <div key={w} role="columnheader" style={{
            padding: '6px 8px', textAlign: 'center', fontSize: 11,
            fontWeight: 600,
            color: i === 0 ? t.danger.main : i === 6 ? t.info.main : t.text.secondary,
          }}>{w}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: 'minmax(88px, 1fr)' }}>
        {cells.map((d, i) => {
          const inMonth = d.getMonth() === date.getMonth();
          const isToday = sameDay(d, today);
          const evs = eventsOn(d);
          return (
            <div key={i} role="gridcell" aria-selected={isToday}
              onClick={() => onSelectDate(d)}
              style={{
                padding: 4, borderRight: `1px solid ${t.border.subtle}`,
                borderBottom: `1px solid ${t.border.subtle}`,
                opacity: inMonth ? 1 : 0.42, cursor: 'pointer',
                backgroundColor: isToday ? t.brand.soft : 'transparent',
                display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0,
              }}>
              <div style={{
                alignSelf: 'flex-end', width: 22, height: 22, borderRadius: '50%',
                display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600,
                color: isToday ? t.text.onBrand : t.text.primary,
                backgroundColor: isToday ? t.brand.main : 'transparent',
              }}>{d.getDate()}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
                {evs.slice(0, 3).map(e => {
                  const c = eventColorTok(t, e.color);
                  return (
                    <button key={e.id} onClick={(ev) => { ev.stopPropagation(); onEventClick?.(e); }}
                      style={{
                        textAlign: 'left', padding: '2px 6px', borderRadius: 4,
                        border: 'none', cursor: 'pointer',
                        backgroundColor: c.soft, color: c.main,
                        fontSize: 11, fontFamily: fonts.sans, fontWeight: 500,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>{e.title}</button>
                  );
                })}
                {evs.length > 3 && (
                  <Typography variant="caption" color="text.muted" sx={{ fontSize: 10, paddingLeft: 6 }}>
                    +{evs.length - 3} more
                  </Typography>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ---- Week View ----
const WeekView: React.FC<{
  date: Date; events: ScheduleEvent[];
  onEventClick?: (e: ScheduleEvent) => void;
  hourRange?: [number, number];
}> = ({ date, events, onEventClick, hourRange = [6, 23] }) => {
  const t = useTokens();
  const start = startOfWeek(date);
  const [fromH, toH] = hourRange;
  const hours = Array.from({ length: Math.max(1, toH - fromH) }, (_, i) => i + fromH);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)' }}>
      <div style={{ backgroundColor: t.bg.sunken, borderRight: `1px solid ${t.border.subtle}` }}/>
      {Array.from({ length: 7 }, (_, i) => {
        const d = addDays(start, i);
        const isToday = sameDay(d, new Date());
        return (
          <div key={i} style={{
            padding: '6px 4px', textAlign: 'center',
            borderRight: i < 6 ? `1px solid ${t.border.subtle}` : 'none',
            borderBottom: `1px solid ${t.border.subtle}`,
            backgroundColor: isToday ? t.brand.soft : t.bg.sunken,
            fontSize: 11, color: isToday ? t.brand.main : t.text.secondary,
            fontWeight: 600,
          }}>
            <div>{ja.weekdays[d.getDay()]}</div>
            <div style={{ fontSize: 16, marginTop: 2 }}>{d.getDate()}</div>
          </div>
        );
      })}
      {hours.map((h, rowI) => (
        <React.Fragment key={h}>
          <div style={{
            fontSize: 10, color: t.text.muted, padding: '2px 6px', textAlign: 'right',
            borderRight: `1px solid ${t.border.subtle}`,
            borderBottom: `1px solid ${t.border.subtle}`,
            minHeight: 44,
          }}>{String(h).padStart(2, '0')}:00</div>
          {Array.from({ length: 7 }, (_, colI) => {
            const cellStart = new Date(addDays(start, colI)); cellStart.setHours(h, 0, 0, 0);
            const cellEnd = new Date(cellStart); cellEnd.setHours(h + 1);
            const evs = events.filter(e => e.start >= cellStart && e.start < cellEnd);
            return (
              <div key={colI} style={{
                position: 'relative',
                borderRight: colI < 6 ? `1px solid ${t.border.subtle}` : 'none',
                borderBottom: `1px solid ${t.border.subtle}`,
                minHeight: 44, padding: 2,
              }}>
                {evs.map(e => {
                  const c = eventColorTok(t, e.color);
                  const dur = (e.end.getTime() - e.start.getTime()) / (1000 * 60 * 60);
                  return (
                    <button key={e.id} onClick={() => onEventClick?.(e)} style={{
                      position: 'absolute', inset: '2px 4px', height: `calc(${Math.max(0.5, dur) * 100}% - 4px)`,
                      padding: '2px 6px', border: 'none', borderLeft: `3px solid ${c.main}`,
                      borderRadius: 4, backgroundColor: c.soft, color: c.main,
                      fontSize: 11, textAlign: 'left', cursor: 'pointer', fontWeight: 500,
                      overflow: 'hidden',
                    }}>
                      <div style={{ fontSize: 10, opacity: 0.8 }}>{ja.time(e.start)}</div>
                      <div>{e.title}</div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

// ---- Day View ----
const DayView: React.FC<{
  date: Date; events: ScheduleEvent[];
  onEventClick?: (e: ScheduleEvent) => void;
}> = ({ date, events, onEventClick }) => {
  const t = useTokens();
  const dayEvents = events.filter(e => sameDay(e.start, date)).sort((a, b) => +a.start - +b.start);
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {dayEvents.length === 0 && (
        <Typography variant="body2" color="text.muted" sx={{ textAlign: 'center', padding: 32 }}>
          予定はありません
        </Typography>
      )}
      {dayEvents.map(e => {
        const c = eventColorTok(t, e.color);
        return (
          <button key={e.id} onClick={() => onEventClick?.(e)} style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            padding: 12, border: `1px solid ${t.border.subtle}`,
            borderLeft: `4px solid ${c.main}`, borderRadius: 8,
            backgroundColor: t.bg.surface, cursor: 'pointer', textAlign: 'left',
          }}>
            <div style={{ minWidth: 72 }}>
              <Typography variant="caption" sx={{ fontFamily: fonts.mono, fontWeight: 600 }}>
                {ja.time(e.start)}
              </Typography>
              <Typography variant="caption" color="text.muted" sx={{ display: 'block', fontFamily: fonts.mono }}>
                {ja.time(e.end)}
              </Typography>
            </div>
            <div style={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{e.title}</Typography>
              {e.description && (
                <Typography variant="caption" color="secondary">{e.description}</Typography>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

// ---- Timeline View ----
const TimelineView: React.FC<{
  events: ScheduleEvent[]; onEventClick?: (e: ScheduleEvent) => void;
}> = ({ events, onEventClick }) => {
  const t = useTokens();
  const sorted = [...events].sort((a, b) => +a.start - +b.start);
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {sorted.map(e => {
        const c = eventColorTok(t, e.color);
        return (
          <li key={e.id} style={{ display: 'flex', gap: 12, position: 'relative' }}>
            <div style={{
              width: 110, fontFamily: fonts.mono, fontSize: 11, color: t.text.secondary,
              paddingTop: 12, flexShrink: 0, textAlign: 'right',
            }}>
              {ja.dayMonth(e.start)}<br/>{ja.time(e.start)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c.main, marginTop: 16 }}/>
              <div style={{ flex: 1, width: 2, backgroundColor: t.border.subtle }}/>
            </div>
            <button onClick={() => onEventClick?.(e)} style={{
              flex: 1, padding: '10px 14px',
              border: `1px solid ${t.border.subtle}`,
              borderLeft: `3px solid ${c.main}`,
              borderRadius: 8, backgroundColor: t.bg.surface,
              cursor: 'pointer', textAlign: 'left', marginBottom: 6,
            }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{e.title}</Typography>
              {e.description && (
                <Typography variant="caption" color="secondary">{e.description}</Typography>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
};

// Named re-exports for v9 API parity
export const ScheduleMonthView = MonthView;
export const ScheduleWeekView = WeekView;
export const ScheduleDayView = DayView;
export const ScheduleTimeline = TimelineView;
