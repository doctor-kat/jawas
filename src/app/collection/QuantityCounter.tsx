"use client";

import { db } from "@/app/shared/db";
import Holographic from "@/app/shared/images/Holographic";
import { getVariantType } from "@/app/shared/variants/getAttribute";
import { SWUCard } from "@/types/swu-official/SWUCard";
import { CreditCard } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Stack, TextField } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
    card: SWUCard;
};

const QuantityCounter: React.FC<Props> = ({ card }) => {
    const [count, setCount] = useState<number | null>(null);
    async function updateCount(value: number) {
        console.log(`Updating ${card.attributes.title} to ${value}`);
        setCount(value);
        await db.owned.put({
            id: String(card.id),
            count: value,
        });
    }

    useEffect(() => {
        (async () => {
            const entry = await db.owned.get({ id: String(card.id) });
            setCount(entry?.count ?? 0);
        })();
    }, []);

    const variantType = getVariantType({ card });
    let icon;
    switch (variantType) {
        case "Hyperspace":
        case "Showcase":
            icon = (
                <Holographic
                    blendMode="darken"
                    enabled={card.attributes.hasFoil}
                >
                    <Image
                        alt={variantType}
                        src={`/${variantType}.webp`}
                        width={24}
                        height={24}
                    />
                </Holographic>
            );
            break;

        case "Standard":
        default:
            icon = (
                <Holographic
                    blendMode="darken"
                    enabled={card.attributes.hasFoil}
                >
                    <CreditCard sx={{ fill: "white" }} />
                </Holographic>
            );
            break;
    }

    return (
        <Box className="basis-0">
            <Stack>
                <TextField
                    type="number"
                    variant="outlined"
                    placeholder="..."
                    value={count}
                    className="w-full z-0 flex-1"
                    InputProps={{
                        className: "!rounded-b-none",
                        startAdornment: icon,
                    }}
                    inputProps={{
                        sx: {
                            textAlign: "center",
                            m: 0,
                            WebkitAppearance: "none",
                            MozAppearance: "textfield",
                        },
                    }}
                />
                <ButtonGroup className="w-full">
                    <Button
                        variant="outlined"
                        color="error"
                        className="flex-1 !rounded-t-none rounded-br-none"
                        onClick={async () => {
                            const next = count ? count - 1 : 0;
                            await updateCount(next);
                        }}
                    >
                        -
                    </Button>
                    <Button
                        variant="outlined"
                        color="success"
                        className="flex-1 !rounded-t-none rounded-bl-none"
                        onClick={async () => {
                            const next = count ? count + 1 : 1;
                            await updateCount(next);
                        }}
                    >
                        +
                    </Button>
                </ButtonGroup>
            </Stack>
        </Box>
    );
};
export default QuantityCounter;
