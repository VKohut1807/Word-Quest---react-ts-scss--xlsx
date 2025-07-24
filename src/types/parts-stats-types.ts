export type PartStat = {
    part: string;
    count: number;
};

export type PartsStatsBoxProps = {
    header: React.ReactNode;
    parts: PartStat[];
};
