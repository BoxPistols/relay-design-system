import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack, Typography } from '../../components';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';

const meta: Meta = { title: 'Foundations/Spacing' };
export default meta;

export const Grid: StoryObj = {
  render: () => {
    const t = useTokens();
    return (
      <Stack spacing={1}>
        {[4, 8, 12, 16, 24, 32, 48, 64].map((s) => (
          <Stack key={s} direction="row" alignItems="center" spacing={2}>
            <div style={{ width: 60, fontFamily: fonts.mono, fontSize: 12, color: t.text.muted }}>{s}px</div>
            <div style={{ height: 16, width: s, backgroundColor: t.brand.main, borderRadius: 2 }}/>
          </Stack>
        ))}
        <Typography variant="caption" color="secondary">4px base scale · spacing(n) = 4n px</Typography>
      </Stack>
    );
  },
};
