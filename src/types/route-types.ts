export type SlotProps = {
    title?: string;
    children: React.ReactNode;
};

export type FlipCardProps = {
    className?: string;
    front: React.ReactNode;
    back: React.ReactNode;
    isActive: boolean;
};
