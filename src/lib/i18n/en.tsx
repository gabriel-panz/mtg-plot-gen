const WhatIsThis = (
	<>
		<p>
			This is a creative tool for providing inspiration and structure for your RPG plots, encounters and loot by drawing random Magic the Gathering cards.
		</p>
		< p > This is an extension of the Adventure Design game we play as Game Masters.</p>
		< p > It's based off of <a rel="external" href="https://auricanslair.wordpress.com/2017/11/07/create-adventures-using-your-magic-the-gathering-cards/" target="_blank">this article</a> and many more online discussions on the topic.
		</p>
		<p>
			MtG is a flavorful game with spells, creatures and locations ripe with adventure and roleplay potential.
		</p>
		<p>
			The vast amount of cards can provide endless combinations of tropes, challenges, magical items, decisions and characters.
		</p>
		<p>
			Although this was designed for DnD it can be used for any other TTRPG.
		</p>
	</>
);

const WhatIsNot = (
	<>
		<p>This is NOT a plot/story generator.</p>
		<p>You'll be the one creating an adventure out of this, the tool merely provides inspiration from a random combination of a select pool of cards.
		</p>
		<p>This is NOT AI generated or related to LLMs.</p>
		<p>Its purpose is the opposite, providing YOU, the human, with a pseudo-random prompt you can use to come up with a fun story, encounter or reward for your players.</p>
	</>
)

const HowToUse = (
	<>
		<p>
			First you click the "Draw" button for the desired category,
			this will open a carousel with the cards you drew.
		</p>
		<p> Each category has its own set of card pools, each pool will represent a different point of inspiration. </p>
		<p> For example, if you click the "Draw Plot" button, it'll draw nine cards. The first of which will be the location your plot will be set in. Each card has a title right above it and if you click the interrogation icon an explanation of how to use the card will pop up. </p>
	</>
)

const cardTranslations = {
	plot: {
		location: {
			details: "A location where the story is set. This could be the beginning area, the entire realm, etc.",
			description: "The Location"
		},
		dungeon: {
			details: "Where the main content of the story is set. This could be your Castle, an actual dungeon, it could be just the final portion of the story, the very beginning or even a sidetrack.",
			description: "The Dungeon"
		},
		macguffin: {
			details: " This is the item the villain needs, the main characters want or the doomsday device that could obliterate all life as we know it.It's the One Ring, or the Stargate.",
			description: "The MacGuffin"
		},
		antagonist: {
			details: "Pretty self-explanatory. But it doesn't need to be a villain. It could be a well intentioned person who's opposed to the main characters somehow.It wants to kill them, stop them, or win against them in race.",
			description: "The Antagonist"
		},
		companion: {
			details: "A friendly NPC, someone to introduce the story, or to move it along. Could be the main characters' saviour in a time of need, or a friend in distress to be saved.",
			description: "A Companion"
		},
		twist: {
			details: "Helps keep your story interesting. Try putting this one in the least expected place. Interpret this as an additional challenge to surprise your players whenever they think things are getting too dull, or too easy, or just when they thought everything was starting to go a little too well.",
			description: "A Twist"
		},
		final_boss_ability: {
			details: "Personally I love a special ability to spice up a final encounter. Try reading the flavor, converting the rules to your TTRPG.",
			description: "The Final Boss' Ability"
		},
		consequence: {
			details: "These are the stakes. If the players don't stop the villain, what happens? Or maybe, what happens if they do manage to stop them? Could be either a reward or a punishment.",
			description: "A Consequence for Failure/Success"
		},
		vorpal: {
			details: "This is a powerful magic item or weapon. It'll help the players in their journey. Maybe they find it at the end of the dungeon, or maybe it's been with them all along.",
			description: "The Vorpal"
		}
	},
	encounter: {
		creature: {
			details: "Use this creature in an encounter, your players may have to fight it, beat it in a dance fight or just escape it.",
			description: "Creature"
		},
		special_ability: {
			details: "Imagine this as the spice for your encounter, it's what could transform a basic creature in something unique. It's the  creatures' primary ability, or a special weapon they possess. Maybe the villain provided them with a magical curse.",
			"key": "special_ability",
			description: "Special Ability/Event"
		},
		enchantment: {
			details: "This is some form of terrain/ambient modifier. Use this to make your encounter more dynamic. Not something that particularly works agains the players, but it makes the whole situation more chaotic and unpredictable. Like a sandstorm, a wild magic field, or a stampede of elefants. ",
			description: "Enchantment/Ambient Modifier"
		}
	},
	loot: {
		loot: {
			details: "A reward for your players. Be sure to make this fun!",
			description: "Loot"
		},
		strong_loot: {
			details: "A BIG reward for your players. Be sure to make this fun!",
			description: "Strong Loot"
		}
	}
} as const as { [key: string]: any }

export default {
	whatIsThis: WhatIsThis,
	whatIsThisTitle: "What is this?",
	whatIsNot: WhatIsNot,
	whatIsNotTitle: "What is this NOT?",
	howToUse: HowToUse,
	howToUseTitle: "How to Use?",
	subtitle: "TTRPG inspiration for DMs using Magic the Gathering cards!",
	drawPlot: "Draw Plot",
	drawEncounter: "Draw Encounter",
	drawLoot: "Draw Loot",
	pleaseWait: "Please Wait",
	cardTranslations,
	of: "of",
	about: "About"
} as const
