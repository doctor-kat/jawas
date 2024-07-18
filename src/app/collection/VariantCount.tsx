"use client";

import { db } from "@/app/db";
import Holographic from "@/app/images/Holographic";
import { CreditCard } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
    id: number | string;
    variantType: string;
};

const VariantCount: React.FC<Props> = ({ id, variantType }) => {
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
                <Holographic blendMode="darken" enabled={true}>
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
            icon = (
                <Holographic blendMode="color" enabled={true}>
                    <CreditCard />
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
                    disabled={value === count}
                    onClick={async () => {
                        setCount(value);
                        await db.owned.put({ id: String(id), count: value });
                    }}
                >
                    {value}
                </Button>
            ))}
        </ButtonGroup>
    );
};
export default VariantCount;
