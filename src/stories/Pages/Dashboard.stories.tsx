import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardPage } from '../../pages';

const meta = {
  title: 'Pages/Dashboard',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Default: StoryObj = { render: () => <DashboardPage/> };
