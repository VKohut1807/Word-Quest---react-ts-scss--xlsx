import React, {useState} from "react";

import "@/assets/scss/components/flip-card.scss";

import type {FlipCardProps} from "@/types";

const FlipCard: React.FC<FlipCardProps> = ({className = "", front, back}) => {
    const [flipCard, setFlipCard] = useState<boolean>(true);

    return (
        <section
            onClick={() => setFlipCard((prev) => !prev)}
            className={`flip-card-box ${flipCard ? "" : "active"} ${className}`}
        >
            <div className="card-front">{front}</div>
            <div className="card-back">{back}</div>
        </section>
    );
};

export default FlipCard;
