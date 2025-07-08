import React, {useState, useEffect} from "react";

import "@/assets/scss/components/flip-card.scss";

import type {FlipCardProps} from "@/types";

const FlipCard: React.FC<FlipCardProps> = ({
    className = "",
    front,
    back,
    isActive,
}) => {
    const [flipCard, setFlipCard] = useState<boolean>(false);

    useEffect(() => {
        if (!isActive) {
            setFlipCard(false);
        }
    }, [isActive]);

    return (
        <section
            onClick={() => {
                if (isActive) {
                    setFlipCard((prev) => !prev);
                }
            }}
            className={`flip-card-box ${flipCard ? "active" : ""} ${className}`}
        >
            <div className="card-front">{front}</div>
            <div className="card-back">{back}</div>
        </section>
    );
};

export default FlipCard;
