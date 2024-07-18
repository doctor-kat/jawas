import { db } from "@/app/shared/db";
import { getParentId } from "@/app/shared/variants/getAttribute";
import { SWUCard } from "@/types/swu-official/SWUCard";

export async function getVariants({
    id,
    card,
}: {
    id?: string;
    card?: SWUCard;
}): Promise<SWUCard[]> {
    if (id && !card) {
        card = await db.cards.get(id);
    }

    if (card) {
        const variantOfId = getParentId({ card });
        const parent = variantOfId ? await db.cards.get(variantOfId) : null;

        const standard = parent ?? card;
        const variants = standard.attributes.variants.data ?? [];
        const foils = (
            await Promise.all(
                [standard, ...variants]
                    .filter((c) => !!c)
                    .map(
                        async (variant) => await db.cards.get(`${variant.id}F`),
                    ),
            )
        ).filter((v) => !!v);
        return [standard, ...variants, ...foils]
            .filter((c) => !!c)
            .toSorted((a, b) => (String(a.id) > String(b.id) ? 1 : -1));
    }

    return [];
}
