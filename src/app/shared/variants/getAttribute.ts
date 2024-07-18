import { SWUCard } from "@/types/swu-official/SWUCard";

export function getParentId({ card }: { card: SWUCard }): string | null {
    const variantOfId = card.attributes.variantOf.data?.id;
    return variantOfId ? String(variantOfId) : null;
}

export function getVariantType({ card }: { card: SWUCard }): string {
    return card.attributes.variantTypes.data
        .map((variantType) => variantType.attributes.name)
        .join(",");
}
