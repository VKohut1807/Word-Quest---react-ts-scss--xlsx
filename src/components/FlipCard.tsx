import React, {useState, useEffect} from "react";

import "@/assets/scss/components/flip-card.scss";

import type {FlipCardProps} from "@/types";

const FlipCard: React.FC<FlipCardProps> = ({
    resetOnSwiper = false,
    front,
    back,
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = () => {
        if (!resetOnSwiper) setIsFlipped((prev) => !prev);
    };

    useEffect(() => {
        if (resetOnSwiper) {
            setIsFlipped(false);
        }
    }, [resetOnSwiper]);

    return (
        <>
            <div
                className={`flip-card-box ${isFlipped ? "active" : ""}`}
                onClick={toggleFlip}
            >
                <div data-card-frame className="flip-card-inner">
                    <div className="card-front">{front}</div>
                    <div className="card-back">{back}</div>
                </div>
            </div>
        </>
    );
};

export default FlipCard;
