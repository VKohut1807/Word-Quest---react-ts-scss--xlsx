import {FileUploader} from "@/types";

export type LocalStorage = {
    id: number;
    englishWord: string;
    ukrainianWord: string;
    partOfSpeech: string;
    wordForms: string;
    transcription: string;
    affirmativeSentence: string;
    negativeSentence: string;
    questionSentence: string;
    imageUrl: string;
    cambridgeUrl: string;
};

export type LocalStorageNoId = Omit<LocalStorage, "id">;
export type WordDraft = Omit<LocalStorage, "id">;

export type DictionaryProps = {
    data: LocalStorage[];
};

export type ModalImageProps = Omit<
    LocalStorage,
    "partOfSpeech" | "wordForms" | "transcription" | "cambridgeUrl"
>;

export type WordCard = {
    row: LocalStorage;
    onImageClick?: (row: ModalImageProps) => void;
    onSlideClick?: (id: number) => void;
};

export type SwiperProps = DictionaryProps & {
    initialSlide: number;
    setIsShowSwiper: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PartOfSpeech =
    | "noun"
    | "idiom"
    | "phrase"
    | "verb"
    | "adjective"
    | "adverb";

export type WordFormProps = FileUploader & {
    editId?: number | null;
    onClose: () => void;
};
