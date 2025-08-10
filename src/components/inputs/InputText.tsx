import React from "react";

import "@/assets/scss/components/inputs/input-text.scss";

import {InputTextProps} from "@/types/input-types";

const InputText: React.FC<InputTextProps> = ({
    inputType = "text",
    inputKey,
    label,
    value,
    classesName = "",
    inputRequired = true,
    handleChange,
    handleBlur,
}) => {
    return (
        <div className="input-box">
            <input
                type={inputType}
                id={inputKey}
                name={inputKey}
                onChange={handleChange}
                value={value || ""}
                onBlur={handleBlur}
                placeholder={label}
                className={classesName}
                required={inputRequired}
            />
            <label htmlFor={inputKey}>{label}</label>
        </div>
    );
};

export default InputText;
