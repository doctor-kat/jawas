"use client";

import VariantCount from "@/app/collection/VariantCount";
import { getVariantType } from "@/app/shared/variants/getAttribute";
import { getVariants } from "@/app/shared/variants/getVariants";
import { SWUCard } from "@/types/swu-official/SWUCard";
import React, { useEffect, useState } from "react";

type Props = {
    card: SWUCard;
};

const VariantCollection: React.FC<Props> = ({ card }) => {
    const [variants, setVariants] = useState<SWUCard[]>([]);

    useEffect(() => {
        (async () => {
            setVariants(await getVariants({ card }));
        })();
    }, []);

    return variants.map((variant) => (
        <VariantCount
            id={variant.id}
            variantType={getVariantType({ card: variant })}
            hasFoil={variant.attributes.hasFoil}
        />
    ));
};
export default VariantCollection;
