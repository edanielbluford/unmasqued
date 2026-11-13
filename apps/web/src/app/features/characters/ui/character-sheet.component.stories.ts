import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DEMO_CHARACTERS } from '../data-access/demo-characters';
import { CharacterSheetComponent } from './character-sheet.component';

const meta: Meta<CharacterSheetComponent> = {
  title: 'Characters/Character sheet',
  component: CharacterSheetComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    character: DEMO_CHARACTERS[0],
  },
};

export default meta;
type Story = StoryObj<CharacterSheetComponent>;

export const EvelynThorne: Story = {};
