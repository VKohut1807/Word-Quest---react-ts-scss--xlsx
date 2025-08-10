import React from "react";

import "@/assets/scss/components/inputs/input-button.scss";

import {InputButtonProps} from "@/types/input-types";

const InputButton: React.FC<InputButtonProps> = ({
    label,
    selected,
    additionalText,
    buttonKey,
    onSelect,
    secondaryButton = false,
    classesName = "",
}) => {
    return (
        <label
            {...(secondaryButton ? {"secondary-button": ""} : {})}
            data-additional-text={additionalText}
            className={`label ${selected ? "active selected" : ""} ${classesName}`}
        >
            <input type="button" onClick={() => onSelect(buttonKey)} />
            {label}
        </label>
    );
};

export default InputButton;
