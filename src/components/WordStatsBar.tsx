import React from "react";

import "@/assets/scss/components/word-stats-bar.scss";

import PartsStatsBox from "@/components/PartsStatsBox";

import InfoIcon from "@/assets/icons/info.svg?react";

import {getItem} from "@/helpers/persistance-storage";

const TOTAL_WORDS = import.meta.env.VITE_TOTAL_WORDS_KEY;

const WordStatsBar: React.FC = () => {
    return (
        <>
            <section className="word-stats-bar">
                <div data-tooltip>
                    <div className="summ-box">
                        <span className="sum-number">
                            {getItem(TOTAL_WORDS) || 0}{" "}
                            <span className="wodrs">words</span>
                        </span>

                        <InfoIcon className="info" />
                    </div>
                    <div className="tooltip-info">
                        <div className="part-of-speech">
                            <div className="titles">
                                <span className="title">Part of speech</span>
                                <span className="title">Total</span>
                            </div>
                            <PartsStatsBox />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WordStatsBar;
