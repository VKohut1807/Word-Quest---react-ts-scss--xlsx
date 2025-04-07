import React, {useState, useEffect} from "react";
import * as XLSX from "xlsx";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/routes";

import "@/assets/scss/pages/file-uploader.scss";

import type {LocalStorage} from "@/types/dictionary-types";
import type {FileUploaderDataType} from "@/types/settings-types";

import {setItem} from "@/helpers/persistance-storage";
const EXCEL_DATA = import.meta.env.VITE_EXCEL_DATA_KEY;

const PublicFileUploader: React.FC<FileUploaderDataType> = ({
    setExcelData,
    requiredFields,
}) => {
    const navigate = useNavigate();

    const [message, setMessage] = useState<{
        mess: string;
        class: string;
    } | null>(null);

    useEffect(() => {
        const fetchFile = async () => {
            setMessage(null);
            try {
                const response = await fetch("./example.xlsx");
                if (!response.ok) {
                    setMessage({
                        mess: "Failed to fetch file",
                        class: "error",
                    });
                    return;
                }

                const arrayBuffer = await response.arrayBuffer();
                if (!arrayBuffer) {
                    setMessage({
                        mess: "Error reading the file",
                        class: "error",
                    });
                    return;
                }

                const workbook = XLSX.read(arrayBuffer, {type: "array"});
                if (!workbook || workbook.SheetNames.length === 0) {
                    setMessage({
                        mess: "Invalid Excel file",
                        class: "error",
                    });
                    return;
                }

                const sheetName = workbook.SheetNames[0];
                if (!sheetName) {
                    setMessage({
                        mess: "Excel file is empty or has no sheets.",
                        class: "error",
                    });
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
                    return;
                }

                setExcelData(jsonData);
                setItem(EXCEL_DATA, jsonData);
                setMessage({
                    mess: "File successfully uploaded!",
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

            {message && (
                <p className={`message ${message.class}`}>{message.mess}</p>
            )}
        </div>
    );
};

export default PublicFileUploader;
