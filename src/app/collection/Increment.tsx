"use client";

import { db } from "@/app/db";
import { Button, FormGroup, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = {
    id: number | string;
};

const Increment: React.FC<Props> = ({ id }) => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            const entry = await db.owned.get({ id: String(id) });
            setCount(entry?.count ?? 0);
        })();
    }, []);

    return (
        <FormGroup row>
            <Button
                variant="outlined"
                color="error"
                sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                onClick={async () => {
                    const next = count ? count - 1 : 0;
                    setCount(next);
                    await db.owned.put({ id: String(id), count: next });
                }}
            >
                -
            </Button>
            <TextField
                type="number"
                variant="outlined"
                placeholder="..."
                value={count}
                sx={{ zIndex: 0 }}
                InputProps={{ sx: { borderRadius: 0 } }}
                inputProps={{ sx: { textAlign: "center" } }}
            />
            <Button
                variant="outlined"
                color="success"
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                onClick={async () => {
                    const next = count ? count + 1 : 1;
                    setCount(next);
                    await db.owned.put({ id: String(id), count: next });
                }}
            >
                +
            </Button>
        </FormGroup>
    );
};
export default Increment;
