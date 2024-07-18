"use client";

import Holographic from "@/app/shared/images/Holographic";
import { getParentId } from "@/app/shared/variants/getAttribute";
import { getVariants } from "@/app/shared/variants/getVariants";
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
    const parentId = getParentId({ card });
    const [variants, setVariants] = useState<SWUCard[]>([]);

    useEffect(() => {
        (async () => {
            setVariants(await getVariants({ card }));
        })();
    }, []);

    return (
        <Box component={Paper} elevation={12}>
            <List>
                <ListSubheader>Variants</ListSubheader>
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
