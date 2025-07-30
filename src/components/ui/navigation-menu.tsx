import { cn } from "@/lib/utils"
import { forwardRef, HTMLAttributes } from "react"
import { Button } from "./button"

const NavigationMenu = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	function NavigationMenu({ children, ...props }, ref) {
		return (
			<nav
				ref={ref}
				{...props}
				className="bg-light-0 dark:bg-dark-0 w-full flex self-end"
			>
				<ul
					className={cn(
						"flex flex-row justify-center w-full",
						props.className
					)}
				>
					{children}
				</ul>
			</nav>
		)
	}
)

export interface NavTabProps extends HTMLAttributes<HTMLLIElement> {
	title: string,
	href: string
}

const NavigationTab = forwardRef<HTMLLIElement, NavTabProps>(
	function NavigationTab(props, ref) {
		return (
			<li
				ref={ref}
				className={cn("flex", props.className)}
			>
				<a
					href={props.href}
					className={cn("", props.className)}
				>
					<Button className="h-16 bg-dark-0" variant="default">
						{props.title}
					</Button>
				</a>
			</li>
		)
	}
)

export { NavigationMenu, NavigationTab }

