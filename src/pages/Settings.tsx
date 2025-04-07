import React, {useState, useEffect} from "react";

import "@/assets/scss/pages/settings.scss";

import type {FileUploader as FileUploaderType} from "@/types/file-uploader-types";
import type {LocalStorage} from "@/types/dictionary-types";

import ModalWindow from "@/components/ModalWindow";
import FileUploader from "@/components/FileUploader";
import PublicFileUploader from "@/components/PublicFileUploader";

const Settings: React.FC<FileUploaderType> = ({setExcelData}) => {
    const [selected, setSelected] = useState<string>("def-file");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onOpenModal = (type: string) => {
        setSelected(type);
        setIsModalOpen(true);
    };

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
                            <label
                                onClick={() => onOpenModal("def-file")}
                                className={`label ${selected === "def-file" ? "active" : ""}`}
                            >
                                <input
                                    type="radio"
                                    name="toggle"
                                    value="def-file"
                                    checked={selected === "def-file"}
                                    onChange={() => setSelected("def-file")}
                                />
                                Load default file
                            </label>

                            <label
                                onClick={() => onOpenModal("my-file")}
                                className={`label ${selected === "my-file" ? "active" : ""}`}
                            >
                                <input
                                    type="radio"
                                    name="toggle"
                                    value="my-file"
                                    checked={selected === "my-file"}
                                    onChange={() => setSelected("my-file")}
                                />
                                Load my file
                            </label>
                        </div>
                    </li>
                </ul>
            </section>
        </>
    );
};

export default Settings;
