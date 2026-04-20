import React, { useState } from 'react';
import {
  Typography, Stack, Divider, Button, Chip, Card, CardContent,
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSubmenu, MenubarSeparator,
  Stepper, Step, StepLabel,
  NumberField, Avatar, IconButton,
} from '../components';
import {
  Chat, ChatHeader, ChatList, ChatMessage, ChatComposer, ChatTypingIndicator, ChatAIAvatar,
} from '../components/Chat';
import { Schedule } from '../components/Schedule';
import type { ScheduleEvent } from '../components/Schedule';
import { DateField, TimeField, DateTimeField } from '../components/DateField';
import { useTokens } from '../theme';
import { fonts } from '../tokens';
import * as Icons from '../icons';

const now = new Date();
const mkEvent = (dayOffset: number, h: number, dur: number, title: string, color?: ScheduleEvent['color'], description?: string): ScheduleEvent => {
  const s = new Date(now); s.setDate(s.getDate() + dayOffset); s.setHours(h, 0, 0, 0);
  const e = new Date(s); e.setHours(h + dur);
  return { id: `${dayOffset}-${h}-${title}`, title, start: s, end: e, color, description };
};
const demoEvents: ScheduleEvent[] = [
  mkEvent(0, 9, 1, '朝礼 / 配達員ブリーフィング', 'info'),
  mkEvent(0, 11, 2, 'ランチピーク枠', 'primary', '新宿エリア · 増員 +8名'),
  mkEvent(0, 14, 1, '車両点検 (RDR-0203)', 'warning'),
  mkEvent(1, 10, 3, '新規加盟店オンボーディング', 'success', 'Curry Lab'),
  mkEvent(2, 13, 2, 'ディナー枠拡張', 'primary'),
  mkEvent(3, 10, 1, '月次レビュー', 'error'),
];

export const V9NewPage: React.FC = () => {
  const t = useTokens();
  const [qty, setQty] = useState(1);
  const [distance, setDistance] = useState(3);
  const [activeStep, setActiveStep] = useState(1);
  const [chatMsgs, setChatMsgs] = useState<{ id: number; v: 'sent'|'received'|'system'; text: string; ts?: string; status?: 'sent'|'delivered'|'read' }[]>([
    { id: 1, v: 'received', text: 'こんにちは。注文 ORD-20426 の配達状況を教えていただけますか？', ts: '12:32' },
    { id: 2, v: 'sent', text: 'いま配達員が店舗を出発したところです。到着まで約 8 分です。', ts: '12:33', status: 'read' },
    { id: 3, v: 'received', text: 'ありがとうございます ✨', ts: '12:34' },
  ]);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 40 }}>
        <Chip size="small" color="primary" label="MUI v9 · 2026.4.8 release"
          icon={<Icons.AutoAwesome fontSize="small"/>} sx={{ marginBottom: 16 }}/>
        <Typography variant="h2" gutterBottom>v9 の新要素</Typography>
        <Typography variant="body1" color="secondary" sx={{ maxWidth: 720 }}>
          Material UI v9 で追加された Base UI ベースの新コンポーネントと、
          既存コンポーネントのアクセシビリティ強化項目を網羅。
        </Typography>
      </div>

      {/* NumberField */}
      <section style={{ marginBottom: 64 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 16 }}>
          <Typography variant="h4">NumberField</Typography>
          <Chip size="small" label="NEW" color="primary"/>
          <Chip size="small" label="Base UI" variant="outlined"/>
        </Stack>
        <Typography variant="body2" color="secondary" sx={{ marginBottom: 24 }}>
          numeric input 専用プリミティブ。キーボード (↑↓/PgUp/PgDn)・スクロール・
          インクリメントボタンに対応、locale/format prop で表示整形。
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="secondary">Basic</Typography>
              <div style={{ marginTop: 12 }}>
                <NumberField label="注文数" value={qty} onValueChange={setQty} min={0} max={99}/>
              </div>
              <Typography variant="caption" color="secondary" sx={{ marginTop: 8, display: 'block', fontFamily: fonts.mono }}>
                value: {qty}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="overline" color="secondary">Step &amp; Range</Typography>
              <div style={{ marginTop: 12 }}>
                <NumberField label="配達距離 (km)" value={distance} onValueChange={setDistance} min={0} max={20} step={1}/>
              </div>
              <Typography variant="caption" color="secondary" sx={{ marginTop: 8, display: 'block' }}>
                0〜20km / 1km刻み · ↑↓ キー操作可
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="overline" color="secondary">Currency format</Typography>
              <div style={{ marginTop: 12 }}>
                <NumberField label="予算" defaultValue={1500000} step={10000}
                  format={{ style: 'currency', currency: 'JPY' }}/>
              </div>
              <Typography variant="caption" color="secondary" sx={{ marginTop: 8, display: 'block' }}>
                Intl.NumberFormat でロケール整形
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="overline" color="secondary">Disabled</Typography>
              <div style={{ marginTop: 12 }}>
                <NumberField label="読み取り専用" defaultValue={42} disabled/>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Divider sx={{ marginTop: 40, marginBottom: 40 }}/>

      {/* Menubar */}
      <section style={{ marginBottom: 64 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 16 }}>
          <Typography variant="h4">Menubar</Typography>
          <Chip size="small" label="NEW" color="primary"/>
          <Chip size="small" label="Submenus" variant="outlined"/>
        </Stack>
        <Typography variant="body2" color="secondary" sx={{ marginBottom: 24 }}>
          水平型メニューバー。v9 でサブメニュー / ネストメニューが正式サポート。
          ←→ キーでトリガー間移動、Esc で閉じる。
        </Typography>
        <Card sx={{ padding: 24 }}>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>ファイル</MenubarTrigger>
              <MenubarContent>
                <MenubarItem shortcut="⌘N">新規作成</MenubarItem>
                <MenubarItem shortcut="⌘O">開く…</MenubarItem>
                <MenubarSeparator/>
                <MenubarSubmenu label="最近使った項目">
                  <MenubarItem>orders-2026-04-20.json</MenubarItem>
                  <MenubarItem>menu-shibuya.pdf</MenubarItem>
                  <MenubarItem>delivery-log-2026-04.csv</MenubarItem>
                </MenubarSubmenu>
                <MenubarSubmenu label="エクスポート">
                  <MenubarItem>PDF (.pdf)</MenubarItem>
                  <MenubarItem>CSV (.csv)</MenubarItem>
                  <MenubarItem>GeoJSON (.geojson)</MenubarItem>
                </MenubarSubmenu>
                <MenubarSeparator/>
                <MenubarItem shortcut="⌘Q">終了</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>編集</MenubarTrigger>
              <MenubarContent>
                <MenubarItem shortcut="⌘Z">元に戻す</MenubarItem>
                <MenubarItem shortcut="⇧⌘Z">やり直す</MenubarItem>
                <MenubarSeparator/>
                <MenubarItem shortcut="⌘X">切り取り</MenubarItem>
                <MenubarItem shortcut="⌘C">コピー</MenubarItem>
                <MenubarItem shortcut="⌘V">貼り付け</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>表示</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>地図モード</MenubarItem>
                <MenubarItem>衛星モード</MenubarItem>
                <MenubarItem>ハイブリッド</MenubarItem>
                <MenubarSeparator/>
                <MenubarSubmenu label="レイヤー">
                  <MenubarItem>配達エリア</MenubarItem>
                  <MenubarItem>需要ヒートマップ</MenubarItem>
                  <MenubarItem>天候情報</MenubarItem>
                </MenubarSubmenu>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>ヘルプ</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>ドキュメント</MenubarItem>
                <MenubarItem>キーボードショートカット</MenubarItem>
                <MenubarItem>バージョン情報</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <Typography variant="caption" color="secondary" sx={{ marginTop: 16, display: 'block' }}>
            💡 「エクスポート」「最近使った項目」「レイヤー」をホバーでサブメニュー展開
          </Typography>
        </Card>
      </section>

      <Divider sx={{ marginTop: 40, marginBottom: 40 }}/>

      {/* Stepper */}
      <section style={{ marginBottom: 64 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 16 }}>
          <Typography variant="h4">Stepper</Typography>
          <Chip size="small" label="Enhanced" color="success"/>
          <Chip size="small" label="Roving tabindex" variant="outlined"/>
        </Stack>
        <Typography variant="body2" color="secondary" sx={{ marginBottom: 24 }}>
          v9 で ol/li 要素に変更、role="tablist", aria-selected, aria-posinset が自動付与。
          矢印キー・Home/End でのナビゲーションに対応。
        </Typography>
        <Card sx={{ padding: 32, marginBottom: 16 }}>
          <Stepper activeStep={activeStep}>
            <Step><StepLabel>店舗選択</StepLabel></Step>
            <Step><StepLabel optional="任意">メニュー・オプション</StepLabel></Step>
            <Step><StepLabel>お届け先・時間</StepLabel></Step>
            <Step><StepLabel>決済</StepLabel></Step>
          </Stepper>
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ marginTop: 24 }}>
            <Button variant="outlined" size="small"
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}>戻る</Button>
            <Button variant="contained" size="small"
              onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
              disabled={activeStep === 3}>次へ</Button>
          </Stack>
        </Card>
        <Card sx={{ padding: 32 }}>
          <Typography variant="overline" color="secondary" sx={{ display: 'block', marginBottom: 12 }}>alternativeLabel</Typography>
          <Stepper activeStep={2} alternativeLabel>
            <Step><StepLabel>受注</StepLabel></Step>
            <Step><StepLabel>調理中</StepLabel></Step>
            <Step><StepLabel>配達中</StepLabel></Step>
            <Step><StepLabel>配達完了</StepLabel></Step>
          </Stepper>
        </Card>
      </section>

      <Divider sx={{ marginTop: 40, marginBottom: 40 }}/>

      {/* Chat */}
      <section style={{ marginBottom: 64 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 16 }}>
          <Typography variant="h4">Chat</Typography>
          <Chip size="small" label="NEW" color="primary"/>
          <Chip size="small" label="Base UI" variant="outlined"/>
          <Chip size="small" label="AI-ready" variant="outlined"/>
        </Stack>
        <Typography variant="body2" color="secondary" sx={{ marginBottom: 24 }}>
          会話型 UI の公式プリミティブ。<code>Chat</code> / <code>ChatList</code> /
          <code> ChatMessage</code> / <code>ChatComposer</code> から構成。
          AI アシスタント・チーム内メッセージング・サポート窓口まで slots で拡張可能。
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 24 }}>
          <Card sx={{ padding: 0, overflow: 'hidden' }}>
            <CardContent sx={{ padding: 16 }}>
              <Typography variant="overline" color="secondary">顧客サポートチャット</Typography>
            </CardContent>
            <div style={{ padding: 16, paddingTop: 0 }}>
              <Chat height={420}>
                <ChatHeader
                  avatar={<Avatar size={36}>田</Avatar>}
                  title="田中 恵 (ORD-20426)" subtitle="カスタマーサポート" status="online"
                  actions={<IconButton size="small"><Icons.Videocam fontSize="small"/></IconButton>}
                />
                <ChatList>
                  <ChatMessage variant="system">チャット開始 · 12:30</ChatMessage>
                  {chatMsgs.map(m => (
                    <ChatMessage key={m.id} variant={m.v} timestamp={m.ts} status={m.status}
                      avatar={m.v === 'received' ? <Avatar size={28}>田</Avatar> : undefined}>
                      {m.text}
                    </ChatMessage>
                  ))}
                </ChatList>
                <ChatComposer
                  suggestions={['配達状況を確認', '配達員に連絡', 'キャンセル']}
                  onSend={(text) => setChatMsgs(prev => [
                    ...prev,
                    { id: Date.now(), v: 'sent', text, ts: 'now', status: 'sent' },
                  ])}
                />
              </Chat>
            </div>
          </Card>
          <Card sx={{ padding: 0, overflow: 'hidden' }}>
            <CardContent sx={{ padding: 16 }}>
              <Typography variant="overline" color="secondary">AI 注文アシスタント</Typography>
            </CardContent>
            <div style={{ padding: 16, paddingTop: 0 }}>
              <Chat height={420}>
                <ChatHeader avatar={<ChatAIAvatar/>} title="Bento Copilot" subtitle="AI アシスタント" status="online"/>
                <ChatList>
                  <ChatMessage variant="received" avatar={<ChatAIAvatar size={28}/>}>
                    いつもの「ランチ B セット」で注文しますか？
                  </ChatMessage>
                  <ChatMessage variant="sent" timestamp="12:02" status="read">
                    はい、サラダを L にしてください。
                  </ChatMessage>
                  <ChatMessage variant="received" avatar={<ChatAIAvatar size={28}/>} reactions={['✨']}>
                    承知しました。配達予想は 20 分後、到着は 12:25 ごろです。
                  </ChatMessage>
                  <ChatTypingIndicator author="Bento Copilot"/>
                </ChatList>
                <ChatComposer/>
              </Chat>
            </div>
          </Card>
        </div>
      </section>

      <Divider sx={{ marginTop: 40, marginBottom: 40 }}/>

      {/* Schedule */}
      <section style={{ marginBottom: 64 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 16 }}>
          <Typography variant="h4">Schedule</Typography>
          <Chip size="small" label="NEW" color="primary"/>
          <Chip size="small" label="Base UI" variant="outlined"/>
        </Stack>
        <Typography variant="body2" color="secondary" sx={{ marginBottom: 24 }}>
          月/週/日/タイムラインの4ビュー内蔵。events 配列に
          <code>{'{ id, title, start, end, color? }'}</code> を渡すだけで描画。
          ARIA grid セマンティクスと矢印キー移動を内蔵。
        </Typography>
        <Schedule view="month" events={demoEvents}/>
      </section>

      <Divider sx={{ marginTop: 40, marginBottom: 40 }}/>

      {/* DateField / TimeField / DateTimeField */}
      <section style={{ marginBottom: 64 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 16 }}>
          <Typography variant="h4">DateField / TimeField</Typography>
          <Chip size="small" label="NEW" color="primary"/>
          <Chip size="small" label="Pickers v9" variant="outlined"/>
        </Stack>
        <Typography variant="body2" color="secondary" sx={{ marginBottom: 24 }}>
          Base UI 由来のセクション型入力。矢印キーでフィールド単位にインクリメント、
          ポップオーバー内のカレンダーで選択も可能。<code>slotProps.input</code> /
          <code> slotProps.popper</code> / <code>slotProps.day</code> に対応。
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="secondary" sx={{ display: 'block', marginBottom: 12 }}>DateField</Typography>
              <DateField label="飛行予定日" defaultValue={new Date()}/>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="overline" color="secondary" sx={{ display: 'block', marginBottom: 12 }}>TimeField</Typography>
              <TimeField label="出発時刻" defaultValue={new Date()} step={15}/>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="overline" color="secondary" sx={{ display: 'block', marginBottom: 12 }}>DateTimeField</Typography>
              <DateTimeField label="予約日時" defaultValue={new Date()}/>
            </CardContent>
          </Card>
        </div>
      </section>

      <Divider sx={{ marginTop: 40, marginBottom: 40 }}/>

      <section>
        <Typography variant="h4" gutterBottom>その他の v9 改善</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {[
            { title: 'CSS Variables + color-mix()', desc: '派生色をCSS側で計算。テーマ切替が即時でSSRフラッシュなし。', chip: 'Theme' },
            { title: 'sx prop 30% 高速化', desc: '重い sx 利用時のレンダリングパスが最適化。', chip: 'Perf' },
            { title: 'styleOverrides.variants', desc: 'クラス名キー廃止 → props条件ベースの variants 配列に統一。', chip: 'API' },
            { title: 'slots/slotProps 統一', desc: 'components/componentsProps, TransitionComponent 等が全廃。', chip: 'API' },
            { title: 'Tabs/Menu Roving tabindex', desc: '矢印キーで tabindex が動的に切替。ARIA属性も自動付与。', chip: 'A11y' },
            { title: 'TablePagination 数値整形', desc: 'Intl.NumberFormat による自動整形。', chip: 'i18n' },
            { title: 'Backdrop aria-hidden 削除', desc: 'デフォルトの aria-hidden が外れ、支援技術で過剰に隠れない。', chip: 'A11y' },
            { title: 'ButtonBase.nativeButton', desc: '非ボタン要素を使う際に明示することで SSR 整合性を保証。', chip: 'API' },
            { title: 'GridLegacy 廃止', desc: 'Grid v2 に統一。item prop 不要、size={{ xs: 12 }} 形式。', chip: 'Breaking' },
          ].map((f, i) => (
            <Card key={i}>
              <CardContent>
                <Chip size="small" label={f.chip} variant="outlined" sx={{ marginBottom: 12 }}/>
                <Typography variant="subtitle2" gutterBottom>{f.title}</Typography>
                <Typography variant="body2" color="secondary">{f.desc}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
