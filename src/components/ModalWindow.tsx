import React from "react";

import "@/assets/scss/components/modal-window.scss";

import InputButton from "@/components/inputs/InputButton";

import ShutdownIcon from "@/assets/icons/shutdown.svg?react";

import {useModalManager} from "@/context";
import type {ModalWindowType} from "@/types";

const ModalWindow: React.FC<ModalWindowType> = ({
    title,
    children,
    modalKey,
    onCloseModalOption,
}) => {
    const {modals, closeModal} = useModalManager();

    const handleClose = () => {
        onCloseModalOption?.();
        closeModal(modalKey);
    };

    return modals[modalKey] ? (
        <>
            <div data-background-window onClick={handleClose}></div>
            <div className="modal-window">
                <div className="header">
                    <h3>{title}</h3>
                    <InputButton
                        label={<ShutdownIcon />}
                        variant="secondary"
                        selected={false}
                        buttonKey="close-window"
                        classesName="close-window"
                        onSelect={handleClose}
                    />
                </div>
                <div className="box">{children}</div>
            </div>
        </>
    ) : null;
};

export default ModalWindow;
