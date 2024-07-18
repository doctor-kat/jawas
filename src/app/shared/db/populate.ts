"use client";

import { db, VERSION_4_HASH } from "@/app/shared/db/index";
import { Rarity } from "@/types/swu-official/attributes/Rarity";
import { Type } from "@/types/swu-official/attributes/Type";
import { SWUCard } from "@/types/swu-official/SWUCard";
import { SWUCardsResponse } from "@/types/swu-official/SWUCardsResponse";

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export async function getAllCardsFromAssets() {
    const pages: SWUCardsResponse[] = [];
    for (let i = 1; i <= 11; i++) {
        const response = await fetch(`http://localhost:3000/cards.${i}.json`, {
            cache: "no-cache",
        });
        pages.push(await response.json());
    }
    return pages.flatMap((page) => page.data.flatMap(extractVariants));
}

function extractVariants(card: SWUCard): SWUCard[] {
    return [card, ...(card.attributes.variants.data ?? [])].filter((c) => !!c);
}

function canHaveFoil(card: SWUCard): boolean {
    const {
        type: {
            data: {
                attributes: { name: type },
            },
        },
        rarity: {
            data: {
                attributes: { name: rarity },
            },
        },
        variantTypes: { data: variantTypes },
    } = card.attributes;

    if (
        (type === Type.BASE && rarity === Rarity.RARE) ||
        (![Type.LEADER, Type.BASE, Type.TOKEN].includes(type) &&
            ![Rarity.SPECIAL].includes(rarity) &&
            variantTypes?.findIndex((variantType) =>
                ["Standard", "Hyperspace"].includes(
                    variantType.attributes.name,
                ),
            ) > -1)
    ) {
        return true;
    }
    return false;
}

export async function populate() {
    if ((await db.meta.get({ key: "digest" }))?.value === VERSION_4_HASH) {
        return;
    }

    console.log("populating swu data...");
    await db.cards.clear();
    await db.meta.clear();

    const cards = await getAllCardsFromAssets();
    await db.cards.bulkPut(
        cards.map((card) => ({ ...card, id: String(card.id) })),
    );

    // foils are not in swu-official
    const foils = cards.filter(canHaveFoil).map(
        (card) =>
            ({
                ...card,
                id: `${card.id}F`,
                attributes: {
                    ...card.attributes,
                    hasFoil: true, // use this field to label foils, since it's always false anyway
                },
            }) as SWUCard,
    );
    await db.cards.bulkPut(foils);

    const data = new TextEncoder().encode(JSON.stringify([...cards, ...foils]));
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    const hash = arrayBufferToBase64(digest);
    await db.meta.put({ key: "digest", value: hash });
    console.log("new hash", hash);
    return hash;
}
