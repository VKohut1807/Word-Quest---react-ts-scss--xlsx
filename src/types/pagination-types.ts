export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export type PageButtonProps = {
    pageNumber: number;
    isActive: boolean;
    onClick: (page: number) => void;
};
