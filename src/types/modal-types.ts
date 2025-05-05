import {SlotProps} from "@/types/route-types";

export type ModalWindowType = SlotProps & {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
