"use client";

import QuantityCounter from "@/app/collection/QuantityCounter";
import { getVariants } from "@/app/shared/variants/getVariants";
import { SWUCard } from "@/types/swu-official/SWUCard";
import { Box, Stack } from "@mui/material";
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
    }, [card]);

    return (
        <Stack flexDirection="row" gap={1} className="w-auto">
            {!variants.length && <Box sx={{ height: 92.5 }}>Loading</Box>}
            {variants.map((variant) => (
                <QuantityCounter key={variant.id} card={variant} />
            ))}
        </Stack>
    );
};
export default VariantQuantitySelector;
