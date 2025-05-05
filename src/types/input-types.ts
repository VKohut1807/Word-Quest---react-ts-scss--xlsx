export type InputButtonProps = {
    label: React.ReactNode;
    selected: boolean;
    additionalText?: string;
    buttonKey: string;
    onSelect: (buttonKey: string) => void;
    secondaryButton?: boolean;
    classesName?: string;
};

export type InputRadioProps = {
    value: string;
    nameGroup: string;
    selected: string;
    classesName?: string;
    onSelect: (value: string) => void;
};
