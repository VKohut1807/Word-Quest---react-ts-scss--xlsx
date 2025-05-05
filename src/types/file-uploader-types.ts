import {LocalStorage} from "@/types/dictionary-types";

export type FileUploader = {
    setExcelData: React.Dispatch<React.SetStateAction<LocalStorage[]>>;
};

export type FileUploaderDataType = FileUploader & {
    requiredFields: (keyof Omit<LocalStorage, "id">)[];
};
