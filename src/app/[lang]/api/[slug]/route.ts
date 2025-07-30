import { NextRequest, NextResponse } from "next/server";
import { GenerateCardList } from "./internal";
import { CardListTypes } from "@/lib/types";

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ lang: string, slug: string }> }
) {
	const { slug, lang } = await params;

	const list = await GenerateCardList((slug as CardListTypes), lang);

	return NextResponse.json(list);
}
