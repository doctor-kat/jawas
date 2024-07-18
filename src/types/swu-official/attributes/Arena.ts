import { AttributesWrapper, BasicAttributes } from "./Attributes";

export type ArenaAttributesWrapper = AttributesWrapper<ArenaAttributes>;

interface ArenaAttributes extends BasicAttributes<Arena> {
    locale: string;
}

export enum Arena {
    SPACE = "Space",
    GROUND = "Ground",
}
