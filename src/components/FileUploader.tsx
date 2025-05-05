import React, {useState, useEffect} from "react";
import * as XLSX from "xlsx";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/routes";

import "@/assets/scss/pages/file-uploader.scss";

import type {LocalStorage, FileUploaderDataType} from "@/types";

import ClipIcon from "@/assets/icons/clip.svg?react";

import {setItem} from "@/helpers/persistance-storage";

const EXCEL_DATA = import.meta.env.VITE_EXCEL_DATA_KEY;
const FILE_NAME = import.meta.env.VITE_FILE_NAME_KEY;

const FileUploader: React.FC<FileUploaderDataType> = ({
    setExcelData,
    requiredFields,
}) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState<{
        mess: string;
        class: string;
    } | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if (file) {
            setProgress(0);
            setIsLoading(true);
            setMessage(null);

            const reader = new FileReader();

            reader.onprogress = (event) => {
                if (event.loaded && event.total) {
                    setProgress(Math.round((event.loaded / event.total) * 100));
                }
            };

            reader.onload = (e) => {
                const arrayBuffer = e.target?.result;
                if (!arrayBuffer) {
                    setMessage({
                        mess: "Error reading the file",
                        class: "error",
                    });
                    setProgress(0);
                    setIsLoading(false);
                    return;
                }

                const workbook = XLSX.read(arrayBuffer, {type: "array"});
                if (!workbook || workbook.SheetNames.length === 0) {
                    setMessage({
                        mess: "Invalid Excel file",
                        class: "error",
                    });
                    setProgress(0);
                    setIsLoading(false);
                    return;
                }

                const sheetName = workbook?.SheetNames[0];
                if (!sheetName) {
                    setMessage({
                        mess: "Excel file is empty or has no sheets.",
                        class: "error",
                    });
                    setProgress(100);
                    setIsLoading(false);
                    return;
                }

                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet) as Omit<
                    LocalStorage,
                    "id"
                >[];
                const isValid = jsonData.every((item) =>
                    requiredFields.every((field) => field in item),
                );

                if (!isValid) {
                    setMessage({
                        mess: "File structure is invalid or missing required fields.",
                        class: "error",
                    });
                    setProgress(0);
                    setIsLoading(false);
                    return;
                }

                const jsonDataWithIds: LocalStorage[] = jsonData
                    .reverse()
                    .map((item, index) => ({
                        ...item,
                        id: index + 1,
                    }));

                setExcelData(jsonDataWithIds);
                setItem(EXCEL_DATA, jsonDataWithIds);
                setItem(FILE_NAME, file.name);
                setProgress(100);
                setIsLoading(false);
                setMessage({
                    mess: `File "${file.name}" successfully uploaded!`,
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
        <div className="upload-file">
            <h2>Please, upload Your Excel file</h2>
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

            <div className="progress">
                <div className="progress-bar" style={{width: `${progress}%`}} />
            </div>

            {message?.mess && !isLoading && (
                <p
                    className={`message ${isLoading ? "loading" : message?.class}`}
                >
                    {message?.mess}
                </p>
            )}

            <p className="hint">
                Supported formats: <strong>.xlsx</strong>, <strong>.xls</strong>
            </p>
        </div>
    );
};

export default FileUploader;
