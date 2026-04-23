import React, { useState, useRef, useEffect, useMemo, createContext, useContext } from 'react';
import { useTokens } from '../../theme';
import type { TokenSet } from '../../tokens';
import { fonts } from '../../tokens';
import { Avatar } from '../Avatar';
import { Typography } from '../Typography';
import { IconButton } from '../IconButton';
import { Send, AttachFile, Mic, EmojiEmotions, DoneAll, SmartToy } from '../../icons';

/**
 * ★ MUI v9 新規: Chat コンポーネント群 (Base UI ベース)
 *
 * v9 で追加された `@mui/material/Chat` の互換 API 実装。
 * 本番移行時:
 *   import {
 *     Chat, ChatList, ChatMessage, ChatBubble,
 *     ChatComposer, ChatHeader, ChatTypingIndicator,
 *   } from '@mui/material/Chat';
 *
 * 設計原則:
 * - slots/slotProps ベース (v9 新 API に完全準拠)
 * - variant='sent' | 'received' | 'system' の message 種別
 * - status='sending' | 'sent' | 'delivered' | 'read' で既読制御
 */

type ChatCtx = { density: 'compact' | 'comfortable' };
const ChatContext = createContext<ChatCtx>({ density: 'comfortable' });

// ---- Root ----
export type ChatProps = {
  density?: 'compact' | 'comfortable';
  height?: number | string;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
  /** v9 style slots */
  slots?: { root?: React.ElementType };
  slotProps?: { root?: React.HTMLAttributes<HTMLDivElement> };
};

export const Chat: React.FC<ChatProps> = ({
  density = 'comfortable', height = 560, children, sx, slots, slotProps,
}) => {
  const t = useTokens();
  const Root = (slots?.root as any) || 'div';
  // S2: Context value をメモ化。将来 density 以外 (ref, 送信者情報等) を入れたとき
  // も consumer の無駄 re-render を回避できる。
  const ctxValue = useMemo(() => ({ density }), [density]);
  return (
    <ChatContext.Provider value={ctxValue}>
      <Root
        role="log" aria-live="polite" aria-label="Chat conversation"
        style={{
          display: 'flex', flexDirection: 'column',
          height, width: '100%', minWidth: 0,
          backgroundColor: t.bg.surface,
          border: `1px solid ${t.border.subtle}`, borderRadius: 12,
          overflow: 'hidden', fontFamily: fonts.sans, ...sx,
        }} {...(slotProps?.root || {})}>
        {children}
      </Root>
    </ChatContext.Provider>
  );
};

// ---- Header ----
export type ChatHeaderProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
  status?: 'online' | 'offline' | 'away' | 'busy';
};

const statusColor = (s: ChatHeaderProps['status'], t: TokenSet) => s === 'online' ? t.success.main :
  s === 'away' ? t.warning.main : s === 'busy' ? t.danger.main : t.text.muted;

export const ChatHeader: React.FC<ChatHeaderProps> = ({ title, subtitle, avatar, actions, status }) => {
  const t = useTokens();
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
      borderBottom: `1px solid ${t.border.subtle}`, backgroundColor: t.bg.surface,
    }}>
      {avatar && (
        <div style={{ position: 'relative' }}>
          {avatar}
          {status && (
            <span aria-label={`status-${status}`} style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 10, height: 10, borderRadius: '50%',
              backgroundColor: statusColor(status, t),
              border: `2px solid ${t.bg.surface}`,
            }}/>
          )}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{title}</Typography>}
        {subtitle && <Typography variant="caption" color="secondary">{subtitle}</Typography>}
      </div>
      {actions}
    </header>
  );
};

// ---- Message List ----
/**
 * Auto-scroll は **ユーザが底付近にいるときだけ**発火。
 * 過去ログを読み返し中に新着で吹き飛ばされないようにする (C3 対応)。
 * 依存配列は `children` 参照ではなく `React.Children.count()` で、親の
 * 無関係な再レンダでは発火しない。
 */
export const ChatList: React.FC<{ children?: React.ReactNode; sx?: React.CSSProperties }> = ({ children, sx }) => {
  const t = useTokens();
  const ref = useRef<HTMLDivElement>(null);
  const wasAtBottom = useRef(true);
  const count = React.Children.count(children);

  // 毎スクロールで「底付近にいるか」を記録
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    wasAtBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (wasAtBottom.current) el.scrollTop = el.scrollHeight;
  }, [count]);

  return (
    <div ref={ref} onScroll={onScroll} style={{
      flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column',
      gap: 8, backgroundColor: t.bg.canvas, ...sx,
    }}>{children}</div>
  );
};

// ---- Message ----
export type MessageVariant = 'sent' | 'received' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error';

export type ChatMessageProps = {
  variant?: MessageVariant;
  author?: React.ReactNode;
  avatar?: React.ReactNode;
  timestamp?: string | Date;
  status?: MessageStatus;
  reactions?: string[];
  children?: React.ReactNode;
  /** v9 slots 準拠 */
  slots?: { bubble?: React.ElementType };
  slotProps?: { bubble?: React.CSSProperties };
  sx?: React.CSSProperties;
};

const formatTs = (ts?: string | Date) => {
  if (!ts) return '';
  // 文字列は既整形の時刻ラベルとしてそのまま通す。
  // Date だけ Intl.DateTimeFormat で整形 (`hh:mm` 24h)。
  if (typeof ts === 'string') return ts;
  const t = ts.getTime();
  if (Number.isNaN(t)) return '';
  return new Intl.DateTimeFormat('ja-JP', { hour: '2-digit', minute: '2-digit' }).format(ts);
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
  variant = 'received', author, avatar, timestamp, status, reactions,
  children, slots, slotProps, sx,
}) => {
  const t = useTokens();
  const { density } = useContext(ChatContext);
  const isSent = variant === 'sent';
  const isSystem = variant === 'system';
  const Bubble = (slots?.bubble as any) || 'div';

  if (isSystem) {
    return (
      <div role="status" style={{ alignSelf: 'center', margin: '8px 0', ...sx }}>
        <Typography variant="caption" color="secondary" sx={{
          padding: '4px 10px', backgroundColor: t.bg.sunken, borderRadius: 12,
        }}>{children}</Typography>
      </div>
    );
  }

  const statusIcon = {
    sending: <span style={{ opacity: 0.5 }}>…</span>,
    sent: <span style={{ fontSize: 12 }}>✓</span>,
    delivered: <DoneAll fontSize="small" sx={{ width: 14, height: 14 }}/>,
    read: <DoneAll fontSize="small" sx={{ color: t.info.main, width: 14, height: 14 }}/>,
    error: <span style={{ color: t.danger.main }}>!</span>,
  } as const;

  return (
    <div style={{
      display: 'flex', flexDirection: isSent ? 'row-reverse' : 'row',
      alignItems: 'flex-end', gap: 8, maxWidth: '100%', ...sx,
    }}>
      {!isSent && avatar}
      <div style={{ maxWidth: '72%', display: 'flex', flexDirection: 'column', alignItems: isSent ? 'flex-end' : 'flex-start' }}>
        {author && !isSent && (
          <Typography variant="caption" color="text.muted" sx={{ marginBottom: 2, marginLeft: 8 }}>{author}</Typography>
        )}
        <Bubble style={{
          backgroundColor: isSent ? t.brand.main : t.bg.surface,
          color: isSent ? t.text.onBrand : t.text.primary,
          padding: density === 'compact' ? '6px 10px' : '8px 14px',
          borderRadius: 14,
          borderTopRightRadius: isSent ? 4 : 14,
          borderTopLeftRadius: isSent ? 14 : 4,
          border: isSent ? 'none' : `1px solid ${t.border.subtle}`,
          boxShadow: t.shadow.sm, wordBreak: 'break-word',
          fontSize: 14, lineHeight: 1.5,
          ...(slotProps?.bubble || {}),
        }}>
          {children}
        </Bubble>
        {reactions && reactions.length > 0 && (
          <div style={{
            display: 'flex', gap: 2, marginTop: 2,
            padding: '2px 6px', borderRadius: 10,
            backgroundColor: t.bg.surface, border: `1px solid ${t.border.subtle}`,
          }}>
            {reactions.map((r, i) => <span key={i} style={{ fontSize: 12 }}>{r}</span>)}
          </div>
        )}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          marginTop: 2, padding: '0 4px',
        }}>
          {timestamp && (
            <Typography variant="caption" color="text.muted" sx={{ fontSize: 10 }}>{formatTs(timestamp)}</Typography>
          )}
          {isSent && status && <span style={{ display: 'inline-flex', color: t.text.muted }}>{statusIcon[status]}</span>}
        </div>
      </div>
    </div>
  );
};

// ---- Typing Indicator ----
export const ChatTypingIndicator: React.FC<{ author?: React.ReactNode }> = ({ author }) => {
  const t = useTokens();
  return (
    <div role="status" aria-label="typing" style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px',
    }}>
      {author && <Typography variant="caption" color="text.muted">{author}</Typography>}
      <div style={{
        display: 'inline-flex', gap: 4, padding: '8px 12px',
        backgroundColor: t.bg.surface, border: `1px solid ${t.border.subtle}`,
        borderRadius: 14,
      }}>
        {[0, 150, 300].map(d => (
          <span key={d} style={{
            width: 6, height: 6, borderRadius: '50%',
            backgroundColor: t.text.muted,
            animation: `relay-typing 1.2s ${d}ms infinite ease-in-out`,
          }}/>
        ))}
      </div>
      {/* @keyframes relay-typing は src/styles.css に集約 (インスタンスごとの style 重複を避ける) */}
    </div>
  );
};

// ---- Composer ----
export type ChatComposerProps = {
  placeholder?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  onSend?: (v: string) => void;
  disabled?: boolean;
  suggestions?: string[];
  slots?: {
    sendButton?: React.ElementType;
    attachButton?: React.ElementType;
    micButton?: React.ElementType;
  };
  slotProps?: {
    input?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    sendButton?: React.HTMLAttributes<HTMLButtonElement>;
  };
};

export const ChatComposer: React.FC<ChatComposerProps> = ({
  placeholder = 'メッセージを入力…', value, onValueChange, onSend, disabled,
  suggestions, slots, slotProps,
}) => {
  const t = useTokens();
  const [internal, setInternal] = useState('');
  const v = value !== undefined ? value : internal;
  const update = (nv: string) => { setInternal(nv); onValueChange?.(nv); };
  const submit = () => {
    const text = v.trim();
    if (!text || disabled) return;
    onSend?.(text); update('');
  };
  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  return (
    <div style={{
      borderTop: `1px solid ${t.border.subtle}`, backgroundColor: t.bg.surface,
      padding: 10,
    }}>
      {suggestions && suggestions.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => onSend?.(s)} style={{
              padding: '4px 10px', fontSize: 12, borderRadius: 12,
              border: `1px solid ${t.border.default}`,
              backgroundColor: t.bg.surface, color: t.text.primary,
              cursor: 'pointer', fontFamily: fonts.sans,
            }}>{s}</button>
          ))}
        </div>
      )}
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 6,
        padding: '6px 8px', border: `1px solid ${t.border.default}`, borderRadius: 12,
        backgroundColor: t.bg.canvas,
      }}>
        <IconButton size="small" aria-label="attach">
          <AttachFile fontSize="small"/>
        </IconButton>
        <textarea
          value={v}
          onChange={(e) => update(e.target.value)}
          onKeyDown={onKey}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            resize: 'none', fontFamily: fonts.sans, fontSize: 14,
            color: t.text.primary, padding: '6px 2px', maxHeight: 120,
            lineHeight: 1.5,
          }}
          {...(slotProps?.input || {})}
        />
        <IconButton size="small" aria-label="emoji">
          <EmojiEmotions fontSize="small"/>
        </IconButton>
        <IconButton size="small" aria-label="voice">
          <Mic fontSize="small"/>
        </IconButton>
        <button onClick={submit} disabled={disabled || !v.trim()}
          aria-label="send"
          {...(slotProps?.sendButton || {})}
          style={{
            width: 36, height: 36, borderRadius: 10, border: 'none',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: v.trim() ? t.brand.main : t.bg.sunken,
            color: v.trim() ? t.text.onBrand : t.text.muted,
            cursor: v.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.15s',
          }}>
          <Send fontSize="small" sx={{ width: 16, height: 16 }}/>
        </button>
      </div>
    </div>
  );
};

// ---- Convenience: ChatBubble (re-export as alias) ----
export const ChatBubble = ChatMessage;

// ---- AI assistant avatar (helper) ----
export const ChatAIAvatar: React.FC<{ size?: number }> = ({ size = 32 }) => {
  const t = useTokens();
  return (
    <Avatar size={size} sx={{ backgroundColor: t.accent.soft, color: t.accent.main }}>
      <SmartToy fontSize="small" sx={{ width: size * 0.55, height: size * 0.55 }}/>
    </Avatar>
  );
};
