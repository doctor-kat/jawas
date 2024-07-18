import { AttributesWrapper, BasicAttributes } from "./Attributes";

export type TypeAttributesWrapper = AttributesWrapper<TypeAttributes>;

interface TypeAttributes extends BasicAttributes<Type> {
    value: Type;
    locale: string;
    sortValue: number;
}

export enum Type {
    LEADER = "Leader",
    BASE = "Base",
    UNIT = "Unit",
    EVENT = "Event",
    UPGRADE = "Upgrade",
    TOKEN = "Token Upgrade",
}
