import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs, Tab } from '../../../components';

const meta: Meta = { title: 'Components/Navigation/Tabs' };
export default meta;

export const Default: StoryObj = {
  render: () => {
    const [v, setV] = useState(0);
    return (
      <div style={{ width: 480 }}>
        <Tabs value={v} onChange={(_, n) => setV(n)}>
          <Tab label="概要"/>
          <Tab label="機体"/>
          <Tab label="パイロット"/>
          <Tab label="ログ"/>
        </Tabs>
      </div>
    );
  },
};
