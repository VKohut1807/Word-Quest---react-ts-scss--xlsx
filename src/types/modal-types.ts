import {SlotProps} from "@/types";

export type ModalWindowType = SlotProps & {
    modalKey: string;
    onCloseModalOption?: () => void;
};
