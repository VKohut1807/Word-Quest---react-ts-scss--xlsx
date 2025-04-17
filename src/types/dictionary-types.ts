export type LocalStorage = {
    id: number;
    englishWord: string;
    ukrainianWord: string;
    partOfSpeech: string;
    wordForms: string;
    transcription: string;
    imageUrl: string;
    cambridgeUrl: string;
};

export type DictionaryProps = {
    data: LocalStorage[];
};

export type ModalImageProps = Omit<
    LocalStorage,
    | "ukrainianWord"
    | "partOfSpeech"
    | "wordForms"
    | "transcription"
    | "cambridgeUrl"
>;
