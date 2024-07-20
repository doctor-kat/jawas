import { Archive, Layers, Style } from "@mui/icons-material";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

type NavProps = {
    open: boolean;
};
export const DRAWER_WIDTH_CLOSED = 84;
export const DRAWER_WIDTH_OPEN = 240;
const Sidebar: React.FC<NavProps> = ({ open }) => {
    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                width: open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
                flexShrink: 0,
            }}
            PaperProps={{
                elevation: 12,
                sx: {
                    width: open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
                    boxSizing: "border-box",
                    overflow: "hidden",
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: open ? "auto" : "hidden" }}>
                <List>
                    {[
                        {
                            href: "/cards",
                            icon: <Style sx={{ transform: "scaleY(-1)" }} />,
                            label: "Cards",
                        },
                        {
                            href: "/collection",
                            icon: <Archive />,
                            label: "Collection",
                        },
                        {
                            href: "/decks",
                            icon: <Layers />,
                            label: "Decks",
                        },
                    ].map(({ href, icon, label }) => (
                        <ListItem
                            key={label}
                            sx={{
                                justifyContent: open ? "flex-start" : "center",
                            }}
                        >
                            <Link href={href} style={{ flex: 1 }}>
                                <ListItemButton>
                                    {open ? (
                                        <>
                                            <ListItemIcon>
                                                {React.cloneElement(
                                                    icon,
                                                    icon.props,
                                                )}
                                            </ListItemIcon>
                                            <ListItemText primary={label} />
                                        </>
                                    ) : (
                                        <Stack alignItems="center">
                                            {React.cloneElement(icon, {
                                                ...icon.props,
                                                fontSize: "large",
                                            })}
                                            <Typography variant="body2">
                                                {label}
                                            </Typography>
                                        </Stack>
                                    )}
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
