import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../../../base';

const meta = {
  title: 'Base/Avatar',
  component: Avatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    variant: {
      default: 'rounded'
    }
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LetterAvatar: Story = {
  args: {
    children: 'OP'
  }
};
