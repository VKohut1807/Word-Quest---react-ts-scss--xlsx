import React from "react";

import "@/assets/scss/components/input-button.scss";

import {InputRadioProps} from "@/types/input-types";

const InputRadio: React.FC<InputRadioProps> = ({
    value,
    nameGroup = "",
    selected,
    onSelect,
    classesName = "",
}) => {
    return (
        <label
            className={`label ${selected === value ? "active" : ""} ${classesName}`}
        >
            <input
                type="radio"
                value={value}
                name={nameGroup}
                checked={selected === value}
                onChange={() => onSelect(value)}
            />
            <span className="label-name">{value}</span>
        </label>
    );
};

export default InputRadio;
