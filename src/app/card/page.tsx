"use client";

import AspectIcons from "@/app/card/AspectIcons";
import { replaceKeywords } from "@/app/card/textStyledProcessor";
import Variants from "@/app/card/Variants";
import { db } from "@/app/shared/db";
import Holographic from "@/app/shared/images/Holographic";
import { CardArtData } from "@/types/swu-official/Art";
import { BasicAttributes } from "@/types/swu-official/attributes/Attributes";
import { CardAttributes, SWUCard } from "@/types/swu-official/SWUCard";
import { Hexagon, Shield } from "@mui/icons-material";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import { Interweave } from "interweave";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { ReactElement, useEffect, useState } from "react";

function getAttributeValue({ card, key }: { card: SWUCard; key: string }) {
    const value = card.attributes[key as keyof CardAttributes];
    switch (typeof value) {
        case "object":
            const data = value?.data;
            if (Array.isArray(data)) {
                if (data.length === 1) {
                    return (data?.[0].attributes as BasicAttributes)?.name;
                }
                return data
                    ?.map((d) => (d.attributes as BasicAttributes).name)
                    .join(", ");
            }
            return (data?.attributes as BasicAttributes)?.name;

        default:
            return String(value);
    }
}

const IconWithText: React.FC<{ icon: ReactElement; text: number | string }> = ({
    icon,
    text,
}) => (
    <Stack alignItems="center" sx={{ position: "relative" }}>
        <Stack
            justifyContent="center"
            alignItems="center"
            height={48}
            width={48}
            sx={{
                position: "absolute",
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    zIndex: 1,
                    fontWeight: 900,
                    textShadow:
                        "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                }}
            >
                {text}
            </Typography>
        </Stack>
        {React.cloneElement(icon, {
            ...icon.props,
            sx: {
                ...icon.props.sx,
                fontSize: 48,
            },
        })}
    </Stack>
);

const CardPage: React.FC = () => {
    const params = useSearchParams();
    const id = params.get("id");
    if (!id) {
        return "Card ID not specified";
    }

    const [card, setCard] = useState<SWUCard | null | undefined>(null);
    useEffect(() => {
        (async () => {
            const card = await db.cards.get(id);
            setCard(card);
        })();
    }, [id]);
    if (card === null) {
        return "Loading...";
    }
    if (card === undefined) {
        return `Card ${id} not found`;
    }

    console.log("card", card);

    return (
        <Stack>
            <Grid container spacing={1}>
                <Grid item sm={4}>
                    <Stack alignItems="center" spacing={2}>
                        {(
                            ["artFront", "artBack"] as (keyof CardAttributes)[]
                        ).map((view) => {
                            const { data } = card.attributes[
                                view
                            ] as CardArtData;
                            return (
                                data && (
                                    <Holographic
                                        blendMode="color-dodge"
                                        enabled={
                                            card.attributes.hasFoil ?? false
                                        }
                                    >
                                        <Image
                                            {...data.attributes.formats.card}
                                            alt={card.attributes.title}
                                            src={
                                                data.attributes.formats.card.url
                                            }
                                        />
                                    </Holographic>
                                )
                            );
                        })}
                    </Stack>
                </Grid>
                <Grid item sm={4}>
                    <Card elevation={12} sx={{ borderRadius: "1em" }}>
                        <CardHeader
                            title={
                                <Stack
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    gap={1}
                                >
                                    <IconWithText
                                        icon={
                                            <Hexagon
                                                sx={{
                                                    transform: "rotate(90deg)",
                                                    fill: "#bf9733",
                                                }}
                                            />
                                        }
                                        text={card.attributes.cost}
                                    />
                                    <Stack
                                        flexDirection="row"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        {card.attributes.unique && (
                                            <Image
                                                alt="unique"
                                                src="/unique.webp"
                                                width={24}
                                                height={24}
                                            />
                                        )}
                                        <Typography
                                            variant="h5"
                                            sx={{ fontWeight: 700 }}
                                        >
                                            {card.attributes.title}
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        flexDirection="column-reverse"
                                        gap={0.5}
                                    >
                                        <AspectIcons
                                            aspects={card.attributes.aspects.data.map(
                                                (aspect) =>
                                                    aspect.attributes.name,
                                            )}
                                        />
                                    </Stack>
                                </Stack>
                            }
                            subheader={
                                <Typography
                                    variant="body1"
                                    sx={{ fontStyle: "italic" }}
                                >
                                    {card.attributes.subtitle}
                                </Typography>
                            }
                        />
                        <CardMedia
                            component="img"
                            image={
                                card.attributes.artThumbnail.data.attributes.url
                            }
                            alt={card.attributes.title}
                        />
                        <Stack
                            flexDirection="row"
                            justifyContent="space-around"
                            gap={1}
                        >
                            <Stack
                                flexDirection="row"
                                justifyContent="space-around"
                                gap={1}
                            >
                                <Typography>
                                    {card.attributes.type.data.attributes.name}
                                </Typography>
                                <Typography>
                                    {
                                        card.attributes.type2.data?.attributes
                                            .name
                                    }
                                </Typography>
                            </Stack>
                            <Typography>
                                {card.attributes.arenas.data
                                    .map((wrapper) => wrapper.attributes.name)
                                    .join(", ")}
                            </Typography>
                        </Stack>
                        <CardContent>
                            <Stack gap={1}>
                                <Stack
                                    flexDirection="row"
                                    gap={1}
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <IconWithText
                                        icon={
                                            <Hexagon
                                                sx={{
                                                    transform: "rotate(90deg)",
                                                    fill: "#ac2e29",
                                                }}
                                            />
                                        }
                                        text={card.attributes.power}
                                    />
                                    <Typography
                                        sx={{
                                            fontStyle: "italic",
                                            fontVariant: "small-caps",
                                            textAlign: "center",
                                        }}
                                    >
                                        {card.attributes.traits.data
                                            .map(
                                                (wrapper) =>
                                                    wrapper.attributes.name,
                                            )
                                            .join(" · ")}
                                    </Typography>
                                    <IconWithText
                                        icon={
                                            <Shield sx={{ fill: "#489eb4" }} />
                                        }
                                        text={card.attributes.hp}
                                    />
                                </Stack>
                                <Typography
                                    component={Box} // <p> (Typography) cannot be a descendant of <p> (textStyled)
                                    sx={{
                                        "*:not(p)": {
                                            display: "inline",
                                        },
                                        ".keyword": {
                                            fontVariant: "small-caps",
                                            color: "#a32d25",
                                        },
                                        ".sentinel": {
                                            border: "1px solid #b58279",
                                            background: "#e1b4a3",
                                            borderRadius: 1,
                                            px: 0.5,
                                        },
                                    }}
                                >
                                    <Interweave
                                        content={replaceKeywords(
                                            card.attributes.textStyled,
                                        )}
                                    />
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={4}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {[
                                    "artist",
                                    "expansion",
                                    "rarity",
                                    "cardNumber",
                                    "keywords",
                                ].map((key) => (
                                    <TableRow key={key}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{ textTransform: "capitalize" }}
                                        >
                                            {key}
                                        </TableCell>
                                        <TableCell>
                                            {getAttributeValue({
                                                card,
                                                key,
                                            })}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item sm={4}>
                    <Variants card={card} />
                </Grid>
            </Grid>
        </Stack>
    );
};
export default CardPage;
