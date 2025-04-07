import {SlotProps} from "@/types/route-types";
import {FileUploader} from "@/types/file-uploader-types";
import {LocalStorage} from "@/types/dictionary-types";

export type ModalWindowType = SlotProps & {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FileUploaderDataType = FileUploader & {
    requiredFields: (keyof LocalStorage)[];
};
