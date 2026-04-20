import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  Paper, Chip,
} from '../../../components';
import { fonts } from '../../../tokens';

const meta: Meta = { title: 'Components/Data Display/Table' };
export default meta;

export const Basic: StoryObj = {
  render: () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">注文 ID</TableCell>
            <TableCell variant="head">店舗</TableCell>
            <TableCell variant="head">ステータス</TableCell>
            <TableCell variant="head" align="right">合計</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            { id: 'ORD-20426', store: 'Bistro MARU', s: '配達中', amount: '¥2,480' },
            { id: 'ORD-20427', store: 'Curry Lab', s: '配達中', amount: '¥1,680' },
            { id: 'ORD-20428', store: 'Sushi Tora', s: '調理中', amount: '¥4,200' },
          ].map((r) => (
            <TableRow key={r.id} hover>
              <TableCell sx={{ fontFamily: fonts.mono, fontSize: 13 }}>{r.id}</TableCell>
              <TableCell>{r.store}</TableCell>
              <TableCell><Chip size="small" color={r.s === '配達中' ? 'success' : 'warning'} label={r.s}/></TableCell>
              <TableCell align="right">{r.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
