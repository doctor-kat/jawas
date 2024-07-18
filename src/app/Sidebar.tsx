import { Inventory2, Layers, Style } from "@mui/icons-material";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
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
                    <ListItem>
                        <Link href="/cards">
                            <ListItemButton>
                                {open ? (
                                    <>
                                        <ListItemIcon>
                                            <Style />
                                        </ListItemIcon>
                                        <ListItemText primary="Cards" />
                                    </>
                                ) : (
                                    <Style />
                                )}
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href="/collection">
                            <ListItemButton>
                                {open ? (
                                    <>
                                        <ListItemIcon>
                                            <Inventory2 />
                                        </ListItemIcon>
                                        <ListItemText primary="Collection" />
                                    </>
                                ) : (
                                    <Inventory2 />
                                )}
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href="/decks">
                            <ListItemButton>
                                {open ? (
                                    <>
                                        <ListItemIcon>
                                            <Layers />
                                        </ListItemIcon>
                                        <ListItemText primary="Decks" />
                                    </>
                                ) : (
                                    <Layers />
                                )}
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
