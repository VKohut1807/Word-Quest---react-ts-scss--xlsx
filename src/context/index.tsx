import {createContext, useContext, useState, ReactNode, useEffect} from "react";

import type {SettingsContextType} from "@/types";

import {getItem, setItem} from "@/helpers/persistance-storage";
import {ITEMS_PER_PAGE_KEY, ORDER_ITEMS_KEY} from "@/helpers/constants";

const ItemsPerPageContext = createContext<SettingsContextType | null>(null);

export const ContextSettingsProvider = ({children}: {children: ReactNode}) => {
    const [itemsPerPage, setItemsPerPage] = useState<number>(() => {
        const stored = getItem(ITEMS_PER_PAGE_KEY, "local");
        return stored ? Number(stored) : 10;
    });

    const [ascOrder, setAscOrder] = useState<boolean>(() => {
        const stored = getItem(ORDER_ITEMS_KEY, "local");
        return stored === "true";
    });

    useEffect(() => {
        setItem(ITEMS_PER_PAGE_KEY, String(itemsPerPage), "local");
        setItem(ORDER_ITEMS_KEY, String(ascOrder), "local");
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
