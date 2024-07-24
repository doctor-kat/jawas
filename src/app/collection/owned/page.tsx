"use client";

import { db, populate } from "@/app/shared/db";
import VirtualizedCardTable from "@/app/shared/table/VirtualizedCardTable";
import { Type } from "@/types/swu-official/attributes/Type";
import { SWUCard } from "@/types/swu-official/SWUCard";
import { Search } from "@mui/icons-material";
import {
    FormControlLabel,
    FormGroup,
    Stack,
    Switch,
    TextField,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

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

export default function Owned() {
    const theme = useTheme();

    const [cards, setCards] = useState<SWUCard[]>([]);
    const [loaded, setLoaded] = useState<Record<string, boolean>>({});
    const [searchRaw, setSearchRaw] = useState("");
    const [search] = useDebounce(searchRaw, 1000);
    const [hideVariants, setHideVariants] = useState(true);

    useEffect(() => {
        (async () => {
            await populate();
            setCards(await db.cards.orderBy("id").toArray());
        })();
    }, []);

    return (
        <Stack className="cards" gap={1}>
            <FormGroup row>
                <TextField
                    value={searchRaw}
                    onChange={(e) => {
                        setSearchRaw(e.target.value);
                    }}
                    InputProps={{ startAdornment: <Search /> }}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={hideVariants}
                            onClick={(e) => setHideVariants(!hideVariants)}
                        />
                    }
                    label="Hide Variants"
                />
            </FormGroup>
            <VirtualizedCardTable
                cards={cards}
                hideVariants={hideVariants}
                search={search}
            />
        </Stack>
    );
}
