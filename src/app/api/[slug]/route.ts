import { NextRequest, NextResponse } from "next/server";
import { GenerateCardList } from "./internal";
import { CardListTypes } from "@/lib/types";

export const runtime = 'edge';

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params;

	const list = await GenerateCardList((slug as CardListTypes));

	return NextResponse.json(list);
}
