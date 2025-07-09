import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function QueryMany<T>(q: string, ...params: unknown[]) {
	const { env } = await getCloudflareContext({ async: true });
	let stmt = env.DB.prepare(q);
	const res = await stmt.bind(...params).run();

	if (!res.success) {
		throw new Error("error getting results from D1 database", {
			cause: res.error
		});
	}

	return res.results as T[];
}

