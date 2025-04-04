import { cn } from "@/lib/utils"
import { forwardRef, HTMLAttributes } from "react"
import Image from "next/image";


export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	cardTitle: string;
	description: string;
	imageUrl: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
	function Card({ imageUrl, description, cardTitle, className, ...props }, ref) {
		props.title
		return (
			<>
				<div
					ref={ref}
					className={cn(
						"rounded-lg border bg-card text-card-foreground shadow-sm",
						className
					)}
					{...props}
				>
					<CardContent>
						<CardDescription className="py-2">{description}</CardDescription>
						<Image width={488} height={680} alt={cardTitle} src={imageUrl}></Image>
					</CardContent>
				</div>
			</>
		)
	})


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
