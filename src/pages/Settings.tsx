import React, {useState} from "react";

import "@/assets/scss/pages/settings.scss";

import ModalWindow from "@/components/ModalWindow";
import FileUploader from "@/components/FileUploader";
import PublicFileUploader from "@/components/PublicFileUploader";
import InputButton from "@/components/inputs/InputButton";
import InputRadio from "@/components/inputs/InputRadio";

import {useItemsPerPage, useModalManager} from "@/context";

import type {FileUploader as FileUploaderType} from "@/types";

import {getItem} from "@/helpers/persistance-storage";
import {
    DEFAULT_FILE_NAME,
    FILE_NAME_KEY,
    EXCEL_DATA_KEY,
} from "@/helpers/constants";

const Settings: React.FC<FileUploaderType> = ({setExcelData}) => {
    const isDefFile = DEFAULT_FILE_NAME === getItem(FILE_NAME_KEY);
    const isMyFile =
        DEFAULT_FILE_NAME !== getItem(FILE_NAME_KEY, "local") &&
        getItem(FILE_NAME_KEY, "local") !== null;
    getItem(EXCEL_DATA_KEY, "local") !== null;

    const {openModal} = useModalManager();

    const {itemsPerPage, setItemsPerPage, ascOrder, setAscOrder} =
        useItemsPerPage();
    const handleSelect = (value: string) => {
        setItemsPerPage(Number(value));
    };
    const handleSelectOrder = (value: string) => {
        setAscOrder(value === "forward");
    };

    return (
        <>
            <ModalWindow modalKey="load-def-file">
                <PublicFileUploader setExcelData={setExcelData} />
            </ModalWindow>

            <ModalWindow modalKey="load-my-file">
                <FileUploader setExcelData={setExcelData} />
            </ModalWindow>

            <section className="settings">
                <h1>Settings</h1>
                <ul className="settings-group">
                    <li className="settings-box">
                        <h3>Load data in file order:</h3>
                        <div className="radio-group">
                            <InputRadio
                                value="forward"
                                nameGroup="order-data"
                                selected={ascOrder ? "forward" : "backward"}
                                onSelect={handleSelectOrder}
                            />
                            <InputRadio
                                value="backward"
                                nameGroup="order-data"
                                selected={ascOrder ? "forward" : "backward"}
                                onSelect={handleSelectOrder}
                            />
                        </div>
                    </li>
                    <li className="settings-box">
                        <h3>Data from:</h3>
                        <div className="button-group">
                            <InputButton
                                label={
                                    isDefFile
                                        ? "Default file is already uploaded"
                                        : "Load default file"
                                }
                                selected={isDefFile}
                                additionalText="Upload the file again?"
                                buttonKey="def-file"
                                onSelect={() => openModal("load-def-file")}
                            />

                            <InputButton
                                label={
                                    isMyFile
                                        ? "My file is already uploaded"
                                        : "Load my file"
                                }
                                selected={isMyFile}
                                additionalText="Upload the file again?"
                                buttonKey="my-file"
                                onSelect={() => openModal("load-my-file")}
                            />
                        </div>
                    </li>
                    <li className="settings-box">
                        <h3>Items per page:</h3>
                        <div className="radio-group">
                            <InputRadio
                                value="10"
                                nameGroup="per-page"
                                selected={String(itemsPerPage)}
                                onSelect={handleSelect}
                            />
                            <InputRadio
                                value="20"
                                nameGroup="per-page"
                                selected={String(itemsPerPage)}
                                onSelect={handleSelect}
                            />
                            <InputRadio
                                value="30"
                                nameGroup="per-page"
                                selected={String(itemsPerPage)}
                                onSelect={handleSelect}
                            />
                        </div>
                    </li>
                </ul>
            </section>
        </>
    );
};

export default Settings;
