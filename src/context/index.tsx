import {createContext, useContext, useState, ReactNode, useEffect} from "react";

import type {SettingsContextType} from "@/types";

import {getItem, setItem} from "@/helpers/persistance-storage";

const ITEMS_PER_PAGE = import.meta.env.VITE_ITEMS_PER_PAGE_KEY;
const ORDER_ITEMS = import.meta.env.VITE_ORDER_ITEMS_KEY;

const ItemsPerPageContext = createContext<SettingsContextType | null>(null);

export const ContextSettingsProvider = ({children}: {children: ReactNode}) => {
    const [itemsPerPage, setItemsPerPage] = useState<number>(() => {
        const stored = getItem(ITEMS_PER_PAGE);
        return stored ? Number(stored) : 10;
    });

    const [ascOrder, setAscOrder] = useState<boolean>(() => {
        const stored = getItem(ORDER_ITEMS);
        return stored === "true";
    });

    useEffect(() => {
        setItem(ITEMS_PER_PAGE, String(itemsPerPage));
        setItem(ORDER_ITEMS, String(ascOrder));
    }, [itemsPerPage, ascOrder]);

    return (
        <ItemsPerPageContext.Provider
            value={{itemsPerPage, setItemsPerPage, ascOrder, setAscOrder}}
        >
            {children}
        </ItemsPerPageContext.Provider>
    );
};

export const useItemsPerPage = () => {
    const context = useContext(ItemsPerPageContext);
    if (!context) {
        throw new Error(
            "useItemsPerPage must be used within an ContextSettingsProvider",
        );
    }
    return context;
};
