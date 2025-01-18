import type { Meta, StoryObj } from '@storybook/react';
import '@/app/globals.css';

import Card, { CardProps } from './card';

const meta = {
  component: Card,
  tags: ['autodocs'],
  decorators: [(story) => <div className='w-full max-w-xs'>{story()}</div>],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cardTitle: "This is a card title.",
    description: "This is a card's description",
    imageUrl: "https://cards.scryfall.io/normal/front/6/b/6bae30ba-1402-4a42-8dee-a899150fcc6e.jpg?1696890985"
  }
};
