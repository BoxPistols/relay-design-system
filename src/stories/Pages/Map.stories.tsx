import type { Meta, StoryObj } from '@storybook/react-vite';
import { MapPage } from '../../pages';

const meta = {
  title: 'Pages/Map',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Default: StoryObj = { render: () => <MapPage/> };
