import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"
import { NavigationMenu, NavigationTab } from "@/components/ui/navigation-menu";
import { getDictionary } from "@/lib/i18n";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Magic Inspiration",
	description: "Inspiration for DMs using Magic the Gathering cards!",

};

export default async function RootLayout({
	children,
	params
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}>) {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	return (
		<html lang={lang}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<header className="fixed top-0 z-10 flex border-b border-dark-20 h-16 w-full justify-center">
					<NavigationMenu>
						<NavigationTab href="#" title="Home" />
						<NavigationTab href="#about" title={dict.about} />
					</NavigationMenu>
				</header>
				<main className="pt-16">
					{children}
				</main>
				<footer className="h-16 border-t-1 border-dark-20 flex text-center items-center justify-center">
					<p className="m-0 justify-center">For any suggestions <a rel="author" href="mailto:gabriel.panzenhagen@gmail.com">contact me</a>, or check out <a rel="me" href="https://panz.dev.br/">my website</a>.
						This is a fanmade project and I am not affiliated with Wizards of the Coast.</p>
				</footer>
			</body>
		</html>
	);
}
