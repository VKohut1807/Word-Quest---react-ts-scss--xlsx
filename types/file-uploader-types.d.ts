import { LocalStorage } from './dictionary-types';
export type FileUploader = {
    setExcelData: React.Dispatch<React.SetStateAction<LocalStorage[]>>;
};
