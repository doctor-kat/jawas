import { FilterGroup } from "@/app/shared/table/filter";
import { SWUCard } from "@/types/swu-official/SWUCard";
import { FilterAlt } from "@mui/icons-material";
import {
    Checkbox,
    Chip,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

type FiltersProps = {
    cards: SWUCard[];
    filterGroup: FilterGroup;
    setFilterGroup: Dispatch<SetStateAction<FilterGroup>>;
    className?: string;
};
const Filters: React.FC<FiltersProps> = ({ filterGroup, setFilterGroup }) => {
    return Object.entries(filterGroup).map(([label, filters]) => (
        <FormControl key={label} className="grow">
            <InputLabel>
                <FilterAlt /> {label}
            </InputLabel>
            <Select
                color="primary"
                variant="outlined"
                multiple
                value={filters.filter((f) => f.active).map((f) => f.name)}
                input={<OutlinedInput label="Tag" />}
                onChange={(event) => {
                    const {
                        target: { value },
                    } = event;
                    const next = {
                        ...filterGroup,
                        [label]: filterGroup[label].map((f) => ({
                            ...f,
                            active: (value as string[]).includes(f.name),
                        })),
                    };
                    setFilterGroup(next);
                }}
                renderValue={(selected) => (
                    <Stack flexDirection="row" gap={0.5}>
                        {selected.map((value) => (
                            <Chip key={value} color="primary" label={value} />
                        ))}
                    </Stack>
                )}
            >
                {filters.map(({ name, count, active }) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={active ?? false} />
                        <ListItemText primary={name} />
                        <Typography>{count}</Typography>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    ));
};
export default Filters;
