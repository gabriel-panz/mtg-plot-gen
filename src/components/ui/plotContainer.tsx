'use client'
import { HTMLAttributes, useActionState, useRef } from "react"
import Card from "./card"
import Carousel, { CarouselItem } from "./carousel"
import { Button } from "./button"
import { Download, Loader2 } from "lucide-react"
import { useReactToPrint } from "react-to-print"
import Printable from "../exports/printable"
import { CardListTypes } from "@/lib/types"
import { NextRequest } from "next/server"

export const runtime = 'edge';

export interface CardContainerProps extends HTMLAttributes<HTMLDivElement> {
	type: CardListTypes
}

const toProperNoun = (s: string): string => {
	let firstChar = s[0]
	return firstChar.toUpperCase() + s.slice(1)
}

const CardContainer = ({ type }: CardContainerProps) => {
	const callServer = async (state: any[], formData: FormData) => {
		return await fetch(`/api/${type}`).then(async res => {
			return await res.json() as any[];
		}).catch(err => { console.log(err); return state; });
	}

	const [cardItems, cardAction, cardPending] = useActionState<any[], FormData>(callServer, []);
	const printRef = useRef<HTMLDivElement>(null);

	const printList = useReactToPrint({ contentRef: printRef });

	return (
		<>
			<form className="self-center" action={cardAction}>
				{cardPending
					?
					<Button disabled type="submit">
						<Loader2 className="animate-spin" />
						Please wait
					</Button>
					:
					<Button type="submit">
						Generate {toProperNoun(type)}
					</Button>
				}
			</form>
			{
				cardItems.length > 0
					? <>
						<Carousel className="w-full max-w-xs">
							{...cardItems.map((c, index) => (
								<CarouselItem key={index}>
									<div className="p-1">
										<Card {...c} />
									</div>
								</CarouselItem>
							))}
						</Carousel>
						<Button className="self-center" onClick={() => printList()}>
							<Download />
						</Button>
					</>
					: ''
			}

			<Printable ref={printRef} className="justify-center hidden print:flex print:flex-wrap">
				{...cardItems.map((c, index) => (
					<div className="break-inside-avoid w-1/2" key={index}>
						<Card {...c} />
					</div>
				))}
			</Printable>
		</>
	)
}

export default CardContainer;
