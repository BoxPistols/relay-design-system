import type { Meta, StoryObj } from '@storybook/react-vite';
import { LandingPage } from '../../pages';

const meta: Meta = {
  title: 'Pages/Landing',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Default: StoryObj = { render: () => <LandingPage/> };
