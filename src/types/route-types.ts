export type SlotProps = {
    title?: string;
    children: React.ReactNode;
};

export type FlipCardProps = {
    removeToggleFlip?: boolean;
    front: React.ReactNode;
    back: React.ReactNode;
};
