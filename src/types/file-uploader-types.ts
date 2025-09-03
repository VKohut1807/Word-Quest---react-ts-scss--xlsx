import {LocalStorage} from "@/types";

export type FileUploader = {
    setExcelData: React.Dispatch<React.SetStateAction<LocalStorage[]>>;
};
