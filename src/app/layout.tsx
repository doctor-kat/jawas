"use client";

import { Jawa } from "@/app/shared/icons";
import theme from "@/app/shared/theme";
import Sidebar from "@/app/Sidebar";
import { MenuOpen } from "@mui/icons-material";
import {
    AppBar,
    Box,
    IconButton,
    Paper,
    Stack,
    ThemeProvider,
    Toolbar,
    Typography,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import React, { useState } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <Box sx={{ display: "flex" }}>
                            <AppBar
                                position="fixed"
                                sx={{
                                    zIndex: (theme) => theme.zIndex.drawer + 1,
                                }}
                            >
                                <Toolbar>
                                    <IconButton
                                        color="inherit"
                                        edge="end"
                                        onClick={() =>
                                            setSidebarOpen(!sidebarOpen)
                                        }
                                        sx={{ mr: 2 }}
                                    >
                                        <MenuOpen
                                            sx={{
                                                transform: sidebarOpen
                                                    ? null
                                                    : "scaleX(-1)",
                                            }}
                                        />
                                    </IconButton>
                                    <Stack
                                        flexDirection="row"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <Jawa />
                                        <Typography
                                            variant="subtitle1"
                                            flexGrow={1}
                                        >
                                            Jawas
                                        </Typography>
                                    </Stack>
                                </Toolbar>
                            </AppBar>
                            <Sidebar open={sidebarOpen} />
                            <Stack
                                component={Paper}
                                sx={{
                                    flexGrow: 1,
                                    p: 3,
                                    ...(sidebarOpen && {
                                        transition: theme.transitions.create(
                                            "margin",
                                            {
                                                easing: theme.transitions.easing
                                                    .easeOut,
                                                duration:
                                                    theme.transitions.duration
                                                        .enteringScreen,
                                            },
                                        ),
                                    }),
                                }}
                            >
                                <Toolbar />
                                {children}
                            </Stack>
                        </Box>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
