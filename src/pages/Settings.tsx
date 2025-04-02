import React, {useState, useEffect} from "react";

import "@/assets/scss/pages/settings.scss";

import type {FileUploader as FileUploaderType} from "@/types/file-uploader-types";

import ModalWindow from "@/components/ModalWindow";
import FileUploader from "@/components/FileUploader";

const Settings: React.FC<FileUploaderType> = ({setExcelData}) => {
    const [selected, setSelected] = useState<string>("def-file");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <ModalWindow openModal={isModalOpen} setOpenModal={setIsModalOpen}>
                <FileUploader setExcelData={setExcelData} />
            </ModalWindow>
            <section className="settings">
                <h1>Settings</h1>
                <ul className="settings-box">
                    <li className="settings-box">
                        <h3>Data from:</h3>
                        <div className="radio-group">
                            <label
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
                                onClick={onOpenModal}
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
