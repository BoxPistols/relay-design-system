import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Drawer, Button, Typography } from '../../../components';

const meta: Meta = { title: 'Components/Surfaces/Drawer' };
export default meta;

export const Right: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
          <div style={{ padding: 24, width: 300 }}>
            <Typography variant="h5" gutterBottom>設定</Typography>
            <Typography variant="body2" color="secondary" sx={{ marginBottom: 16 }}>
              右側から出現するパネル。
            </Typography>
            <Button variant="contained" fullWidth onClick={() => setOpen(false)}>閉じる</Button>
          </div>
        </Drawer>
      </>
    );
  },
};
