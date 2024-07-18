import Holographic from "@/app/images/Holographic";
import { SWUCard } from "@/types/swu-official/SWUCard";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
    card: SWUCard;
};

const HolographicCardImage: React.FC<Props> = ({ card }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Holographic enabled={loaded && card.attributes.hasFoil}>
            <Image
                {...card.attributes.artFront.data.attributes.formats.card}
                alt={card.attributes.title}
                src={card.attributes.artFront.data.attributes.formats.card.url}
                onLoad={() => setLoaded(true)}
            />
        </Holographic>
    );
};
export default HolographicCardImage;
