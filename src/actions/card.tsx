'use server'
import { CardProps } from "@/components/ui/card";
import { setTimeout } from "node:timers/promises";

type PlotItem = {
    description: string;
    query: string;
    types: string[];
}

const scryfallApi = 'https://api.scryfall.com/cards/random?q='
const plot: PlotItem[] = [
    { types: ['basic', 'land'], description: 'The Location', query: "t:basic+t:land" },
    { types: ['legendary', 'land'], description: 'The Dungeon', query: "t:legendary+t:land" },
    { types: ['legendary', 'artifact'], description: 'The MacGuffin', query: "t:legendary+t:artifact+-t:planeswalker+-t:emblem" },
    { types: ['legendary', 'creature'], description: 'The Antagonist', query: "t:legendary+t:creature" },
    { types: ['legendary', 'creature'], description: 'A Companion', query: "t:legendary+t:creature" },
    { types: ['sorcery'], description: 'A Twist', query: "t:sorcery+r<=r" },
    { types: ['instant'], description: 'The Final Boss\' Ability', query: "t:instant+-t:adventure+r>r" },
    { types: ['sorcery'], description: 'A Consequence for Failure/Success', query: "t:sorcery+-t:adventure+r>r" },
    { types: ['legendary', 'artifact'], description: 'The Vorpal (a legendary item to power up the party)', query: "t:legendary+t:artifact+-t:planeswalker+-t:emblem+t:equipment" },
]

const encounter: PlotItem[] = [
    { types: ['creature'], description: 'Creature', query: "-t:legendary+t:creature" },
    { types: ['creature'], description: 'Creature', query: "-t:legendary+t:creature" },
    { types: ['sorcery', 'instant'], description: 'Special Ability/Event', query: "-t:legendary+t:sorcery+or+t:instant" },
    { types: ['sorcery', 'instant', 'enchantment'], description: 'Enchantment/Ambient Modifier', query: "-t:legendary+t:sorcery+or+t:instant+or+t:enchantment" },
]

const loot: PlotItem[] = [
    { types: ['equipment'], description: 'Loot', query: "-t:legendary+-t:creature+t:equipment+-t:emblem+-t:planeswalker+r<r" },
    { types: ['equipment'], description: 'Loot', query: "-t:legendary+-t:creature+t:equipment+-t:emblem+-t:planeswalker+r<r" },
    { types: ['equipment'], description: 'Strong Loot', query: "-t:legendary+-t:creature+t:equipment+-t:emblem+-t:planeswalker+r>=r" },
]

export async function GenerateCardList(): Promise<CardProps[]> {
    const cards = [];
    for (const p of plot) {
        const c = await getCard(p)
        cards.push(c)
        await setTimeout(100)
    }

    return cards;
}

export async function GenerateEncounter(): Promise<CardProps[]> {
    const cards = [];
    for (const e of encounter) {
        const c = await getCard(e)
        cards.push(c)
        await setTimeout(100)
    }

    return cards;
}

export async function GenerateLoot(): Promise<CardProps[]> {
    const cards = [];
    for (const l of loot) {
        const c = await getCard(l)
        cards.push(c)
        await setTimeout(100)
    }

    return cards;
}

async function getCard(p: PlotItem): Promise<CardProps> {
    return fetch(scryfallApi + p.query, {
        headers: {
            "User-Agent": "MTGPlotGenApp/0.1",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => {
            let image = ''
            if (json.image_uris) {
                image = json.image_uris.normal
            } else {
                if (json.card_faces) {
                    const face = json.card_faces.find((f: any) => {
                        let found = false;
                        for (const t of p.types) {
                            found = f.type_line.toLowerCase().includes(t)
                        }
                        return found;
                    })

                    image = face.image_uris.normal
                }
            }
            return {
                cardTitle: json.name,
                imageUrl: image,
                description: p.description
            };
        }).catch(err => {
            console.error(p, err);
            throw err;
        })
}