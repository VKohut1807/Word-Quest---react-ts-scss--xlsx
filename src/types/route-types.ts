export type SlotProps = {
    title?: string;
    children: React.ReactNode;
};

export type FlipCardProps = {
    resetOnSwiper?: boolean;
    front: React.ReactNode;
    back: React.ReactNode;
};
