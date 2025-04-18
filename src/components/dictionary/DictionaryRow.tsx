import React from "react";
import {Link} from "react-router-dom";

import "@/assets/scss/pages/dictionary-page/dictionary-row.scss";

import type {LocalStorage} from "@/types/dictionary-types";

const DictionaryRow: React.FC<{
    row: LocalStorage;
    onImageClick: (row: LocalStorage) => void;
}> = ({row, onImageClick}) => {
    const transcriptionWords = row["transcription"].split(" ");

    return (
        <li className="row">
            <div className="up">
                <div className="transcription-box">
                    <span className="bracket">[</span>

                    <div className="transcription">
                        {transcriptionWords.map((word, index) => (
                            <span key={index}>{word} </span>
                        ))}
                    </div>
                    <span className="bracket">]</span>
                </div>
            </div>
            <div className="left">
                <div
                    onClick={() => onImageClick(row)}
                    className="image-box"
                    data-number={row["id"]}
                >
                    <img
                        loading="lazy"
                        src={row["imageUrl"]}
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
        </li>
    );
};

export default DictionaryRow;
