import React, {useState, useEffect, useMemo} from "react";

import "@/assets/scss/components/word-form.scss";

import WordCard from "@/components/dictionary/WordCard";
import InputText from "@/components/inputs/InputText";
import InputButton from "@/components/inputs/InputButton";

import ShutdownIcon from "@/assets/icons/shutdown.svg?react";
import EyeOpenIcon from "@/assets/icons/eye-open.svg?react";
import EyeCloseIcon from "@/assets/icons/eye-close.svg?react";

import type {FileUploader, LocalStorage, WordDraft} from "@/types";

import {getItem, setItem, removeItem} from "@/helpers/persistance-storage";
import {
    EXCEL_DATA_KEY,
    TOTAL_WORDS_KEY,
    DRAFT_WORD_KEY,
    REQUIRED_WORD_FIELDS,
} from "@/helpers/constants";

const WordForm: React.FC<FileUploader> = ({setExcelData}) => {
    const wordList: LocalStorage[] = getItem(EXCEL_DATA_KEY, "local") ?? [];

    const [word, setWord] = useState<Partial<WordDraft>>({});
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [showWordWindow, setShowWordWindow] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(true);

    const onOpenModal = (type: string) => {
        setShowWordWindow(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setWord((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const updatedDraft = {
            ...word,
            ["id"]: wordList.length + 1,
            [name]: value.trim(),
        };
        setWord(updatedDraft);
        setItem(DRAFT_WORD_KEY, updatedDraft, "session");
    };

    const handleAddWord = () => {
        if (!isWordDataComplete(word)) return;

        wordList.push(word as LocalStorage);

        setItem(EXCEL_DATA_KEY, wordList, "local");
        setExcelData(wordList);
        setItem(TOTAL_WORDS_KEY, wordList.length, "local");

        removeItem(DRAFT_WORD_KEY, "session");
        setWord({});
        setShowWordWindow(false);
    };

    const handleReset = () => {
        removeItem(DRAFT_WORD_KEY, "session");
        setWord({});
    };

    useEffect(() => {
        const savedDraft = getItem("draft-word", "session");
        if (savedDraft) {
            setWord(savedDraft);
        }
    }, []);

    useEffect(() => {
        setIsComplete(isWordDataComplete(word));
    }, [word]);

    function isWordDataComplete(word: Partial<WordDraft>): word is WordDraft {
        return (
            Object.keys(word).length > 0 &&
            REQUIRED_WORD_FIELDS.every(
                (field) =>
                    typeof word[field] === "string" &&
                    word[field]?.trim() !== "",
            )
        );
    }

    return (
        <>
            <section className="new-word-box">
                <InputButton
                    label="Create new word"
                    selected={false}
                    additionalText="Upload the file again?"
                    buttonKey="my-file"
                    onSelect={onOpenModal}
                />

                {showWordWindow && (
                    <div className="main-form">
                        <div className="top-box">
                            <div className="view-example">
                                <WordCard row={word as LocalStorage} />
                            </div>
                            <h3 className="title">New word</h3>
                            <div className="group-buttons">
                                <button
                                    type="button"
                                    onClick={() => setShowWordWindow(false)}
                                    data-button-icon="close"
                                    className="close-window"
                                >
                                    <ShutdownIcon />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm((prev) => !prev)}
                                    data-button-icon
                                    className="hide-form"
                                >
                                    {showForm ? (
                                        <EyeCloseIcon className="eye-close" />
                                    ) : (
                                        <EyeOpenIcon className="eye-open" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {showForm && (
                            <div className="bottom-box">
                                <form className="inputs-box">
                                    <div className="inputs-row">
                                        <InputText
                                            inputKey="englishWord"
                                            label="English Word"
                                            value={word.englishWord || ""}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                        />
                                        <InputText
                                            inputKey="ukrainianWord"
                                            label="Ukrainian Word"
                                            value={word.ukrainianWord || ""}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="inputs-row">
                                        <InputText
                                            inputKey="partOfSpeech"
                                            label="Part of Speech"
                                            value={word.partOfSpeech || ""}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                        />
                                        <InputText
                                            inputKey="wordForms"
                                            label="Word Forms"
                                            value={word.wordForms || ""}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                        />
                                        <InputText
                                            inputKey="transcription"
                                            label="Transcription"
                                            value={word.transcription || ""}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="inputs-row">
                                        <InputText
                                            inputKey="affirmativeSentence"
                                            label="Affirmative Sentence"
                                            value={
                                                word.affirmativeSentence || ""
                                            }
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="inputs-row">
                                        <InputText
                                            inputKey="negativeSentence"
                                            label="Negative Sentence"
                                            value={word.negativeSentence || ""}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="inputs-row">
                                        <InputText
                                            inputKey="questionSentence"
                                            label="Question Sentence"
                                            value={word.questionSentence || ""}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="inputs-row">
                                        <InputText
                                            inputKey="imageUrl"
                                            label="Image"
                                            value={word.imageUrl || ""}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="inputs-row">
                                        <InputText
                                            inputKey="cambridgeUrl"
                                            label="Cambridge Link"
                                            value={word.cambridgeUrl || ""}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                        />
                                    </div>
                                </form>
                                <div className="group-buttons">
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        disabled={
                                            Object.keys(word).length === 0
                                        }
                                        data-button
                                        className="cancel"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddWord}
                                        disabled={!isComplete}
                                        data-button
                                        className="add-new-word"
                                    >
                                        add new word
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </>
    );
};

export default WordForm;
