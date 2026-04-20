import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch, Checkbox, Radio, FormControlLabel, Stack } from '../../../components';

const meta: Meta = { title: 'Components/Inputs/Toggles' };
export default meta;

export const Switches: StoryObj = {
  render: () => (
    <Stack spacing={1}>
      <FormControlLabel control={<Switch defaultChecked/>} label="Default"/>
      <FormControlLabel control={<Switch/>} label="Off"/>
      <FormControlLabel control={<Switch disabled/>} label="Disabled"/>
      <FormControlLabel control={<Switch size="small" defaultChecked/>} label="Small"/>
    </Stack>
  ),
};

export const Checkboxes: StoryObj = {
  render: () => (
    <Stack spacing={1}>
      <FormControlLabel control={<Checkbox defaultChecked/>} label="Primary"/>
      <FormControlLabel control={<Checkbox defaultChecked color="success"/>} label="Success"/>
      <FormControlLabel control={<Checkbox defaultChecked color="error"/>} label="Error"/>
      <FormControlLabel control={<Checkbox disabled/>} label="Disabled"/>
    </Stack>
  ),
};

export const Radios: StoryObj = {
  render: () => (
    <Stack spacing={1}>
      <FormControlLabel control={<Radio checked/>} label="Selected"/>
      <FormControlLabel control={<Radio/>} label="Unselected"/>
    </Stack>
  ),
};
