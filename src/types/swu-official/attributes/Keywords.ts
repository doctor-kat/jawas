import { AttributesWrapper, BasicAttributes } from "./Attributes";

export type KeywordAttributesWrapper = AttributesWrapper<KeywordAttributes>;

interface KeywordAttributes extends BasicAttributes {
    locale: string;
}
