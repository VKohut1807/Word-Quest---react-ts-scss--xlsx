export type SettingsContextType = {
    itemsPerPage: number;
    setItemsPerPage: (value: number) => void;

    ascOrder: boolean;
    setAscOrder: (order: boolean) => void;
};
