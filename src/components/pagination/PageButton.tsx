import React from "react";

import {PageButtonProps} from "@/types";

const PageButton: React.FC<PageButtonProps> = ({
    pageNumber,
    isActive,
    onClick,
}) => {
    return (
        <button
            onClick={() => onClick(pageNumber)}
            className={`pagination-btn ${isActive ? "active" : ""}`}
        >
            {pageNumber}
        </button>
    );
};

export default PageButton;
