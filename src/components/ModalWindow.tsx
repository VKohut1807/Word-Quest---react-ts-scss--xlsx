import React from "react";

import "@/assets/scss/components/modal-window.scss";

import type {ModalWindowType} from "@/types/settings-types";

import ShutdownIcon from "@/assets/icons/shutdown.svg?react";

const RouteWrapper: React.FC<ModalWindowType> = ({
    children,
    openModal,
    setOpenModal,
}) => {
    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <div className={`modal-window ${openModal ? "active" : ""}`}>
            <ShutdownIcon className="close-icon" onClick={closeModal} />
            <div className="box">{children}</div>
        </div>
    );
};

export default RouteWrapper;
