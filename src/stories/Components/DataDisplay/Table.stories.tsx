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
            <TableCell variant="head">機体ID</TableCell>
            <TableCell variant="head">モデル</TableCell>
            <TableCell variant="head">ステータス</TableCell>
            <TableCell variant="head" align="right">バッテリー</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            { id: 'DRN-0042', model: 'Scout-X3', s: '稼働', bat: '87%' },
            { id: 'DRN-0118', model: 'Cargo-P1', s: '稼働', bat: '62%' },
            { id: 'DRN-0203', model: 'Scout-X3', s: '整備', bat: '—' },
          ].map((r) => (
            <TableRow key={r.id} hover>
              <TableCell sx={{ fontFamily: fonts.mono, fontSize: 13 }}>{r.id}</TableCell>
              <TableCell>{r.model}</TableCell>
              <TableCell><Chip size="small" color={r.s === '稼働' ? 'success' : 'warning'} label={r.s}/></TableCell>
              <TableCell align="right">{r.bat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
