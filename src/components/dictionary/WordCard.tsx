import React from "react";
import {Link} from "react-router-dom";

import "@/assets/scss/pages/dictionary-page/word-card.scss";

import type {WordCard} from "@/types";

import {ITEM_CARD_ID_KEY} from "@/helpers/constants";

const WordCard: React.FC<WordCard> = ({
    row,
    onImageClick = () => {},
    onSlideClick = () => {},
}) => {
    const transcriptionWords = row.transcription?.split(" ");

    return (
        <>
            <div
                id={ITEM_CARD_ID_KEY + String(row.id)}
                onClick={() => onSlideClick(row.id)}
                className="word-card"
            >
                <div className="up">
                    <div className="transcription-box">
                        <span className="bracket">[</span>

                        <div className="transcription">
                            {transcriptionWords?.map((word, index) => (
                                <span key={index}>{word}</span>
                            ))}
                        </div>
                        <span className="bracket">]</span>
                    </div>
                </div>
                <div className="left">
                    <div
                        onClick={(event) => {
                            event.stopPropagation();
                            onImageClick(row);
                        }}
                        className="image-box"
                        data-number={row.id}
                    >
                        <img
                            src={row["imageUrl"]}
                            loading="lazy"
                            alt={row["englishWord"]}
                        />
                    </div>
                    <div className="text-box">
                        <h2>{row["englishWord"]}</h2>
                        <h5>{row["ukrainianWord"]}</h5>
                    </div>
                </div>
                <div className="right">
                    <u>{row["partOfSpeech"]}</u>
                    <Link
                        className="readmore"
                        to={row["cambridgeUrl"]}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read more...
                    </Link>
                </div>
            </div>
        </>
    );
};

export default WordCard;
