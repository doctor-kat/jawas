"use client";

import { Box, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

const CollectionLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const [, path] = usePathname()
        .split("/")
        .filter((p) => !!p);
    const routes = ["owned", "trade", "want"];

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={routes.indexOf(path)} role="navigation">
                    {routes.map((route) => (
                        <Tab
                            key={route}
                            component={Link}
                            label={route}
                            href={`/collections/${route}`}
                        />
                    ))}
                </Tabs>
            </Box>
            {children}
        </>
    );
};
export default CollectionLayout;
