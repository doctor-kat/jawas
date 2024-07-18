"use client";

import { db } from "@/app/shared/db";
import Holographic from "@/app/shared/images/Holographic";
import { SWUCard } from "@/types/swu-official/SWUCard";
import { CreditCard } from "@mui/icons-material";
import {
    Box,
    List,
    ListItemButton,
    ListSubheader,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
    card: SWUCard;
};

const Variants: React.FC<Props> = ({ card }) => {
    const variantOfId = card.attributes.variantOf.data?.id;
    const [variantOf, setVariantOf] = useState<SWUCard | null | undefined>(
        null,
    );
    const [variants, setVariants] = useState<SWUCard[]>([]);

    useEffect(() => {
        (async () => {
            let parent: SWUCard | undefined;
            if (variantOfId) {
                parent = await db.cards.get(String(variantOfId));
                setVariantOf(parent);
            } else {
                setVariantOf(null);
            }

            const variants = [parent, card]
                .flatMap((card) => card?.attributes.variants?.data)
                .filter((v) => !!v);
            const foils = (
                await Promise.all(
                    variants.map(
                        async (variant) => await db.cards.get(`${variant.id}F`),
                    ),
                )
            ).filter((v) => !!v);
            setVariants([...variants, ...foils]);
        })();
    }, [variantOfId]);

    return (
        <Box component={Paper} elevation={12}>
            <List>
                <ListSubheader>Variants</ListSubheader>
                <Link
                    href={{
                        pathname: "/card",
                        query: { id: variantOfId ?? card.id },
                    }}
                >
                    <ListItemButton
                        selected={!variantOf && !card.attributes.hasFoil}
                    >
                        Regular
                    </ListItemButton>
                </Link>
                {variants.map((variant) => (
                    <Link
                        key={variant.id}
                        href={{ pathname: "/card", query: { id: variant.id } }}
                    >
                        <ListItemButton selected={card.id == variant.id}>
                            <Stack
                                key={`${card.id}_${variant.id}`}
                                flexDirection="row"
                                alignItems="center"
                                gap={0.5}
                            >
                                {variant.attributes.variantTypes.data
                                    .map(
                                        (variantType) =>
                                            variantType.attributes.name,
                                    )
                                    .filter((variantType) =>
                                        ["Hyperspace", "Showcase"].includes(
                                            variantType,
                                        ),
                                    )
                                    .map((variantType) => (
                                        <Holographic
                                            blendMode="darken"
                                            enabled={variant.attributes.hasFoil}
                                        >
                                            <Image
                                                alt={variantType}
                                                src={`/${variantType}.webp`}
                                                width={24}
                                                height={24}
                                            />
                                        </Holographic>
                                    ))}
                                {variant.attributes.hasFoil &&
                                    variant.attributes.variantTypes.data
                                        .map(
                                            (variantType) =>
                                                variantType.attributes.name,
                                        )
                                        .filter((variantType) =>
                                            ["Standard"].includes(variantType),
                                        )
                                        .map(() => (
                                            <Holographic
                                                blendMode="color"
                                                enabled={
                                                    variant.attributes.hasFoil
                                                }
                                            >
                                                <CreditCard />
                                            </Holographic>
                                        ))}
                                <Typography
                                    sx={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {variant.attributes.variantTypes.data
                                        .map(
                                            (variantType) =>
                                                variantType.attributes.name,
                                        )
                                        .join(" ")}
                                    {variant.attributes.hasFoil && " Foil"}
                                </Typography>
                            </Stack>
                        </ListItemButton>
                    </Link>
                ))}
            </List>
        </Box>
    );
};
export default Variants;
