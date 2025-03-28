export const getRndInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const shuffleArray = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};
