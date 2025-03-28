import {LocalStorage} from "@/types/dictionary-types";

export type TwinQuestProps = {
    localstorData: LocalStorage[];
};

export type PartOfSpeech =
    | "noun"
    | "idiom"
    | "phrase"
    | "verb"
    | "adjective"
    | "adverb";
