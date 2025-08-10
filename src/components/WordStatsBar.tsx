import React from "react";

import "@/assets/scss/components/word-stats-bar.scss";

import PartsStatsBox from "@/components/PartsStatsBox";

import InfoIcon from "@/assets/icons/info.svg?react";

import type {PartStat} from "@/types";

import {getItem} from "@/helpers/persistance-storage";
import {TOTAL_WORDS_KEY, PARTS_COUNT_ARRAY_KEY} from "@/helpers/constants";

const WordStatsBar: React.FC = () => {
    const parts: PartStat[] = getItem(PARTS_COUNT_ARRAY_KEY, "local") || [];

    return (
        <>
            <section className="word-stats-bar">
                <div data-tooltip>
                    <div className="summ-box">
                        <span className="sum-number">
                            {getItem(TOTAL_WORDS_KEY, "local") || 0}{" "}
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
