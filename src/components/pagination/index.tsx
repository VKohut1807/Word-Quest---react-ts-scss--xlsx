import React from "react";

import "@/assets/scss/components/pagination.scss";

import PageButton from "@/components/pagination/PageButton";

import {PaginationProps} from "@/types";

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    otherClasses,
}) => {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className={`pagination ${otherClasses || ""}`}>
            <button
                className="prev"
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                Back
            </button>

            <div className="buttons-box">
                {Array.from({length: totalPages}, (_, i) => {
                    const page = i + 1;
                    return (
                        <PageButton
                            key={page}
                            pageNumber={page}
                            isActive={currentPage === page}
                            onClick={onPageChange}
                        />
                    );
                })}
            </div>
            <button
                className="next"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
