import {SlotProps} from "@/types/route-types";

export type ModalWindowType = SlotProps & {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
