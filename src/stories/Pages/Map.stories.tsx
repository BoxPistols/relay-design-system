import type { Meta, StoryObj } from '@storybook/react-vite';
import { MapPage } from '../../pages';

const meta: Meta = {
  title: 'Pages/Map',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Default: StoryObj = { render: () => <MapPage/> };
