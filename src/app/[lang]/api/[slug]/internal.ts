import { QueryMany } from "@/lib/db";
import { CardListTypes } from "@/lib/types";
import * as queries from './queries.json'
import { getDictionary } from "@/lib/i18n";

type QueryItem = {
	key: string;
}

export type Card = {
	description: string,
	details: string,
	imageUrl: string
}

const not_found_card = {
	imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500',
	description: 'Not Found',
	details: 'Not Found'
} as Card

export async function GenerateCardList(type: CardListTypes, lang: string): Promise<Card[]> {
	const qs = queries[type];
	const dict = await getDictionary(lang);
	if (!qs)
		throw new Error('cannot generate given type');

	const cards = []
	for (const q of qs) {
		const img = await getCardImageUrl(q);

		if (!img) {
			cards.push(not_found_card);
			continue;
		}

		const c = {
			description: dict.cardTranslations[type][q.key].description,
			details: dict.cardTranslations[type][q.key].details,
			imageUrl: img
		} as Card

		cards.push(c);
	}

	return cards;
}

async function getCardImageUrl(p: QueryItem): Promise<string | undefined> {
	const q = `
	SELECT * FROM cards
	WHERE id IN (
	   SELECT card_id FROM categoryIndex
	   WHERE name = ?
	   ORDER BY RANDOM() LIMIT 1
	);`

	const result = await QueryMany<dbCards>(q, p.key);

	if (!result.length)
		return undefined;

	return result[0].img_id;
}

type dbCards = {
	id: number,
	lang: string,
	scryfall_id: string,
	img_id: string,
}
