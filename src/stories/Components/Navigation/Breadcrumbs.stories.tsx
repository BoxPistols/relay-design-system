import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs, Link, Typography } from '../../../components';

const meta: Meta = { title: 'Components/Navigation/Breadcrumbs' };
export default meta;

export const Default: StoryObj = {
  render: () => (
    <Breadcrumbs>
      <Link href="#">Home</Link>
      <Link href="#">Fleet</Link>
      <Typography variant="body2" color="secondary">DRN-0042</Typography>
    </Breadcrumbs>
  ),
};
