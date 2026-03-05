import React, {useState, useEffect} from "react";

import "@/assets/scss/components/flip-card.scss";

import type {FlipCardProps} from "@/types";

const FlipCard: React.FC<FlipCardProps> = ({
    removeToggleFlip = false,
    front,
    back,
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = () => {
        if (!removeToggleFlip) setIsFlipped((prev) => !prev);
    };

    useEffect(() => {
        if (removeToggleFlip) {
            setIsFlipped(false);
        }
    }, [removeToggleFlip]);

    return (
        <>
            <div className={`flip-card-box ${isFlipped ? "active" : ""}`}>
                <div data-card-frame className="flip-card-inner">
                    <div className="card-front" onClick={toggleFlip}>
                        {front}
                    </div>
                    <div className="card-back" onClick={toggleFlip}>
                        {back}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FlipCard;
