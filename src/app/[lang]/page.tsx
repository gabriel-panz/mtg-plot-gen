'use server'
import Article from "@/components/ui/article";
import CardContainer from "@/components/ui/cardContainer";
import { getDictionary } from "@/lib/i18n";

export default async function Home({
	params
}: { params: Promise<{ lang: string }> }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	const CardContainerDict = {
		drawLoot: dict.drawLoot,
		drawEncounter: dict.drawEncounter,
		drawPlot: dict.drawPlot,
		of: dict.of,
		pleaseWait: dict.pleaseWait
	}

	return (
		<>
			<section className="flex flex-col items-center justify-center min-h-dvh">
				<h1 className="mb-2"> Magic Inspiration </h1>
				<h4 className="mb-4">{dict.subtitle}</h4>
				<main className="text-center py-6 min-h-2/5 justify-between flex content-between flex-col">
					<CardContainer lang={lang} dict={CardContainerDict} className="mb-1" type="plot" />
					<CardContainer lang={lang} dict={CardContainerDict} className="mb-1" type="encounter" />
					<CardContainer lang={lang} dict={CardContainerDict} type="loot" />
				</main>
			</section>
			<section className="flex flex-col text-justify">
				<a id="about" className="anchor"></a>
				<Article title={dict.whatIsThisTitle} id="what-is" >
					{dict.whatIsThis}
				</Article>
				<Article title={dict.whatIsNotTitle} id="what-is-not">
					{dict.whatIsNot}
				</Article>
				<Article title={dict.howToUseTitle} id="how-to-use">
					{dict.howToUse}
				</Article>
			</section>
		</>
	);
}
