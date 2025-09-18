import React from "react";

import "@/assets/scss/pages/dictionary-page/word-card-back.scss";

import InfoIcon from "@/assets/icons/info.svg?react";

import type {WordCard} from "@/types";

const WordCardBack: React.FC<WordCard> = ({row}) => {
    return (
        <>
            <div className="word-card-back">
                <div className="title">
                    <h3>{row.englishWord}</h3>
                    <u>{row.partOfSpeech}</u>
                    <div className="info" data-tooltip>
                        <InfoIcon />
                        <div className="tooltip-info">
                            <div className="colors">
                                <div className="color-box">
                                    <span className="color affirmative-sentance"></span>
                                    -&nbsp;affirmative sentence
                                </div>
                                <div className="color-box">
                                    <span className="color negative-sentance"></span>
                                    -&nbsp;negative sentence
                                </div>
                                <div className="color-box">
                                    <span className="color question-sentance"></span>
                                    -&nbsp;question sentence
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="sentences">
                    <li className="sentance affirmative-sentance gradient">
                        {row.affirmativeSentence}
                    </li>
                    <li className="sentance negative-sentance gradient">
                        {row.negativeSentence}
                    </li>
                    <li className="sentance question-sentance gradient">
                        {row.questionSentence}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default WordCardBack;
