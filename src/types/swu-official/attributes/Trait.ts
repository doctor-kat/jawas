import { AttributesWrapper, BasicAttributes } from "./Attributes";

export type TraitAttributesWrapper = AttributesWrapper<TraitAttributes>;

interface TraitAttributes extends BasicAttributes {
    locale: string;
}
