import type { Meta, StoryObj } from '@storybook/react-vite';
import { LandingPage } from '../../pages';

const meta = {
  title: 'Pages/Landing',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Default: StoryObj = { render: () => <LandingPage/> };
