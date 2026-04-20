import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Stack } from '../../../components';

const meta: Meta = { title: 'Components/v9 New/Stepper' };
export default meta;

/**
 * ★ v9で強化: <ol>/<li>, role="tablist", Roving tabindex
 */
export const Horizontal: StoryObj = {
  render: () => {
    const [active, setActive] = useState(1);
    return (
      <div style={{ width: 560, padding: 20 }}>
        <Stepper activeStep={active}>
          <Step><StepLabel>店舗選択</StepLabel></Step>
          <Step><StepLabel optional="任意">メニュー・オプション</StepLabel></Step>
          <Step><StepLabel>お届け先・時間</StepLabel></Step>
          <Step><StepLabel>決済</StepLabel></Step>
        </Stepper>
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ marginTop: 24 }}>
          <Button variant="outlined" size="small" disabled={active === 0}
            onClick={() => setActive(Math.max(0, active - 1))}>戻る</Button>
          <Button variant="contained" size="small" disabled={active === 3}
            onClick={() => setActive(Math.min(3, active + 1))}>次へ</Button>
        </Stack>
      </div>
    );
  },
};

export const AlternativeLabel: StoryObj = {
  render: () => (
    <div style={{ width: 560, padding: 20 }}>
      <Stepper activeStep={2} alternativeLabel>
        <Step><StepLabel>受注</StepLabel></Step>
        <Step><StepLabel>調理中</StepLabel></Step>
        <Step><StepLabel>配達中</StepLabel></Step>
        <Step><StepLabel>配達完了</StepLabel></Step>
      </Stepper>
    </div>
  ),
};
