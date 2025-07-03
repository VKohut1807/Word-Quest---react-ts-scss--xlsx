import React, {useState, useEffect} from "react";

import "@/assets/scss/pages/settings.scss";

import ModalWindow from "@/components/ModalWindow";
import FileUploader from "@/components/FileUploader";
import PublicFileUploader from "@/components/PublicFileUploader";
import InputButton from "@/components/inputs/InputButton";
import InputRadio from "@/components/inputs/InputRadio";

import type {FileUploader as FileUploaderType, LocalStorage} from "@/types";

import {getItem} from "@/helpers/persistance-storage";
import {useItemsPerPage} from "@/context";

const DEFAULT_FILE_NAME = import.meta.env.VITE_DEFAULT_FILE_NAME_KEY;
const FILE_NAME = import.meta.env.VITE_FILE_NAME_KEY;
const EXCEL_DATA = import.meta.env.VITE_EXCEL_DATA_KEY;

const Settings: React.FC<FileUploaderType> = ({setExcelData}) => {
    const requiredFields: (keyof Omit<LocalStorage, "id">)[] = [
        "englishWord",
        "ukrainianWord",
        "partOfSpeech",
        "wordForms",
        "transcription",
        "affirmativeSentence",
        "negativeSentence",
        "questionSentence",
        "imageUrl",
        "cambridgeUrl",
    ];

    const isDefFile = DEFAULT_FILE_NAME === getItem(FILE_NAME);
    const isMyFile =
        DEFAULT_FILE_NAME !== getItem(FILE_NAME) && getItem(FILE_NAME) !== null;
    getItem(EXCEL_DATA) !== null;

    const [selected, setSelected] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const onOpenModal = (type: string) => {
        setSelected(type);
        setIsModalOpen(true);
    };

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
            {isModalOpen && selected === "def-file" && (
                <ModalWindow setOpenModal={setIsModalOpen}>
                    <PublicFileUploader
                        setExcelData={setExcelData}
                        requiredFields={requiredFields}
                    />
                </ModalWindow>
            )}

            {isModalOpen && selected === "my-file" && (
                <ModalWindow setOpenModal={setIsModalOpen}>
                    <FileUploader
                        setExcelData={setExcelData}
                        requiredFields={requiredFields}
                    />
                </ModalWindow>
            )}

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
                                onSelect={onOpenModal}
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
                                onSelect={onOpenModal}
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
