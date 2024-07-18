import { getAllCardsFromAssets, populate } from "@/app/db/populate";
import { SWUCard } from "@/types/swu-official/SWUCard";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("db") as Dexie & {
    cards: EntityTable<SWUCard, "id">;
    meta: EntityTable<Record<string, string>, "key">;
    owned: EntityTable<{ id: string; count: number }, "id">;
    trade: EntityTable<{ id: string; count: number }, "id">;
    want: EntityTable<{ id: string; count: number }, "id">;
};

db.version(4).stores({
    cards: "id, data",
    meta: "key",
    owned: "id, count",
    trade: "id, count",
    want: "id, count",
});

export const VERSION_1_HASH = "gzsXkWTzUH7xcC3f2CmsPluhZ15jFYMusJiovUhoJhI="; // original dataset with SHD
export const VERSION_2_HASH = "JofRkKX5Q9qTpLNY6e9JVTD76og4pf65Rn8yKFl0YGE="; // added entries for foils
export const VERSION_3_HASH = "CI+LT0aPITaqeafyAYkmYpDK1qI7MolRqjjKxp09azU="; // 2024 Convention Exclusives
export const VERSION_4_HASH = "oHMCMmpGi8fs3raf7p5bTVUmQ9rW+tLCdhizJbvqwJE="; // VariantType updates
export { db, getAllCardsFromAssets, populate };
``;
