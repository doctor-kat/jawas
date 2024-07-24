import { CardAttributes, SWUCard } from "@/types/swu-official/SWUCard";
import { PivotTableChart } from "@mui/icons-material";
import {
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

function getAttribute({
    card,
    key,
}: {
    card: SWUCard;
    key: keyof CardAttributes;
}) {
    const data = (card.attributes[key] as any)?.data;
    if (!data) {
        return card.attributes[key] ?? "None";
    } else if (Array.isArray(data)) {
        return data.flatMap((d: any) => d.attributes.name);
    } else {
        return data.attributes.name;
    }
}

export function createSortFunction(
    key: keyof CardAttributes,
): (a: SWUCard, b: SWUCard) => number {
    if (!key) {
        return (a, b) => 0;
    }

    return (a: SWUCard, b: SWUCard) =>
        getAttribute({ card: a, key }) > getAttribute({ card: b, key })
            ? 1
            : -1;
}

export const SORT_KEYS: Record<string, keyof CardAttributes> = {
    Type: "type",
    Aspect: "aspects",
    Rarity: "rarity",
    Keywords: "keywords",
    Traits: "traits",
    Cost: "cost",
    "Card ID": "cardId",
};

type Props = {
    sorting: keyof CardAttributes;
    setSorting: Dispatch<SetStateAction<keyof CardAttributes>>;
};
const SortBy: React.FC<Props> = ({ sorting, setSorting }) => {
    return (
        <FormControl className="grow">
            <InputLabel>
                <PivotTableChart /> Sort by
            </InputLabel>
            <Select
                color="secondary"
                variant="outlined"
                value={sorting}
                input={<OutlinedInput label="Tag" />}
                onChange={(event) => {
                    const {
                        target: { value },
                    } = event;
                    setSorting(value as keyof CardAttributes);
                }}
            >
                {Object.entries(SORT_KEYS).map(([label, key]) => (
                    <MenuItem key={key} value={key}>
                        <ListItemText primary={label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
export default SortBy;
