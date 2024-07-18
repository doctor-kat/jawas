"use client";

import { createTheme } from "@mui/material/styles";
import localFont from "next/font/local";

const hmbSerenitySans = localFont({
    src: "./hbm_serenity_sans.woff",
});
const toyler = localFont({ src: "./toyler.woff" });
const barlow = localFont({
    src: [
        { path: "./barlow.woff2", weight: "400", style: "normal" },
        { path: "./barlow-bold.woff2", weight: "700", style: "bold" },
        { path: "./barlow-italic.woff2", weight: "400", style: "italic" },
        { path: "./barlow-bold-italic.woff2", weight: " 700", style: "italic" },
    ],
});

const theme = createTheme({
    typography: {
        fontFamily: barlow.style.fontFamily,
        subtitle1: {
            fontFamily: hmbSerenitySans.style.fontFamily,
            fontSize: "2em",
            letterSpacing: ".1em",
        },
        subtitle2: {
            fontFamily: toyler.style.fontFamily,
            fontWeight: 700,
            fontSize: "1.5em",
        },
    },
    palette: {
        mode: "light",
        primary: {
            main: "#f4b836",
        },
        secondary: {
            main: "#e1cca1",
        },
        background: {
            default: "#2e2e2e",
            paper: "#2e2e2e",
        },
        text: {
            primary: "#d6d6d6",
            secondary: "#e5b567",
            disabled: "#797979",
        },
        error: {
            main: "#b05279",
        },
        success: {
            main: "#b4d273",
        },
        warning: {
            main: "#e87d3e",
        },
        info: {
            main: "#6c99bb",
        },
    },
    components: {
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    position: "sticky",
                    top: 63,
                    background: "#2e2e2e",
                },
            },
        },
    },
});

export default theme;
