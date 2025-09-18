import React from "react";

import "@/assets/scss/pages/dictionary-page/short-word-card-front.scss";

import type {WordCard} from "@/types";

const ShortWordCardFront: React.FC<WordCard> = ({row}) => {
    return (
        <>
            <div className="short-word-card-front">
                <div className="left-box">
                    <div className="idx">{row.id}</div>
                    <div className="transcription-box">
                        <span className="bracket">[</span>

                        <div className="transcription">
                            {row["transcription"]
                                .split(" ")
                                .map((word, index) => (
                                    <span key={index}>{word} </span>
                                ))}
                        </div>
                        <span className="bracket">]</span>
                    </div>
                    <u>{row.partOfSpeech}</u>
                    <h3>{row.englishWord}</h3>
                    <h4>{row.ukrainianWord}</h4>
                </div>
                <div className="right-box">
                    <div className="image-box">
                        <img
                            className="swiper-lazy image"
                            src={row.imageUrl}
                            alt={row.englishWord}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShortWordCardFront;
