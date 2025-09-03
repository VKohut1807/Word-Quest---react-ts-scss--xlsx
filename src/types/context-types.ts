export type SettingsContextType = {
    itemsPerPage: number;
    setItemsPerPage: (value: number) => void;

    ascOrder: boolean;
    setAscOrder: (order: boolean) => void;
};

export type ModalContextType = {
    modals: Record<string, boolean>;
    openModal: (key: string) => void;
    closeModal: (key: string) => void;
};
