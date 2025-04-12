export type InputButtonProps = {
    label: string;
    selected: boolean;
    additionalText?: string;
    buttonKey: string;
    onSelect: (buttonKey: string) => void;
};
