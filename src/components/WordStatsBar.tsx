import React from "react";

import "@/assets/scss/components/word-stats-bar.scss";

import PartsStatsBox from "@/components/PartsStatsBox";

import type {PartStat} from "@/types";

import InfoIcon from "@/assets/icons/info.svg?react";

import {getItem} from "@/helpers/persistance-storage";

const TOTAL_WORDS = import.meta.env.VITE_TOTAL_WORDS_KEY;
const PARTS_COUNT_ARRAY = import.meta.env.VITE_PARTS_COUNT_ARRAY_KEY;

const WordStatsBar: React.FC = () => {
    const parts = getItem<PartStat[]>(PARTS_COUNT_ARRAY) || [];

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
                    {parts.length > 0 && (
                        <div className="tooltip-info">
                            <div className="part-of-speech">
                                <PartsStatsBox
                                    header={
                                        <div className="titles">
                                            <span className="title">
                                                Part of speech
                                            </span>
                                            <span className="title">Total</span>
                                        </div>
                                    }
                                    parts={parts}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default WordStatsBar;
