
import { getRequestContext } from "@cloudflare/next-on-pages"

export const runtime = 'edge';

export async function QueryMany<T>(q: string, ...params: unknown[]) {
	const { env } = getRequestContext();
	const stmt = env.DB.prepare(q);
	stmt.bind(...params);
	const res = await stmt.run();

	if (!res.success) {
		throw new Error("error getting results from D1 database", {
			cause: res.error
		});
	}

	return res.results as T[];
}

