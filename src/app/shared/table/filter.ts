import { SWUCard } from "@/types/swu-official/SWUCard";

export function isNotVariant(card: SWUCard): boolean {
    return !card.attributes.variantOf.data && !card.attributes.hasFoil;
}
