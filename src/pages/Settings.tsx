import React, {useState} from "react";

import "@/assets/scss/pages/settings.scss";

import type {FileUploader as FileUploaderType} from "@/types/file-uploader-types";
import type {LocalStorage} from "@/types/dictionary-types";

import ModalWindow from "@/components/ModalWindow";
import FileUploader from "@/components/FileUploader";
import PublicFileUploader from "@/components/PublicFileUploader";
import InputButton from "@/components/inputs/InputButton";

import {getItem} from "@/helpers/persistance-storage";

const DEFAULT_FILE_NAME = import.meta.env.VITE_DEFAULT_FILE_NAME_KEY;
const FILE_NAME = import.meta.env.VITE_FILE_NAME_KEY;
const EXCEL_DATA = import.meta.env.VITE_EXCEL_DATA_KEY;

const Settings: React.FC<FileUploaderType> = ({setExcelData}) => {
    const [selected, setSelected] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onOpenModal = (type: string) => {
        setSelected(type);
        setIsModalOpen(true);
    };

    const isDefFile = DEFAULT_FILE_NAME === getItem(FILE_NAME);
    const isMyFile =
        DEFAULT_FILE_NAME !== getItem(FILE_NAME) && getItem(FILE_NAME) !== null;
    getItem(EXCEL_DATA) !== null;

    const requiredFields: (keyof LocalStorage)[] = [
        "id",
        "eng-word",
        "ukr-word",
        "part-of-speech",
        "singular-and-plural-forms",
        "transcription-word",
        "url-image",
        "url-dictionary-cambridge",
    ];

    return (
        <>
            {isModalOpen && selected === "def-file" && (
                <ModalWindow
                    openModal={isModalOpen}
                    setOpenModal={setIsModalOpen}
                >
                    <PublicFileUploader
                        setExcelData={setExcelData}
                        requiredFields={requiredFields}
                    />
                </ModalWindow>
            )}

            {isModalOpen && selected === "my-file" && (
                <ModalWindow
                    openModal={isModalOpen}
                    setOpenModal={setIsModalOpen}
                >
                    <FileUploader
                        setExcelData={setExcelData}
                        requiredFields={requiredFields}
                    />
                </ModalWindow>
            )}

            <section className="settings">
                <h1>Settings</h1>
                <ul className="settings-box">
                    <li className="settings-box">
                        <h3>Data from:</h3>
                        <div className="radio-group">
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
                </ul>
            </section>
        </>
    );
};

export default Settings;
