'use server'
import { CardProps } from "@/components/ui/card";
import { setTimeout } from "node:timers/promises";
import prisma from "@/lib/db";
import { cards, Prisma } from "@prisma/client";

type QueryItem = {
    key: string;
    description: string;
}

export type CardListTypes = "loot" | "encounter" | "plot";

const queries: { [key: string]: QueryItem[] } = {
    plot: [
        { key: 'location', description: 'The Location' },
        { key: 'dungeon', description: 'The Dungeon' },
        { key: 'macguffin', description: 'The MacGuffin' },
        { key: 'antagonist', description: 'The Antagonist' },
        { key: 'companion', description: 'A Companion' },
        { key: 'twist', description: 'A Twist' },
        { key: 'final_boss_ability', description: 'The Final Boss\' Ability' },
        { key: 'consequence', description: 'A Consequence for Failure/Success' },
        { key: 'vorpal', description: 'The Vorpal (a legendary item to power up the party)' },
    ],
    encounter: [
        { key: 'creature', description: 'Creature' },
        { key: 'creature', description: 'Creature' },
        { key: 'special_ability', description: 'Special Ability/Event' },
        { key: 'enchantment', description: 'Enchantment/Ambient Modifier' },
    ],
    loot: [
        { key: 'loot', description: 'Loot' },
        { key: 'loot', description: 'Loot' },
        { key: 'strong_loot', description: 'Strong Loot' },
    ],
}

export async function GenerateCardList(type: CardListTypes): Promise<CardProps[]> {
    const qs = queries[type];
    if (!qs)
        throw new Error('cannot generate given type');

    const cards = []
    for (const q of qs) {
        const c = await getCard(q);
        cards.push(c);
        await setTimeout(100);
    }

    return cards;
}

async function getCard(p: QueryItem): Promise<CardProps> {
    const q = Prisma.sql`--sql
SELECT * FROM cards
WHERE id IN (
    SELECT card_id FROM categoryIndex
    WHERE [name] = ${p.key}
    ORDER BY RANDOM() LIMIT 1
);`
    const result = await prisma.$queryRaw<cards[]>(q)

    if (!result) return {
        cardTitle: 'not found',
        imageUrl: 'n/a',
        description: p.description
    }

    return {
        cardTitle: result[0].scryfall_id,
        imageUrl: result[0].img_id,
        description: p.description
    };
}