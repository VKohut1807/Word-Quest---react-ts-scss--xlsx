export type InputButtonProps = {
    label: React.ReactNode;
    selected: boolean;
    additionalText?: string;
    buttonKey: string;
    onSelect: (buttonKey: string) => void;
    variant?: string;
    classesName?: string;
    disabledes?: boolean;
};

export type InputRadioProps = {
    value: string;
    nameGroup: string;
    selected: string;
    classesName?: string;
    onSelect: (value: string) => void;
};

export type InputTextProps = {
    inputType?: string;
    inputKey: string;
    label: string;
    value: string;
    classesName?: string;
    inputRequired?: boolean;
    handleChange: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};
