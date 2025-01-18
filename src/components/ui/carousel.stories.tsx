import type { Meta, StoryObj } from '@storybook/react';
import '@/app/globals.css';

import Carousel from './carousel';

const meta = {
  component: Carousel,
  tags: ['autodocs']
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};