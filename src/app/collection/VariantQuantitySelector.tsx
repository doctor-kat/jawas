"use client";

import QuantitySelector from "@/app/collection/QuantitySelector";
import { getVariantType } from "@/app/shared/variants/getAttribute";
import { getVariants } from "@/app/shared/variants/getVariants";
import { SWUCard } from "@/types/swu-official/SWUCard";
import React, { useEffect, useState } from "react";

type Props = {
    card: SWUCard;
};

const VariantQuantitySelector: React.FC<Props> = ({ card }) => {
    const [variants, setVariants] = useState<SWUCard[]>([]);

    useEffect(() => {
        (async () => {
            setVariants(await getVariants({ card }));
        })();
    }, []);

    return variants.map((variant) => (
        <QuantitySelector
            key={variant.id}
            id={variant.id}
            variantType={getVariantType({ card: variant })}
            hasFoil={variant.attributes.hasFoil}
        />
    ));
};
export default VariantQuantitySelector;
