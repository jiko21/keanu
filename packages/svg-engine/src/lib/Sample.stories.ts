import type { Meta, StoryObj } from '@storybook/react';

import { Sample } from './Sample';

const meta = {
  title: 'Example/Sample',
  component: Sample,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
