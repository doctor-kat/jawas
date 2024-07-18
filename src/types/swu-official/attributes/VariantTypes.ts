import { AttributesWrapper, BasicAttributes } from "./Attributes";

export type VariantTypesAttributesWrapper =
    AttributesWrapper<VariantTypesAttributes>;

interface VariantTypesAttributes extends BasicAttributes {
    locale: string;
}
