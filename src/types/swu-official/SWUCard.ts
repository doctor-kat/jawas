import { VariantTypesAttributesWrapper } from "@/types/swu-official/attributes/VariantTypes";
import { CardArtData } from "./Art";
import { ArenaAttributesWrapper } from "./attributes/Arena";
import { AspectAttributesWrapper } from "./attributes/Aspect";
import { ExpansionAttributesWrapper } from "./attributes/Expansion";
import { KeywordAttributesWrapper } from "./attributes/Keywords";
import { RarityAttributesWrapper } from "./attributes/Rarity";
import { TraitAttributesWrapper } from "./attributes/Trait";
import { TypeAttributesWrapper } from "./attributes/Type";
import { BasicCardAttributes, SWUBasicCard } from "./SWUBasicCard";

export interface SWUCard {
    id: number | string;
    attributes: CardAttributes;
}

export interface CardAttributes extends BasicCardAttributes {
    artFront: CardArtData;
    artBack: CardArtData;
    artThumbnail: CardArtData;
    localizations: {
        data: SWUBasicCard[];
    };
    variants: { data?: SWUCard[] };
    variantOf: { data?: SWUCard };
    aspects: {
        data: AspectAttributesWrapper[];
    };
    aspectDuplicates: { data: [] };
    type: {
        data: TypeAttributesWrapper;
    };
    type2: {
        data?: TypeAttributesWrapper;
    };
    traits: {
        data: TraitAttributesWrapper[];
    };
    arenas: {
        data: ArenaAttributesWrapper[];
    };
    keywords: { data: KeywordAttributesWrapper[] };
    rarity: {
        data: RarityAttributesWrapper;
    };
    expansion: {
        data: ExpansionAttributesWrapper;
    };
    variantTypes: { data: VariantTypesAttributesWrapper[] };
}
