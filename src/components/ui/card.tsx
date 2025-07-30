'use client'
import { cn } from "@/lib/utils"
import { forwardRef, HTMLAttributes, useState } from "react"
import Image from "next/image";
import { HelpCircle } from "lucide-react";
import { CardListTypes } from "@/lib/types";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	type: CardListTypes,
	imageUrl: string;
	details: string;
	description: string;
	currentIndex?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
	function Card({ description, imageUrl, className, type, currentIndex, ...props }, ref) {
		const [details, setDetails] = useState(false);
		return (
			<>
				<div
					ref={ref}
					className={cn(
						"rounded-lg border border-light-30 dark:border-dark-30 text-card-foreground shadow-sm",
						className
					)}
					{...props}
				>
					<CardContent>
						<CardDescription className="py-2 flex relative items-center justify-center print:text-center">
							{description}  <CardInfo className="absolute -right-4 print:hidden" onClick={() => setDetails(!details)} />
						</CardDescription>
						<div className="relative">
							<div className={cn(
								"absolute text-center items-center content-center bg-light-0 dark:bg-dark-0 w-full h-full transition-opacity duration-200",
								details
									? "opacity-100"
									: "opacity-0",
								"print:hidden")
							}>{props.details}</div>
							<Image
								loading="lazy"
								placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUUNKoBwAB3wDzzrHI/AAAAABJRU5ErkJggg=="
								className="rounded-xl"
								width={488}
								height={680}
								alt={description}
								src={imageUrl}>
							</Image>
							<span className="print:hidden">
								{currentIndex}
							</span>
						</div>
					</CardContent >
				</div >
			</>
		)
	})

function CardInfo(props: HTMLAttributes<HTMLButtonElement>) {
	return (
		<button {...props}>
			<HelpCircle />
		</button>
	)
}

function CardDescription({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	)
}

function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("p-6 pt-0", className)} {...props} />
	)
}

export default Card
