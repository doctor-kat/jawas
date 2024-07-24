import { CardAttributes, SWUCard } from "@/types/swu-official/SWUCard";

export type FilterGroup = Record<string, FilterItem[]>;
export type FilterItem = {
    name: string;
    count: number;
    key: keyof CardAttributes;
    active?: boolean;
};

export function isNotVariant(card: SWUCard): boolean {
    return !card.attributes.variantOf.data && !card.attributes.hasFoil;
}

export const FILTER_KEYS: Record<string, keyof CardAttributes> = {
    Type: "type",
    Aspect: "aspects",
    Rarity: "rarity",
    Keywords: "keywords",
    Traits: "traits",
    Cost: "cost",
};

export function getDistinctValues(
    cards: SWUCard[],
    key: keyof CardAttributes,
): FilterItem[] {
    const matches: string[] = cards.flatMap((card) => {
        const data = (card.attributes[key] as any)?.data;
        if (!data) {
            return card.attributes[key] ?? "None";
        } else if (Array.isArray(data)) {
            return data.flatMap((d: any) => d.attributes.name);
        } else {
            return data.attributes.name;
        }
    });
    const matchCount = matches.reduce<Record<string, number>>((acc, match) => {
        acc[match] ??= 0;
        acc[match]++;
        return acc;
    }, {});
    return Object.entries(matchCount)
        .map(([name, count]) => ({
            name,
            count,
            key,
        }))
        .sort((a, b) => (a.name > b.name ? 1 : -1));
}

export function generateFilters(cards?: SWUCard[]): FilterGroup {
    return Object.fromEntries(
        Object.entries(FILTER_KEYS).map(([name, key]) => [
            name,
            cards?.length ? getDistinctValues(cards, key) : [],
        ]),
    );
}

export function applyFilterGroup({
    filterGroup,
    cards,
}: {
    filterGroup: FilterGroup;
    cards: SWUCard[];
}) {
    if (
        Object.values(filterGroup).every((filters) =>
            filters.every((filter) => !filter.active),
        )
    ) {
        return cards;
    }

    return cards.filter((card) =>
        Object.entries(filterGroup).reduce<boolean>(
            (keyAcc, [key, filters]) => {
                const activeFilters = filters.filter((f) => f.active);
                return (
                    keyAcc && // AND between keys ie. Type==Base && Aspect==Command
                    (!activeFilters.length || // no selection = all cards
                        activeFilters.reduce<boolean>((filterAcc, filter) => {
                            const data = (card.attributes[filter.key] as any)
                                ?.data;
                            if (!data) {
                                return (
                                    filterAcc ||
                                    (card.attributes[filter.key] ?? "None") ==
                                        filter.name
                                );
                            } else if (Array.isArray(data)) {
                                return (
                                    filterAcc ||
                                    data.some((d) =>
                                        d.attributes.name.includes(filter.name),
                                    )
                                );
                            } else {
                                return (
                                    filterAcc ||
                                    data.attributes.name === filter.name
                                );
                            }
                        }, false))
                );
            },
            true,
        ),
    );
}
