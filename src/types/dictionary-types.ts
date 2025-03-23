export type LocalStorage = {
    id: number;
    "eng-word": string;
    "ukr-word": string;
    "part-of-speech": string;
    "singular-and-plural-forms": string;
    "transcription-word": string;
    "url-image": string;
    "url-dictionary-cambridge": string;
};

export type DictionaryProps = {
    data: LocalStorage[];
};
