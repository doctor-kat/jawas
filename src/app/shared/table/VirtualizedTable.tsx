import {
    Box,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React from "react";
import {
    FixedHeaderContent,
    ItemContent,
    TableComponents,
    TableVirtuoso,
} from "react-virtuoso";

const VirtuosoTableComponents: TableComponents<any> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table
            {...props}
            sx={{ borderCollapse: "separate", tableLayout: "auto" }}
        />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};

export default function VirtualizedTable<T>({
    data,
    fixedHeaderContent,
    itemContent,
}: {
    data: T[];
    fixedHeaderContent: FixedHeaderContent;
    itemContent: ItemContent<T, unknown>;
}) {
    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <TableVirtuoso
                overscan={500}
                data={data}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={itemContent}
                useWindowScroll
            />
        </Box>
    );
}
