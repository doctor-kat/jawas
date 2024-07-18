import { SWUCard } from "@/types/swu-official/SWUCard";

export interface SWUCardsResponse {
    data: SWUCard[];
    meta: {
        pagination: Pagination;
    };
}

interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}
