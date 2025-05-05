import React, {useState, useEffect} from "react";
import * as XLSX from "xlsx";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/routes";

import "@/assets/scss/pages/file-uploader.scss";

import type {LocalStorage, FileUploaderDataType} from "@/types";

import {setItem} from "@/helpers/persistance-storage";

const EXCEL_DATA = import.meta.env.VITE_EXCEL_DATA_KEY;
const FILE_NAME = import.meta.env.VITE_FILE_NAME_KEY;
const DEFAULT_FILE_NAME = import.meta.env.VITE_DEFAULT_FILE_NAME_KEY;

const PublicFileUploader: React.FC<FileUploaderDataType> = ({
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

    useEffect(() => {
        const fetchFile = async () => {
            setProgress(0);
            setIsLoading(true);
            setMessage(null);
            try {
                const response = await fetch(`./${DEFAULT_FILE_NAME}`);
                if (!response.ok) {
                    setMessage({
                        mess: "Failed to fetch file",
                        class: "error",
                    });
                    setProgress(0);
                    setIsLoading(false);
                    return;
                }

                const arrayBuffer = await response.arrayBuffer();
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

                const sheetName = workbook.SheetNames[0];
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
                    setProgress(100);
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
                setItem(FILE_NAME, DEFAULT_FILE_NAME);
                setProgress(100);
                setIsLoading(false);
                setMessage({
                    mess: `File "${DEFAULT_FILE_NAME}" successfully uploaded!`,
                    class: "success",
                });
                navigate(ROUTES.DICTIONARY);
            } catch (error: any) {
                setMessage({mess: error.message, class: "error"});
            }
        };

        fetchFile();
    }, []);

    return (
        <div className="upload-file">
            <h2>Loading Excel file from public folder...</h2>

            <div className="progress">
                <div className="progress-bar" style={{width: `${progress}%`}} />
            </div>

            {message && (
                <p className={`message ${message.class}`}>{message.mess}</p>
            )}
        </div>
    );
};

export default PublicFileUploader;
