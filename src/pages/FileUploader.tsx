import React, {useState} from "react";
import * as XLSX from "xlsx";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/routes";

import type {FileUploader} from "@/types/file-uploader-types";
import type {LocalStorage, DictionaryProps} from "@/types/dictionary-types";

import "@/assets/scss/pages/file-uploader.scss";
import ClipIcon from "@/assets/icons/clip.svg?react";

import {setItem} from "@/helpers/persistance-storage";

const FileUploader: React.FC<FileUploader> = ({setExcelData}) => {
    const navigate = useNavigate();

    const [fileName, setFileName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState<{
        mess: string;
        class: string;
    } | null>(null);

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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if (file) {
            setFileName(file.name);
            setIsLoading(true);
            setProgress(0);
            setMessage(null);

            const reader = new FileReader();
            reader.onprogress = (event) => {
                if (event.loaded && event.total) {
                    setProgress(Math.round((event.loaded / event.total) * 100));
                }
            };

            reader.onload = (e) => {
                const ab = e.target?.result;
                if (!ab) {
                    setMessage({
                        mess: "Error reading the file",
                        class: "error",
                    });
                    setIsLoading(false);
                    return;
                }

                const workbook = XLSX.read(ab, {type: "array"});
                if (!workbook || workbook.SheetNames.length === 0) {
                    setMessage({
                        mess: "Invalid Excel file",
                        class: "error",
                    });
                    setIsLoading(false);
                    return;
                }

                const sheetName = workbook?.SheetNames[0];
                if (!sheetName) {
                    setMessage({
                        mess: "Excel file is empty or has no sheets.",
                        class: "error",
                    });
                    setIsLoading(false);
                    return;
                }

                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(
                    sheet,
                ) as LocalStorage[];
                const isValid = jsonData.every((item) =>
                    requiredFields.every((field) => field in item),
                );

                if (!isValid) {
                    setMessage({
                        mess: "File structure is invalid or missing required fields.",
                        class: "error",
                    });
                    setIsLoading(false);
                    setProgress(0);
                    return;
                }

                setExcelData(jsonData);
                setItem("excelData", jsonData);
                setIsLoading(false);
                setProgress(100);
                setMessage({
                    mess: "File successfully uploaded!",
                    class: "success",
                });
                navigate(ROUTES.DICTIONARY);
            };
            reader.onerror = () => {
                setIsLoading(false);
                setMessage({
                    mess: "An error occurred while uploading the file.",
                    class: "error",
                });
            };

            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <>
            <div className="upload-file">
                <h2>Please, upload Excel file</h2>
                <label className="button">
                    <ClipIcon />
                    Upload file
                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileChange}
                        className="input"
                    />
                </label>

                {isLoading && (
                    <div className="progress">
                        <div
                            className="progress-bar"
                            style={{width: `${progress}%`}}
                        />
                    </div>
                )}

                {fileName && !isLoading && !message?.mess && (
                    <p className="file-name">File: {fileName}</p>
                )}

                {message?.mess && (
                    <p
                        className={`message ${isLoading ? "loading" : message?.class}`}
                    >
                        {message?.mess}
                    </p>
                )}

                <p className="hint">
                    Supported formats: <strong>.xlsx</strong>,{" "}
                    <strong>.xls</strong>
                </p>
            </div>
        </>
    );
};

export default FileUploader;
