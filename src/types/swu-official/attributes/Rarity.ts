import { AttributesWrapper, BasicAttributes } from "./Attributes";

export type RarityAttributesWrapper = AttributesWrapper<RarityAttributes>;

interface RarityAttributes extends BasicAttributes<Rarity> {
    locale: string;
    englishName: string;
}

export enum Rarity {
    COMMON = "Common",
    UNCOMMON = "Uncommon",
    RARE = "Rare",
    LEGENDARY = "Legendary",
    SPECIAL = "Special",
}

export const RARITY_ORDER = [
    Rarity.LEGENDARY,
    Rarity.RARE,
    Rarity.UNCOMMON,
    Rarity.COMMON,
    Rarity.SPECIAL,
];
