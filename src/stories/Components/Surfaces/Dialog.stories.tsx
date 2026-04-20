import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography,
} from '../../../components';

const meta: Meta = { title: 'Components/Surfaces/Dialog' };
export default meta;

export const Default: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>機体の削除</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="secondary">
              この操作は取り消せません。対象の機体と関連するフライト履歴が完全に削除されます。
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={() => setOpen(false)}>キャンセル</Button>
            <Button variant="contained" color="error" onClick={() => setOpen(false)}>削除</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};
