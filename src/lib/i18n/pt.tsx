const WhatIsThis = (
	<>
		<p>
			Esta é uma ferramenta criativa para fornecer inspiração e estrutura para seus enredos, encontros e saques de RPG, escolhendo cartas aleatórias de Magic the Gathering.
		</p>
		<p> Esta é uma extensão do jogo de Design de Aventuras que jogamos como Mestres de Jogo.</p>
		<p> É baseado <a rel="external" href="https://auricanslair.wordpress.com/2017/11/07/create-adventures-using-your-magic-the-gathering-cards/" target="_blank">neste artigo</a> e em muitas outras discussões online sobre o tema.
		</p>
		<p>
			MtG é um jogo cheio de sabor, com magias, criaturas e locais repletos de potencial para aventura e RPG.
		</p>
		<p>
			A vasta quantidade de cartas pode fornecer combinações infinitas de tropos, desafios, itens mágicos, decisões e personagens.
		</p>
		<p>
			Embora tenha sido projetado para DnD, pode ser usado para qualquer outro RPG de ação.
		</p>
	</>
);

const WhatIsNot = (
	<>
		<p>Este NÃO é um gerador de enredo/história.</p>
		<p>Você será quem criará uma aventura a partir disto; a ferramenta apenas fornece inspiração a partir de uma combinação aleatória de um conjunto selecionado de cartas.
		</p>
		<p>Este NÃO é gerado por IA nem relacionado a LLMs.</p>
		<p>Seu propósito é o oposto: fornecer a VOCÊ, o humano, uma sugestão pseudoaleatória que você pode usar para criar uma história, encontro ou recompensa divertida para seus jogadores.</p>
	</>
)

const HowToUse = (
	<>
		<p>
			Primeiro, clique no botão "Desenhar" da categoria desejada.
			Isso abrirá um carrossel com as cartas que você comprou.
		</p>
		<p> Cada categoria tem seu próprio conjunto de cartas, cada uma representando um ponto de inspiração diferente. </p>
		<p> Por exemplo, se você clicar no botão "Desenhar Mapa", nove cartas serão compradas. A primeira delas será o local onde seu mapa será definido. Cada carta tem um título logo acima e, se você clicar no ícone de interrogação, uma explicação de como usar a carta será exibida. </p>
	</>
)

const cardTranslations = {
	plot: {
		location: {
			details: "Um local onde a história se passa. Pode ser a área inicial, o reino inteiro, etc.",
			description: "A Localização"
		},
		dungeon: {
			details: "Onde o conteúdo principal da história se passa. Pode ser o seu castelo, uma masmorra de verdade, pode ser apenas a parte final da história, o começo ou até mesmo um desvio.",
			description: "A Dungeon"
		},
		macguffin: {
			details: "Este é o item que o vilão precisa, que os personagens principais querem ou o dispositivo do juízo final que poderia destruir toda a vida como a conhecemos. É o Um Anel, ou o Stargate.",
			description: "O MacGuffin"
		},
		antagonist: {
			details: "Bastante autoexplicativo. Mas não precisa ser um vilão. Pode ser uma pessoa bem-intencionada que se opõe aos personagens principais de alguma forma. Quer matá-los, detê-los ou vencê-los em uma corrida.",
			description: "O Antagonista"
		},
		companion: {
			details: "Um NPC amigável, alguém para introduzir a história ou para conduzi-la. Pode ser o salvador dos personagens principais em um momento de necessidade ou um amigo em perigo a ser salvo.",
			description: "Uma Companhia"
		},
		twist: {
			details: "Ajuda a manter sua história interessante. Tente colocar isso no lugar menos esperado. Interprete isso como um desafio adicional para surpreender seus jogadores sempre que acharem que as coisas estão ficando muito chatas, ou fáceis demais, ou simplesmente quando acharem que tudo está começando a ir bem demais.",
			description: "Uma Reviravolta"
		},
		final_boss_ability: {
			details: "Pessoalmente, adoro uma habilidade especial para apimentar um encontro final. Tente ler o contexto, convertendo as regras para o seu RPG de mesa.",
			description: "A Habilidade Especial do Vilão"
		},
		consequence: {
			details: "Essas são as apostas. Se os jogadores não detiverem o vilão, o que acontece? Ou talvez, o que acontece se conseguirem detê-lo? Pode ser uma recompensa ou uma punição.",
			description: "Uma Consequência em caso de Sucesso/Falha"
		},
		vorpal: {
			details: "Este é um item ou arma mágica poderosa. Ele ajudará os jogadores em sua jornada. Talvez eles o encontrem no final da masmorra, ou talvez ele esteja com eles o tempo todo.",
			description: "A Arma Vorpal"
		}
	},
	encounter: {
		creature: {
			details: "Use esta criatura em um encontro. Seus jogadores podem ter que lutar com ela, vencê-la em uma luta de dança ou simplesmente escapar dela.",
			description: "Criatura"
		},
		special_ability: {
			details: "Imagine isso como o tempero para o seu encontro: é o que pode transformar uma criatura básica em algo único. É a habilidade primária da criatura, ou uma arma especial que ela possui. Talvez o vilão tenha lhe dado uma maldição mágica.",
			description: "Habilidade/Evento Especial"
		},
		enchantment: {
			details: "Este é um tipo de modificador de terreno/ambiente. Use-o para tornar seu encontro mais dinâmico. Não é algo que funcione particularmente contra os jogadores, mas torna toda a situação mais caótica e imprevisível. Como uma tempestade de areia, um campo mágico selvagem ou uma debandada de elefantes.",
			description: "Encantamento ou Modificador de Ambiente"
		}
	},
	loot: {
		loot: {
			details: "Uma recompensa para seus jogadores. Garanta que seja divertido!",
			description: "Loot"
		},
		strong_loot: {
			details: "Uma recompensa PODEROSA para seus jogadores. Garanta que seja divertido!",
			description: "Loot Poderoso"
		}
	}
} as const as { [key: string]: any }

export default {
	whatIsThis: WhatIsThis,
	whatIsThisTitle: "O que é?",
	whatIsNot: WhatIsNot,
	whatIsNotTitle: "O que NÃO é?",
	howToUse: HowToUse,
	howToUseTitle: "Como usar?",
	subtitle: "Inspiração de RPG para Mestres usando cartas de Magic the Gathering!",
	drawPlot: "Tirar História",
	drawEncounter: "Tirar Encontro",
	drawLoot: "Tirar Tesouro",
	pleaseWait: "Aguarde",
	cardTranslations,
	of: "de",
	about: "Sobre"
} as const
