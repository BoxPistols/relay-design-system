import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardPage } from '../../pages';

const meta: Meta = {
  title: 'Pages/Dashboard',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Default: StoryObj = { render: () => <DashboardPage/> };
