import { Expansion } from "@/types/swu-official/attributes/Expansion";
import { SWUCard } from "@/types/swu-official/SWUCard";
import { SWUCardsResponse } from "@/types/swu-official/SWUCardsResponse";

const SWU_OFFICIAL_API_BASE_URL = "https://admin.starwarsunlimited.com/api";
const expansionCodes = {
    [Expansion.SOR]: 2,
    [Expansion.SHD]: 8,
    [Expansion["24CE"]]: 13,
};

export async function getCardsPage({
    locale = "en",
    expansions = [Expansion.SOR, Expansion.SHD, Expansion["24CE"]],
    page = 1,
}): Promise<SWUCardsResponse> {
    const url = `${SWU_OFFICIAL_API_BASE_URL}/cards`;
    const params = new URLSearchParams({
        locale,
        "orderBy[expansion][id]": "asc",
        "sort[0]":
            "type.sortValue:asc, expansion.sortValue:desc,cardNumber:asc,",
        "filters[variantOf][id][$null]": "true",
        ...Object.fromEntries(
            expansions.map((expansion, i) => [
                `"filters[$and][1][expansion][id][$in][${i}]"`,
                expansionCodes[expansion],
            ]),
        ),
        "pagination[page]": String(page),
        "pagination[pageSize]": "50",
    });
    const response = await fetch(url + "?" + params, { cache: "no-store" });
    return response.json();
}

export async function getAllCards(): Promise<SWUCard[]> {
    const page = await getCardsPage({});
    let cards = page.data;

    for (let i = 1; i < page.meta.pagination.pageCount; i++) {
        const nextPage = getCardsPage({ page: i });
        cards = [...cards, ...(await nextPage).data];
    }

    return cards;
}
