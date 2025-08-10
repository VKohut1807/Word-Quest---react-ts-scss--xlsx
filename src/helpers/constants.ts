import type {LocalStorageNoId} from "@/types";

export const EXCEL_DATA_KEY: string = "excel-data";
export const FILE_NAME_KEY: string = "file-name";
export const DEFAULT_FILE_NAME: string = "default.xlsx";
export const ITEMS_PER_PAGE_KEY: string = "items-per-page";
export const PARTS_COUNT_ARRAY_KEY: string = "parts-count-array";
export const TOTAL_WORDS_KEY: string = "total-words";
export const ORDER_ITEMS_KEY: string = "order-items";
export const DRAFT_WORD_KEY: string = "draft-word";
export const ITEM_CARD_ID_KEY: string = "item-card-id-";

export const REQUIRED_WORD_FIELDS: (keyof LocalStorageNoId)[] = [
    "englishWord",
    "ukrainianWord",
    "partOfSpeech",
    "wordForms",
    "transcription",
    "affirmativeSentence",
    "negativeSentence",
    "questionSentence",
    "imageUrl",
    "cambridgeUrl",
];
