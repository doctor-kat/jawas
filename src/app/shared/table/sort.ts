import { isNotVariant } from "@/app/shared/table/filter";
import { Type } from "@/types/swu-official/attributes/Type";
import { SWUCard } from "@/types/swu-official/SWUCard";

export function defaultSort(a: SWUCard, b: SWUCard): number {
    const expansion = [a, b].map(
        (card) => card.attributes.expansion.data.attributes.name,
    );
    const cardNumber = [a, b].map((card) => card.attributes.cardNumber);
    const type = [a, b].map(
        (card) => card.attributes.type.data.attributes.name,
    );
    const variantTypes = [a, b].map(
        (card) => card.attributes.variantTypes?.data?.[0]?.attributes.name,
    );
    if (expansion[0] === expansion[1]) {
        if (!isNotVariant(a) && !isNotVariant(b)) {
            if (variantTypes[0] === variantTypes[1]) {
                return cardNumber[0] > cardNumber[1] ? 1 : -1;
            } else {
                return variantTypes[0] > variantTypes[1] ? 1 : -1;
            }
        } else if (!isNotVariant(a) && isNotVariant(b)) {
            return 1;
        } else if (isNotVariant(a) && !isNotVariant(b)) {
            return -1;
        } else {
            if (type[0] === Type.TOKEN && type[1] !== Type.TOKEN) {
                return 1;
            } else if (type[0] !== Type.TOKEN && type[1] === Type.TOKEN) {
                return -1;
            }
            return cardNumber[0] > cardNumber[1] ? 1 : -1;
        }
    } else {
        return expansion[0] > expansion[1] ? 1 : -1;
    }
}
