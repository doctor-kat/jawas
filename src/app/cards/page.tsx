"use client";

import VirtualizedCardTable from "@/app/cards/VirtualizedCardTable";
import { db, populate } from "@/app/shared/db";
import { SWUCard } from "@/types/swu-official/SWUCard";
import { Search } from "@mui/icons-material";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Stack,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Cards() {
    const [cards, setCards] = useState<SWUCard[]>([]);
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
        <Stack gap={2} sx={{ flexGrow: 1 }}>
            <Stack className="cards" gap={1} sx={{ flexGrow: 1 }}>
                <Stack sx={{ flexGrow: 1 }}>
                    <FormControl>
                        <TextField
                            value={searchRaw}
                            onChange={(e) => {
                                setSearchRaw(e.target.value);
                            }}
                            InputProps={{ startAdornment: <Search /> }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hideVariants}
                                    onClick={(e) =>
                                        setHideVariants(!hideVariants)
                                    }
                                />
                            }
                            label="Hide Variants"
                        />
                    </FormControl>
                    <VirtualizedCardTable
                        cards={cards}
                        hideVariants={hideVariants}
                        search={search}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
}
