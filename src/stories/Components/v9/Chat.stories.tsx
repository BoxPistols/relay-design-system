import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import {
  Chat, ChatHeader, ChatList, ChatMessage, ChatComposer, ChatTypingIndicator, ChatAIAvatar,
} from '../../../components/Chat';
import { Avatar, IconButton } from '../../../components';
import * as Icons from '../../../icons';

const meta: Meta<typeof Chat> = {
  title: 'Components/v9 New/Chat',
  component: Chat,
  parameters: { layout: 'padded' },
  decorators: [(S) => <div style={{ width: 520 }}><S/></div>],
};
export default meta;
type Story = StoryObj<typeof Chat>;

/**
 * ★ MUI v9 新規 · Base UI ベース
 *
 * ```tsx
 * import {
 *   Chat, ChatList, ChatMessage, ChatComposer,
 *   ChatHeader, ChatTypingIndicator,
 * } from '@mui/material/Chat';
 * ```
 *
 * 構造は slots ベース:
 * - `<Chat>` : 会話コンテナ (role="log", aria-live)
 * - `<ChatHeader>` : 相手情報・ステータス
 * - `<ChatList>` : 自動スクロール・メッセージ群
 * - `<ChatMessage variant="sent|received|system">` : 個別メッセージ
 * - `<ChatComposer>` : 入力 + 送信
 */
export const Basic: Story = {
  render: () => {
    const [msgs, setMsgs] = useState([
      { id: 1, v: 'received' as const, text: 'こんにちは。注文 ORD-20426 の配達状況を教えてください。', ts: '12:32' },
      { id: 2, v: 'sent' as const, text: 'いま配達員が店舗を出発しました。到着まで約 8 分です。', ts: '12:33', status: 'read' as const },
      { id: 3, v: 'received' as const, text: '了解です、お店のおすすめも教えてもらえますか？', ts: '12:34' },
    ]);
    return (
      <Chat>
        <ChatHeader
          avatar={<Avatar size={36}>田</Avatar>}
          title="田中 恵 (ORD-20426)" subtitle="カスタマーサポート" status="online"
          actions={<IconButton size="small"><Icons.Videocam fontSize="small"/></IconButton>}
        />
        <ChatList>
          <ChatMessage variant="system">チャット開始 · 12:30</ChatMessage>
          {msgs.map(m => (
            <ChatMessage key={m.id} variant={m.v} timestamp={m.ts} status={m.status}
              avatar={m.v === 'received' ? <Avatar size={28}>田</Avatar> : undefined}>
              {m.text}
            </ChatMessage>
          ))}
        </ChatList>
        <ChatComposer onSend={(t) => setMsgs(prev => [...prev, { id: Date.now(), v: 'sent', text: t, ts: 'now', status: 'sent' as any }])}/>
      </Chat>
    );
  },
};

export const WithTyping: Story = {
  render: () => (
    <Chat height={420}>
      <ChatHeader avatar={<ChatAIAvatar/>} title="Bento Copilot" subtitle="AI アシスタント" status="online"/>
      <ChatList>
        <ChatMessage variant="received" avatar={<ChatAIAvatar size={28}/>}>
          いつもの「ランチ B セット」で注文しますか？
        </ChatMessage>
        <ChatMessage variant="sent" timestamp="12:02" status="read">
          はい、サラダを L にしてください。
        </ChatMessage>
        <ChatMessage variant="received" avatar={<ChatAIAvatar size={28}/>}
          reactions={['✨']}>
          承知しました。配達予想は 20 分後、到着は 12:25 ごろです。
        </ChatMessage>
        <ChatTypingIndicator author="Bento Copilot"/>
      </ChatList>
      <ChatComposer
        suggestions={['注文内容を確認', 'おすすめを表示', '配達枠を変更']}
        onSend={() => {}}
      />
    </Chat>
  ),
};

export const CompactDensity: Story = {
  render: () => (
    <Chat density="compact" height={380}>
      <ChatHeader title="チーム全体" subtitle="8人" avatar={<Avatar size={36}>T</Avatar>}/>
      <ChatList>
        {Array.from({ length: 6 }, (_, i) => (
          <ChatMessage key={i} variant={i % 2 ? 'sent' : 'received'}
            author={i % 2 ? undefined : `ユーザー${i}`}
            avatar={i % 2 ? undefined : <Avatar size={24}>{`U${i}`}</Avatar>}
            timestamp={`09:${String(i * 3).padStart(2, '0')}`}
            status={i % 2 ? 'delivered' : undefined}>
            {`メッセージ ${i + 1}`}
          </ChatMessage>
        ))}
      </ChatList>
      <ChatComposer/>
    </Chat>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <Chat height={320}>
      <ChatHeader title="オフライン相手" subtitle="最終ログイン 昨日 18:30" status="offline" avatar={<Avatar size={36}>オ</Avatar>}/>
      <ChatList>
        <ChatMessage variant="sent" timestamp="09:20" status="error">
          送信失敗: ネットワーク接続がありません
        </ChatMessage>
        <ChatMessage variant="sent" timestamp="09:21" status="sending">
          再送信中…
        </ChatMessage>
      </ChatList>
      <ChatComposer/>
    </Chat>
  ),
};
