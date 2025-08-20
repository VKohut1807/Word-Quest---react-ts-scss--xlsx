import React, {useState} from "react";

import "@/assets/scss/components/inputs/input-button.scss";

import {InputButtonProps} from "@/types/input-types";

const InputButton: React.FC<InputButtonProps> = ({
    label,
    selected,
    additionalText,
    buttonKey,
    onSelect,
    variant = "",
    classesName = "",
    disabledes = false,
}) => {
    const [canClick, setCanClick] = useState<boolean>(true);

    const handleClick = (): void => {
        if (!canClick || disabledes) return;

        setCanClick(false);
        onSelect(buttonKey);

        setTimeout(() => {
            setCanClick(true);
        }, 500);
    };

    return (
        <label
            data-additional-text={additionalText}
            data-variant={variant}
            {...(disabledes ? {"disabled-button": ""} : {})}
            className={`label ${selected ? "active selected" : ""} ${classesName}`}
        >
            <input disabled={disabledes} type="button" onClick={handleClick} />
            {label}
        </label>
    );
};

export default InputButton;
