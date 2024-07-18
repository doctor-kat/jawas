import Image from "next/image";
import React from "react";

enum Size {
    SM = 24,
    MD = 32,
    LG = 48,
}

type Props = {
    aspects: string | string[];
    size?: Size;
};

const AspectIcons: React.FC<Props> = ({ aspects, size = Size.MD }) => {
    if (!Array.isArray(aspects)) {
        aspects = [aspects];
    }

    return aspects.map((aspect) => (
        <Image
            key={aspect}
            src={`icon_${aspect.toLowerCase()}.png`}
            alt={aspect}
            width={size}
            height={size}
        />
    ));
};
export default AspectIcons;
