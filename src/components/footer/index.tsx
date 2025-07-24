import React from "react";
import {Link} from "react-router-dom";

import PartsStatsBox from "@/components/PartsStatsBox";

import "@/assets/scss/components/footer.scss";

import DiceLightIcon from "@/assets/icons/dice-light.svg?react";

import type {PartStat} from "@/types";

import {getItem} from "@/helpers/persistance-storage";

const PARTS_COUNT_ARRAY = import.meta.env.VITE_PARTS_COUNT_ARRAY_KEY;

const parts = getItem<PartStat[]>(PARTS_COUNT_ARRAY) || [];

const Footer: React.FC = () => {
    return (
        <>
            <section
                className={`footer ${parts.length <= 0 ? "without-info" : ""}`}
            >
                {parts.length > 0 && (
                    <div className="vocabulary-info">
                        <div data-cloud></div>
                        <div className="vocabulary-box">
                            <PartsStatsBox
                                header={
                                    <>
                                        <h4>My vocabulary stats</h4>
                                    </>
                                }
                                parts={parts}
                            />
                        </div>
                    </div>
                )}
                <div className="personal-info-group">
                    <div data-cloud></div>
                    <DiceLightIcon className="icon-svg" />
                    <Link
                        className="my-github"
                        to="https://github.com/VKohut1807"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="year">2025</span>
                        <span className="name">github.com/VKohut1807</span>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Footer;
