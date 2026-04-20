import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '../../../components';

const meta: Meta = { title: 'Components/Surfaces/Accordion' };
export default meta;

export const Default: StoryObj = {
  render: () => (
    <div style={{ width: 420 }}>
      <Accordion>
        <AccordionSummary>一般設定</AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="secondary">アプリケーション全体の基本設定を行います。</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>通知設定</AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="secondary">メール・Push通知の頻度を設定できます。</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>セキュリティ</AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="secondary">2段階認証、セッション管理。</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  ),
};
