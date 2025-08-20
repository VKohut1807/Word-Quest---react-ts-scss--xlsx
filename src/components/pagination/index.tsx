import React from "react";

import "@/assets/scss/components/pagination.scss";

import InputButton from "@/components/inputs/InputButton";

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
            <InputButton
                label="Back"
                selected={false}
                buttonKey="pagination-back"
                variant="pager"
                disabledes={currentPage === 1}
                onSelect={handlePrev}
                classesName="prev"
            />
            <div className="buttons-box">
                {Array.from({length: totalPages}, (_, i) => {
                    const page = i + 1;
                    return (
                        <InputButton
                            key={page}
                            label={page}
                            selected={currentPage === page}
                            buttonKey={String(page)}
                            variant="pagination"
                            onSelect={(key) => onPageChange(Number(key))}
                        />
                    );
                })}
            </div>
            <InputButton
                label="Next"
                selected={false}
                buttonKey="pagination-next"
                variant="pager"
                disabledes={currentPage === totalPages}
                onSelect={handleNext}
                classesName="next"
            />
        </div>
    );
};

export default Pagination;
