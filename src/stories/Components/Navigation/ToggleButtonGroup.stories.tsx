import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '../../../components';

const meta: Meta = { title: 'Components/Navigation/ToggleButtonGroup' };
export default meta;

export const Exclusive: StoryObj = {
  render: () => {
    const [v, setV] = useState<string | null>('12h');
    return (
      <ToggleButtonGroup exclusive value={v} onChange={(_, n) => setV(n)}>
        <ToggleButton value="1h">1H</ToggleButton>
        <ToggleButton value="12h">12H</ToggleButton>
        <ToggleButton value="24h">24H</ToggleButton>
        <ToggleButton value="7d">7D</ToggleButton>
      </ToggleButtonGroup>
    );
  },
};
