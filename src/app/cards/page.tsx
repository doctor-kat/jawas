"use client";

import Filters from "@/app/cards/Filters";
import Sorting, { createSortFunction } from "@/app/cards/Sorting";
import { db, populate } from "@/app/shared/db";
import {
    applyFilterGroup,
    FilterGroup,
    generateFilters,
} from "@/app/shared/table/filter";
import VirtualizedCardTable from "@/app/shared/table/VirtualizedCardTable";
import { CardAttributes, SWUCard } from "@/types/swu-official/SWUCard";
import { Search } from "@mui/icons-material";
import {
    FormControlLabel,
    FormGroup,
    Stack,
    Switch,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Cards() {
    const [cards, setCards] = useState<SWUCard[]>([]);
    const [searchRaw, setSearchRaw] = useState("");
    const [search] = useDebounce(searchRaw, 1000);
    const [hideVariants, setHideVariants] = useState(true);

    const [filterGroup, setFilterGroup] = useState<FilterGroup>({});
    const [grouping, setGrouping] = useState<keyof CardAttributes>("type");
    const [sorting, setSorting] = useState<keyof CardAttributes>("cardId");

    useEffect(() => {
        setFilterGroup(generateFilters(cards));
    }, [cards, setFilterGroup]);

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
                    className="grow"
                    value={searchRaw}
                    onChange={(e) => {
                        setSearchRaw(e.target.value);
                    }}
                    InputProps={{ startAdornment: <Search /> }}
                />
                <FormControlLabel
                    className="pl-2"
                    control={
                        <Switch
                            checked={hideVariants}
                            onClick={(e) => setHideVariants(!hideVariants)}
                        />
                    }
                    label="Hide Variants"
                />
            </FormGroup>
            <Stack
                className="w-full"
                flexDirection="row"
                justifyContent="space-between"
                gap={1}
            >
                <Filters {...{ cards, filterGroup, setFilterGroup }} />
                <Sorting {...{ cards, sorting, setSorting }} />
            </Stack>
            <VirtualizedCardTable
                cards={applyFilterGroup({
                    filterGroup,
                    cards,
                })}
                sort={createSortFunction(sorting)}
                hideVariants={hideVariants}
                search={search}
            />
        </Stack>
    );
}
