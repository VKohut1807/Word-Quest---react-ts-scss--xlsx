export const getItem = <T>(
    key: string,
    storageType: "local" | "session" = "local",
): T | null => {
    try {
        const storage =
            storageType === "session" ? sessionStorage : localStorage;
        const item = storage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error getting data from ${storageType}Storage:`, error);
        return null;
    }
};

export const setItem = <T>(
    key: string,
    data: T,
    storageType: "local" | "session" = "local",
): void => {
    const storage = storageType === "session" ? sessionStorage : localStorage;

    try {
        storage.setItem(String(key), JSON.stringify(data));
    } catch (error) {
        console.error(`Error setting data from ${storageType}Storage:`, error);
    }
};

export const removeItem = <T>(
    key: string,
    storageType: "local" | "session" = "local",
) => {
    try {
        const storage =
            storageType === "session" ? sessionStorage : localStorage;
        storage.removeItem(key);
    } catch (error) {
        console.error(`Error removing data from ${storageType}Storage:`, error);
        return null;
    }
};
