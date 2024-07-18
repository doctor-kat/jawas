import { AttributesWrapper, BasicAttributes } from "./Attributes";

export type ExpansionAttributesWrapper = AttributesWrapper<ExpansionAttributes>;

interface ExpansionAttributes extends BasicAttributes<Expansion> {
    locale: string;
    sortValue: number;
}

export enum Expansion {
    SOR = "Spark of Rebellion",
    SHD = "Shadows of the Galaxy",
    "24CE" = "2024 Convention Exclusive",
}
