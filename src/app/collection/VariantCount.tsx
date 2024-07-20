"use client";

import { db } from "@/app/shared/db";
import Holographic from "@/app/shared/images/Holographic";
import { CreditCard } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
    id: number | string;
    variantType: string;
    hasFoil?: boolean;
};

const VariantCount: React.FC<Props> = ({ id, variantType, hasFoil }) => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            const entry = await db.owned.get({ id: String(id) });
            setCount(entry?.count ?? 0);
        })();
    }, []);

    let icon;
    switch (variantType) {
        case "Hyperspace":
        case "Showcase":
            icon = (
                <Holographic blendMode="darken" enabled={hasFoil}>
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
                <Holographic blendMode="darken" enabled={hasFoil}>
                    <CreditCard sx={{ fill: "white" }} />
                </Holographic>
            );
            break;
    }

    return (
        <ButtonGroup>
            <Button disabled>{icon ?? variantType}</Button>
            {[1, 2, 3].map((value) => (
                <Button
                    key={`${id}_${count}`}
                    variant={value === count ? "contained" : "outlined"}
                    onClick={async () => {
                        if (value !== count) {
                            setCount(value);
                            await db.owned.put({
                                id: String(id),
                                count: value,
                            });
                        }
                    }}
                >
                    {value}
                </Button>
            ))}
        </ButtonGroup>
    );
};
export default VariantCount;
