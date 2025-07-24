import React from "react";

import "@/assets/scss/components/parts-stats-box.scss";
import type {PartsStatsBoxProps} from "@/types";

const PartsStatsBox: React.FC<PartsStatsBoxProps> = ({header, parts}) => {
    return (
        <div className="parts-stats-box">
            <div className="header">{header}</div>
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
