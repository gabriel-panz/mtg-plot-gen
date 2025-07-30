'server only'

const LocaleTuple = <const>["en", "pt-BR"];

export type Locales = typeof LocaleTuple[number];

export function isValidLocale(val?: string): val is Locales {
	return !!LocaleTuple.find((l) => l === val);
}

const dictionaries = {
	en: () => import('./en').then((module) => module.default),
	'en-US': () => import('./en').then((module) => module.default),
	pt: () => import('./pt').then((module) => module.default),
	'pt-BR': () => import('./pt').then((module) => module.default)
}

export async function getDictionary(locale: string): Promise<Dict> {
	if (isValidLocale(locale)) {
		return await dictionaries[locale]();
	}

	// gets a fallback
	const lang = locale.slice(0, 2);
	if (isValidLocale(lang)) {
		return await dictionaries[lang]();
	}

	// if none was found, always falls back to en
	return await dictionaries['en']();
}

export type Dict = typeof import('./en').default | typeof import('./pt').default;
