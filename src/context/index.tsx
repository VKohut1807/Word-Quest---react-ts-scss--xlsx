import {createContext, useContext, useState, ReactNode, useEffect} from "react";

import type {ItemsPerPageContextType} from "@/types";

import {getItem, setItem} from "@/helpers/persistance-storage";

const VITE_ITEMS_PER_PAGE_KEY = import.meta.env.VITE_ITEMS_PER_PAGE_KEY;

const ItemsPerPageContext = createContext<ItemsPerPageContextType | null>(null);

export const ItemsPerPageProvider = ({children}: {children: ReactNode}) => {
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        const stored = getItem(VITE_ITEMS_PER_PAGE_KEY);
        return stored ? Number(stored) : 10;
    });

    useEffect(() => {
        setItem(VITE_ITEMS_PER_PAGE_KEY, String(itemsPerPage));
    }, [itemsPerPage]);

    return (
        <ItemsPerPageContext.Provider value={{itemsPerPage, setItemsPerPage}}>
            {children}
        </ItemsPerPageContext.Provider>
    );
};

export const useItemsPerPage = () => {
    const context = useContext(ItemsPerPageContext);
    if (!context) {
        throw new Error(
            "useItemsPerPage must be used within an ItemsPerPageProvider",
        );
    }
    return context;
};
