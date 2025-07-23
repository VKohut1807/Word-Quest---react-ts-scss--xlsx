import React from "react";

import "@/assets/scss/components/parts-stats-box.scss";
import type {PartStat} from "@/types";

import {getItem} from "@/helpers/persistance-storage";

const PARTS_COUNT_ARRAY = import.meta.env.VITE_PARTS_COUNT_ARRAY_KEY;

const PartsStatsBox: React.FC = () => {
    const parts = getItem<PartStat[]>(PARTS_COUNT_ARRAY) || [];

    return (
        <div className="parts-stats-box">
            {parts.map(({part, count}) => (
                <div className="part-row" key={part}>
                    <span className="title">{part}s</span>
                    <span className="total">{count}</span>
                </div>
            ))}
        </div>
    );
};

export default PartsStatsBox;
