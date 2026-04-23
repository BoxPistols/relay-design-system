import React, { useState, useRef, useEffect } from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';
import { Typography } from '../Typography';
import { IconButton } from '../IconButton';
import { CalendarMonth, AccessTime, ChevronLeft, ChevronRight } from '../../icons';

/**
 * ★ MUI v9: DateField / TimeField / DateTimeField (Base UI ベース)
 *
 * v9 で刷新された pickers のコアピース。本番移行時:
 *   import { DateField, TimeField, DateTimeField } from '@mui/material/DateField';
 *   // もしくは
 *   import { DateField } from '@mui/x-date-pickers/DateField';
 *
 * - セクション単位 (年/月/日/時/分) での入力
 * - 矢印キーでフィールド内インクリメント
 * - ポップオーバー内にカレンダー (DatePicker 相当)
 * - `slotProps.input` / `slotProps.popper` / `slotProps.day` に対応
 */

const pad2 = (n: number) => String(n).padStart(2, '0');
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

// ---- DateField ----
export type DateFieldProps = {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (d: Date | null) => void;
  label?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  size?: 'small' | 'medium';
  slotProps?: {
    input?: React.InputHTMLAttributes<HTMLInputElement>;
    popper?: React.HTMLAttributes<HTMLDivElement>;
    day?: React.HTMLAttributes<HTMLButtonElement>;
  };
  sx?: React.CSSProperties;
};

export const DateField: React.FC<DateFieldProps> = ({
  value, defaultValue = null, onChange, label, disabled,
  minDate, maxDate, size = 'small', slotProps, sx,
}) => {
  const t = useTokens();
  const [internal, setInternal] = useState<Date | null>(defaultValue);
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const v = value !== undefined ? value : internal;

  const set = (d: Date | null) => {
    setInternal(d); onChange?.(d);
  };

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    if (open) {
      document.addEventListener('mousedown', h);
      return () => document.removeEventListener('mousedown', h);
    }
  }, [open]);

  // C2: 入力中の生文字列は別 state で保持し、parse 成功時のみ `onChange` を呼ぶ。
  // これで "2026" や "2026/04" と打っている途中で state が巻き戻らない。
  // focus が外れている / 生入力なしのときは v から逆生成した表示を使う。
  const formatted = v
    ? `${v.getFullYear()}/${pad2(v.getMonth() + 1)}/${pad2(v.getDate())}`
    : '';
  const [rawText, setRawText] = useState<string | null>(null);
  const text = rawText ?? formatted;

  return (
    <div ref={ref} style={{ position: 'relative', minWidth: 180, ...sx }}>
      {label && (
        <Typography variant="caption" color="secondary" sx={{ display: 'block', marginBottom: 4 }}>
          {label}
        </Typography>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px',
        border: `1px solid ${focus || open ? t.brand.main : t.border.default}`,
        borderRadius: 8, backgroundColor: disabled ? t.bg.sunken : t.bg.surface,
        transition: 'border-color 0.15s',
      }}>
        <CalendarMonth fontSize="small" sx={{ color: t.text.muted, width: 16, height: 16 }}/>
        <input
          type="text" value={text} placeholder="YYYY/MM/DD"
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => { setFocus(false); setRawText(null); }}
          onChange={(e) => {
            const next = e.target.value;
            setRawText(next);
            // 完全な YYYY/M/D のとき state を反映。途中入力は rawText に留めて
            // 表示だけ反映し、外部の value は壊さない。
            const [y, m, d] = next.split('/').map(Number);
            if (y && m && d && !Number.isNaN(y) && !Number.isNaN(m) && !Number.isNaN(d)) {
              set(new Date(y, m - 1, d));
            } else if (next === '') {
              set(null);
            }
          }}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            padding: size === 'small' ? '8px 0' : '12px 0', fontSize: 14,
            color: t.text.primary, fontFamily: fonts.mono, minWidth: 0,
          }}
          {...(slotProps?.input || {})}
        />
        <IconButton size="small" aria-label="open calendar" onClick={() => setOpen(o => !o)} disabled={disabled}>
          <CalendarMonth fontSize="small"/>
        </IconButton>
      </div>
      {open && (
        <div role="dialog" aria-label="Calendar"
          {...(slotProps?.popper || {})}
          style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 1000,
            backgroundColor: t.bg.surface, border: `1px solid ${t.border.subtle}`,
            borderRadius: 10, boxShadow: t.shadow.lg, padding: 12, minWidth: 280,
            ...(slotProps?.popper?.style || {}),
          }}>
          <Calendar
            value={v} onChange={(d) => { set(d); setOpen(false); }}
            minDate={minDate} maxDate={maxDate}
            dayProps={slotProps?.day}
          />
        </div>
      )}
    </div>
  );
};

// ---- Calendar (inline for DateField) ----
const Calendar: React.FC<{
  value: Date | null;
  onChange: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  dayProps?: React.HTMLAttributes<HTMLButtonElement>;
}> = ({ value, onChange, minDate, maxDate, dayProps }) => {
  const t = useTokens();
  const today = new Date();
  const [view, setView] = useState<Date>(value || today);
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const start = new Date(first); start.setDate(1 - first.getDay());

  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start); d.setDate(start.getDate() + i); return d;
  });

  // S3: minDate/maxDate は「日付」の範囲比較として扱う (時刻部分を切り落とす)。
  // `minDate={new Date()}` のように現在時刻付きで渡されても「今日」は有効扱い、
  // `maxDate={new Date()}` も同様に今日は有効扱い。もし時刻込みで比較したい場合は
  // 呼び出し側で正規化するか、この関数を hour-aware にすること。
  const disabled = (d: Date) =>
    (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) ||
    (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
        <IconButton size="small" aria-label="previous month"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}>
          <ChevronLeft fontSize="small"/>
        </IconButton>
        <Typography variant="subtitle2" sx={{ flex: 1, textAlign: 'center', fontWeight: 600 }}>
          {new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long' }).format(view)}
        </Typography>
        <IconButton size="small" aria-label="next month"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}>
          <ChevronRight fontSize="small"/>
        </IconButton>
      </div>
      <div role="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {['日', '月', '火', '水', '木', '金', '土'].map((w, i) => (
          <div key={w} role="columnheader" style={{
            textAlign: 'center', fontSize: 10, padding: 4, fontWeight: 600,
            color: i === 0 ? t.danger.main : i === 6 ? t.info.main : t.text.muted,
          }}>{w}</div>
        ))}
        {cells.map((d, i) => {
          const inMonth = d.getMonth() === view.getMonth();
          const isToday = sameDay(d, today);
          const isSelected = value ? sameDay(d, value) : false;
          const isDisabled = disabled(d);
          return (
            <button key={i} role="gridcell" aria-selected={isSelected} aria-disabled={isDisabled}
              disabled={isDisabled}
              onClick={() => onChange(d)}
              {...(dayProps || {})}
              style={{
                width: 32, height: 32, border: 'none', borderRadius: 6,
                backgroundColor: isSelected ? t.brand.main : isToday ? t.brand.soft : 'transparent',
                color: isSelected ? t.text.onBrand : isToday ? t.brand.main :
                  !inMonth ? t.text.disabled : isDisabled ? t.text.disabled : t.text.primary,
                fontSize: 12, fontFamily: fonts.sans, fontWeight: isSelected || isToday ? 600 : 400,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: !inMonth ? 0.4 : 1,
                ...(dayProps?.style || {}),
              }}>
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ---- TimeField ----
export type TimeFieldProps = {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (d: Date | null) => void;
  label?: string;
  disabled?: boolean;
  step?: number; // minutes
  size?: 'small' | 'medium';
  slotProps?: { input?: React.InputHTMLAttributes<HTMLInputElement> };
  sx?: React.CSSProperties;
};

export const TimeField: React.FC<TimeFieldProps> = ({
  value, defaultValue = null, onChange, label, disabled, step = 15, size = 'small', slotProps, sx,
}) => {
  const t = useTokens();
  const [internal, setInternal] = useState<Date | null>(defaultValue);
  const [focus, setFocus] = useState(false);
  const v = value !== undefined ? value : internal;
  const set = (d: Date | null) => { setInternal(d); onChange?.(d); };

  const text = v ? `${pad2(v.getHours())}:${pad2(v.getMinutes())}` : '';

  const adjust = (delta: number) => {
    const d = v ? new Date(v) : new Date();
    d.setMinutes(d.getMinutes() + delta);
    set(d);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); adjust(step); }
    if (e.key === 'ArrowDown') { e.preventDefault(); adjust(-step); }
  };

  return (
    <div style={{ minWidth: 140, ...sx }}>
      {label && (
        <Typography variant="caption" color="secondary" sx={{ display: 'block', marginBottom: 4 }}>
          {label}
        </Typography>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px',
        border: `1px solid ${focus ? t.brand.main : t.border.default}`,
        borderRadius: 8, backgroundColor: disabled ? t.bg.sunken : t.bg.surface,
        transition: 'border-color 0.15s',
      }}>
        <AccessTime fontSize="small" sx={{ color: t.text.muted, width: 16, height: 16 }}/>
        <input
          type="text" value={text} placeholder="HH:MM" disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          onKeyDown={onKey}
          onChange={(e) => {
            const [h, m] = e.target.value.split(':').map(Number);
            if (h !== undefined && m !== undefined && !Number.isNaN(h) && !Number.isNaN(m)) {
              const d = v ? new Date(v) : new Date();
              d.setHours(h, m, 0, 0); set(d);
            } else if (!e.target.value) set(null);
          }}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            padding: size === 'small' ? '8px 0' : '12px 0', fontSize: 14,
            color: t.text.primary, fontFamily: fonts.mono, minWidth: 0, textAlign: 'center',
          }}
          {...(slotProps?.input || {})}
        />
      </div>
    </div>
  );
};

// ---- DateTimeField ----
export type DateTimeFieldProps = Omit<DateFieldProps, 'slotProps'> & {
  slotProps?: DateFieldProps['slotProps'] & TimeFieldProps['slotProps'];
};

export const DateTimeField: React.FC<DateTimeFieldProps> = ({ value, defaultValue, onChange, label, disabled, sx }) => {
  const t = useTokens();
  const [internal, setInternal] = useState<Date | null>(defaultValue ?? null);
  const v = value !== undefined ? value : internal;
  const set = (d: Date | null) => { setInternal(d); onChange?.(d); };

  return (
    <div style={{ ...sx }}>
      {label && (
        <Typography variant="caption" color="secondary" sx={{ display: 'block', marginBottom: 4 }}>
          {label}
        </Typography>
      )}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <DateField value={v} onChange={(d) => {
          if (!d) { set(null); return; }
          const next = new Date(d);
          if (v) { next.setHours(v.getHours(), v.getMinutes()); }
          set(next);
        }} disabled={disabled}/>
        {/* S4: TimeField のクリア (null) で日付まで吹き飛ばさない。
            時刻だけを抜き取り、既存日付 + new time でマージ。null は無視。 */}
        <TimeField value={v} onChange={(d) => {
          if (!d) return;
          if (!v) { set(d); return; }
          const next = new Date(v);
          next.setHours(d.getHours(), d.getMinutes(), 0, 0);
          set(next);
        }} disabled={disabled}/>
      </div>
    </div>
  );
};
