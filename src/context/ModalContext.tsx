import {createContext, useContext, useState, ReactNode} from "react";

import type {ModalContextType} from "@/types";

const ModalContext = createContext<ModalContextType | null>(null);

export const ContextModalProvider = ({children}: {children: ReactNode}) => {
    const [modals, setModals] = useState<Record<string, boolean>>({});

    const openModal = (key: string) =>
        setModals((prev) => ({...prev, [key]: true}));
    const closeModal = (key: string) =>
        setModals((prev) => ({...prev, [key]: false}));

    return (
        <ModalContext.Provider value={{modals, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalManager = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error(
            "useModalManager must be used within ContextModalProvider",
        );
    }
    return context;
};
