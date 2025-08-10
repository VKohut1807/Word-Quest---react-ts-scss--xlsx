import {LocalStorage} from "@/types/dictionary-types";

export type FileUploader = {
    setExcelData: React.Dispatch<React.SetStateAction<LocalStorage[]>>;
};
