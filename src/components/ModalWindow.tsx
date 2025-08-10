import React from "react";

import "@/assets/scss/components/modal-window.scss";

import ShutdownIcon from "@/assets/icons/shutdown.svg?react";

import type {ModalWindowType} from "@/types";

const RouteWrapper: React.FC<ModalWindowType> = ({children, setOpenModal}) => {
    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <div className="modal-window">
            <ShutdownIcon className="close-icon" onClick={closeModal} />
            <div className="box">{children}</div>
        </div>
    );
};

export default RouteWrapper;
