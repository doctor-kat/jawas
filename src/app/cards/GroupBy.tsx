import { FILTER_KEYS } from "@/app/shared/table/filter";
import { CardAttributes } from "@/types/swu-official/SWUCard";
import { PivotTableChart } from "@mui/icons-material";
import {
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
    grouping: keyof CardAttributes;
    setGrouping: Dispatch<SetStateAction<keyof CardAttributes>>;
};
const GroupBy: React.FC<Props> = ({ grouping, setGrouping }) => {
    return (
        <Grid container className="filters" gap={1}>
            <Grid item xs>
                <FormControl fullWidth>
                    <InputLabel>
                        <PivotTableChart /> Group by
                    </InputLabel>
                    <Select
                        color="secondary"
                        variant="outlined"
                        value={grouping}
                        input={<OutlinedInput label="Tag" />}
                        onChange={(event) => {
                            const {
                                target: { value },
                            } = event;
                            setGrouping(value as keyof CardAttributes);
                        }}
                    >
                        {Object.entries(FILTER_KEYS).map(([label, key]) => (
                            <MenuItem key={key} value={key}>
                                <ListItemText primary={label} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};
export default GroupBy;
