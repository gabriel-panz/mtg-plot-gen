import { CardProps } from "@/components/ui/card";
import { QueryMany } from "@/lib/db";
import { CardListTypes } from "@/lib/types";

type QueryItem = {
	key: string;
	description: string;
}

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
	}

	return cards;
}

async function getCard(p: QueryItem): Promise<CardProps> {
	const q = `
	SELECT * FROM cards
	WHERE id IN (
	   SELECT card_id FROM categoryIndex
	   WHERE name = ?
	   ORDER BY RANDOM() LIMIT 1
	);`

	const result = await QueryMany<dbCards>(q, p.key);

	if (!result.length) return {
		cardTitle: 'not found',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500',
		description: p.description
	}

	return {
		cardTitle: result[0].scryfall_id,
		imageUrl: result[0].img_id,
		description: p.description
	};
}

type dbCards = {
	scryfall_id: string,
	img_id: string,
	description: string
}
