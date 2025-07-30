import { CardProps } from "@/components/ui/card";
import { QueryMany } from "@/lib/db";
import { CardListTypes } from "@/lib/types";
import * as queries from './queries.json'

type QueryItem = {
	key: string;
}

export type Card = {
	card_key: string,
	imageUrl: string
}

export async function GenerateCardList(type: CardListTypes): Promise<Card[]> {
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

async function getCard(p: QueryItem): Promise<Card> {
	const q = `
	SELECT * FROM cards
	WHERE id IN (
	   SELECT card_id FROM categoryIndex
	   WHERE name = ?
	   ORDER BY RANDOM() LIMIT 1
	);`

	const result = await QueryMany<dbCards>(q, p.key);

	if (!result.length) return {
		card_key: p.key,
		imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500',
	}

	return {
		card_key: p.key,
		imageUrl: result[0].img_id,
	};
}

type dbCards = {
	id: number,
	lang: string,
	scryfall_id: string,
	img_id: string,
}
