'use client'
import { HTMLAttributes, useActionState, useRef } from "react"
import Card from "./card"
import Carousel, { CarouselItem } from "./carousel"
import { Button } from "./button"
import { Download, Loader2 } from "lucide-react"
import { useReactToPrint } from "react-to-print"
import Printable from "../exports/printable"
import { CardListTypes } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Dict } from "@/lib/i18n"
import { Card as CardType } from "@/app/api/[slug]/internal"

export interface CardContainerProps extends HTMLAttributes<HTMLDivElement> {
	type: CardListTypes,
	dict: Dict
}

const CardContainer = ({ className, dict, type, ...params }: CardContainerProps) => {
	const callServer = async (state: any[], _formData: FormData) => {
		return await fetch(`/api/${type}`).then(async res => {
			return await res.json() as CardType[];
		}).catch(err => { console.log(err); return state; });
	}

	const [cardItems, cardAction, cardPending] = useActionState<CardType[], FormData>(callServer, []);
	const printRef = useRef<HTMLDivElement>(null);

	const printList = useReactToPrint({ contentRef: printRef });

	const buttonClass = "w-32";
	let buttonText = "";
	switch (type) {
		case "loot":
			buttonText = dict.drawLoot;
			break;
		case "encounter":
			buttonText = dict.drawEncounter;
			break;
		case "plot":
		default:
			buttonText = dict.drawPlot;
			break;
	}

	return (
		<>
			<div {...params} className={cn("", className)}>
				<form className="self-center justify-center items-center flex" action={cardAction}>
					{cardPending
						?
						<Button
							disabled
							type="submit"
							className={buttonClass}
						>
							<Loader2 className="animate-spin" />
							{dict.pleaseWait}
						</Button>
						:
						<Button
							type="submit"
							className={buttonClass}
						>
							{buttonText}
						</Button>
					}
					<Button type="button" size="icon" hidden={cardItems.length === 0} variant="secondary" className="self-center" onClick={() => printList()}>
						<Download />
					</Button>
				</form>
				{
					cardItems.length > 0
						? <>
							<Carousel className="w-full max-w-xs">
								{...cardItems.map((c, index) => (
									<CarouselItem key={index}>
										<div className="p-1">
											<Card {...c}
												type={type}
												description={dict.cardTranslations[type][c.card_key].description}
												details={dict.cardTranslations[type][c.card_key].details}
												currentIndex={`${index + 1} ${dict.of} ${cardItems.length}`}
											/>
										</div>
									</CarouselItem>
								))}
							</Carousel>
						</>
						: ''
				}
			</div>

			<Printable ref={printRef} className="justify-center hidden print:flex print:flex-wrap" >
				{
					...cardItems.map((c, index) => (
						<div className="break-inside-avoid w-1/2" key={index}>
							<Card {...c}
								type={type}
								description={dict.cardTranslations[type][c.card_key].description}
								details={dict.cardTranslations[type][c.card_key].details}
							/>
						</div>
					))
				}
			</Printable>
		</>
	)
}

export default CardContainer;
