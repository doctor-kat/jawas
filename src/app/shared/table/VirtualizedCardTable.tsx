import QuantityCounter from "@/app/collection/QuantityCounter";
import VariantQuantitySelector from "@/app/collection/VariantQuantitySelector";
import Holographic from "@/app/shared/images/Holographic";
import HolographicCardImage from "@/app/shared/images/HolographicCardImage";
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

function isNotVariant(card: SWUCard) {
    return !card.attributes.variantOf.data && !card.attributes.hasFoil;
}

function sortBy(a: SWUCard, b: SWUCard): number {
    const expansion = [a, b].map(
        (card) => card.attributes.expansion.data.attributes.name,
    );
    const cardNumber = [a, b].map((card) => card.attributes.cardNumber);
    const type = [a, b].map(
        (card) => card.attributes.type.data.attributes.name,
    );
    const variantTypes = [a, b].map(
        (card) => card.attributes.variantTypes?.data?.[0]?.attributes.name,
    );
    if (expansion[0] === expansion[1]) {
        if (!isNotVariant(a) && !isNotVariant(b)) {
            if (variantTypes[0] === variantTypes[1]) {
                return cardNumber[0] > cardNumber[1] ? 1 : -1;
            } else {
                return variantTypes[0] > variantTypes[1] ? 1 : -1;
            }
        } else if (!isNotVariant(a) && isNotVariant(b)) {
            return 1;
        } else if (isNotVariant(a) && !isNotVariant(b)) {
            return -1;
        } else {
            if (type[0] === Type.TOKEN && type[1] !== Type.TOKEN) {
                return 1;
            } else if (type[0] !== Type.TOKEN && type[1] === Type.TOKEN) {
                return -1;
            }
            return cardNumber[0] > cardNumber[1] ? 1 : -1;
        }
    } else {
        return expansion[0] > expansion[1] ? 1 : -1;
    }
}

type Props = {
    cards: SWUCard[];
    hideVariants?: boolean;
    search?: string;
};

const VirtualizedCardTable: React.FC<Props> = ({
    cards,
    hideVariants,
    search,
}) => {
    const theme = useTheme();

    return (
        <VirtualizedTable
            data={cards
                .filter((card) => (hideVariants ? isNotVariant(card) : true))
                .filter(
                    (card) =>
                        !search ||
                        card.attributes.title
                            .toLowerCase()
                            .includes(search.toLowerCase()),
                )
                .toSorted(sortBy)}
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
                <React.Fragment key={card.id}>
                    <TableCell>
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
