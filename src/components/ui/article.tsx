import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface ArticleProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
}

export default function Article({ title, children, className, ...props }: ArticleProps) {
	return (
		<article
			className={cn("self-center max-w-xl pb-4", className)}
			{...props}
		>
			<header className="text-center">
				<h2>{title}</h2>
			</header>
			<main className="flex flex-col">
				{children}
			</main>
		</article>
	)
}
