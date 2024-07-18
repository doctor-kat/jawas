import { Box } from "@mui/material";
import { Property } from "csstype";
import React, { PropsWithChildren } from "react";

type Props = {
    blendMode?: Property.MixBlendMode | undefined;
    enabled?: boolean;
};

const Holographic: React.FC<PropsWithChildren<Props>> = ({
    blendMode: mixBlendMode = "color",
    enabled = true,
    children,
}) => (
    <Box sx={{ position: "relative" }}>
        {children}
        <Box
            sx={{
                position: "absolute",
                inset: 0,
                borderRadius: 2,
                opacity: enabled ? 0.75 : 0,
                transition: "0.25s linear",
                background:
                    "linear-gradient(45deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)",
                mixBlendMode,
                backgroundSize: "200% 200%",
                animation: "rainbow 4s ease infinite alternate",
            }}
        />
    </Box>
);
export default Holographic;
