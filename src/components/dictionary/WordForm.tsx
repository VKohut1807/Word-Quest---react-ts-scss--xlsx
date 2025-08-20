import React, {useState, useEffect, useMemo} from "react";

import "@/assets/scss/components/word-form.scss";

import WordCard from "@/components/dictionary/WordCard";
import InputText from "@/components/inputs/InputText";
import InputButton from "@/components/inputs/InputButton";

import ShutdownIcon from "@/assets/icons/shutdown.svg?react";
import EyeOpenIcon from "@/assets/icons/eye-open.svg?react";
import EyeCloseIcon from "@/assets/icons/eye-close.svg?react";
import ScrollIcon from "@/assets/icons/scroll.svg?react";

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

    const onCloseModal = (type: string) => {
        setShowWordWindow(false);
    };

    const onShowForm = (type: string) => {
        setShowForm((prev) => !prev);
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

    useEffect(() => {
        if (showWordWindow && showForm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [showWordWindow, showForm]);

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
                    buttonKey="new-file"
                    onSelect={onOpenModal}
                />

                {showWordWindow && showForm && (
                    <div className="background"></div>
                )}
                {showWordWindow && (
                    <div className="main-form">
                        <div className="top-box">
                            <div className="view-example">
                                <WordCard row={word as LocalStorage} />
                            </div>
                            <h3 className="title">New word</h3>
                            <div className="group-buttons">
                                <InputButton
                                    label={<ShutdownIcon />}
                                    variant="secondary"
                                    selected={false}
                                    buttonKey="close-window"
                                    classesName="close-window"
                                    onSelect={onCloseModal}
                                />
                                <InputButton
                                    label={
                                        showForm ? (
                                            <EyeCloseIcon className="eye-close" />
                                        ) : (
                                            <EyeOpenIcon className="eye-open" />
                                        )
                                    }
                                    variant="secondary"
                                    selected={false}
                                    buttonKey="eye-form"
                                    onSelect={onShowForm}
                                />
                            </div>
                        </div>
                        {showForm && (
                            <div className="bottom-box">
                                <form className="inputs-box">
                                    <ScrollIcon className="patrol-scroll" />
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
                                    <InputButton
                                        label="Reset"
                                        selected={false}
                                        buttonKey="cancel-form"
                                        disabledes={
                                            Object.keys(word).length === 0
                                        }
                                        onSelect={handleReset}
                                    />
                                    <InputButton
                                        label="Add new word"
                                        selected={false}
                                        buttonKey="add-new-word"
                                        disabledes={!isComplete}
                                        onSelect={handleAddWord}
                                    />
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
