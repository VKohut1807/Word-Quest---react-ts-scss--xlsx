export const getItem = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error("Error in getting data from localStorage", error);
        return null;
    }
};

export const setItem = <T>(key: string, data: T): void => {
    try {
        localStorage.setItem(String(key), JSON.stringify(data));
    } catch (error) {
        console.error("Error in setting data to localStorage", error);
    }
};
