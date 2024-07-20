import QuantityCounter from "@/app/collection/QuantityCounter";
import VariantQuantitySelector from "@/app/collection/VariantQuantitySelector";
import Holographic from "@/app/shared/images/Holographic";
import HolographicCardImage from "@/app/shared/images/HolographicCardImage";
import { isNotVariant } from "@/app/shared/table/filter";
import { defaultSort } from "@/app/shared/table/sort";
import VirtualizedTable from "@/app/shared/table/VirtualizedTable";
import { Type } from "@/types/swu-official/attributes/Type";
import { SWUCard } from "@/types/swu-official/SWUCard";
import { CreditCard } from "@mui/icons-material";
import {
    Stack,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
    cards: SWUCard[];
    hideVariants?: boolean;
    search?: string;
    filter?: (card: SWUCard) => boolean;
    sort?: (a: SWUCard, b: SWUCard) => number;
};

export function matchName(search: string): (card: SWUCard) => boolean {
    return (card) =>
        !search ||
        card.attributes.title.toLowerCase().includes(search.toLowerCase());
}

const VirtualizedCardTable: React.FC<Props> = ({
    cards,
    hideVariants,
    search = "",
    filter = () => true,
    sort = defaultSort,
}) => {
    const theme = useTheme();

    return (
        <VirtualizedTable
            data={cards
                .filter(hideVariants ? isNotVariant : () => true)
                .filter(filter)
                .filter(matchName(search))
                .toSorted(sort)}
            fixedHeaderContent={() => (
                <TableRow sx={{ background: theme.palette.background.paper }}>
                    <TableCell>Card Number</TableCell>
                    <TableCell>Expansion</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Variant</TableCell>
                    <TableCell>Owned</TableCell>
                </TableRow>
            )}
            itemContent={(i, card) => (
                <React.Fragment>
                    <TableCell key={card.id}>
                        {card.attributes.type.data.attributes.name ===
                        Type.TOKEN
                            ? `T0${card.attributes.cardNumber}`
                            : `${card.attributes.cardNumber}/${card.attributes.cardCount}`}
                    </TableCell>
                    <TableCell>
                        {card.attributes.expansion.data.attributes.name}
                    </TableCell>
                    <TableCell>
                        <Link
                            href={{ pathname: "/card", query: { id: card.id } }}
                        >
                            <Tooltip
                                title={<HolographicCardImage card={card} />}
                                arrow
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            background: "transparent",
                                        },
                                    },
                                }}
                            >
                                <Typography>{card.attributes.title}</Typography>
                            </Tooltip>
                        </Link>
                    </TableCell>
                    <TableCell>
                        {card.attributes.variantTypes.data
                            .map((w) => w.attributes.name)
                            .map((variantType) => (
                                <Stack
                                    key={card.id + variantType}
                                    flexDirection="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    {["Hyperspace", "Showcase"].includes(
                                        variantType,
                                    ) && (
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
                                    )}
                                    {["Standard"].includes(variantType) &&
                                        card.attributes.hasFoil && (
                                            <Holographic
                                                blendMode="darken"
                                                enabled={
                                                    card.attributes.hasFoil
                                                }
                                            >
                                                <CreditCard
                                                    sx={{ fill: "white" }}
                                                />
                                            </Holographic>
                                        )}
                                    <Typography
                                        sx={{
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {variantType}
                                        {card.attributes.hasFoil && " Foil"}
                                    </Typography>
                                </Stack>
                            ))}
                    </TableCell>
                    <TableCell>
                        {hideVariants ? (
                            <VariantQuantitySelector card={card} />
                        ) : (
                            <QuantityCounter id={card.id} />
                        )}
                    </TableCell>
                </React.Fragment>
            )}
        />
    );
};
export default VirtualizedCardTable;
