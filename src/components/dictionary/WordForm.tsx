import React, {useState, useEffect} from "react";

import "@/assets/scss/components/word-form.scss";

import WordCard from "@/components/dictionary/WordCard";
import InputText from "@/components/inputs/InputText";
import InputButton from "@/components/inputs/InputButton";
import ModalWindow from "@/components/ModalWindow";

import EyeOpenIcon from "@/assets/icons/eye-open.svg?react";
import EyeCloseIcon from "@/assets/icons/eye-close.svg?react";
import ScrollIcon from "@/assets/icons/scroll.svg?react";

import {useModalManager} from "@/context";

import type {LocalStorage, WordDraft, WordFormProps} from "@/types";

import {getItem, setItem, removeItem} from "@/helpers/persistance-storage";
import {
    EXCEL_DATA_KEY,
    TOTAL_WORDS_KEY,
    DRAFT_WORD_KEY,
    REQUIRED_WORD_FIELDS,
} from "@/helpers/constants";

const WordForm: React.FC<WordFormProps> = ({
    editId = null,
    setExcelData,
    onClose,
}) => {
    const {openModal, closeModal} = useModalManager();

    const isEdit = typeof editId === "number" && !isNaN(editId);
    const wordList: LocalStorage[] = getItem(EXCEL_DATA_KEY, "local") ?? [];

    const [showInputsBox, setShowInputsBox] = useState<boolean>(true);
    const [word, setWord] = useState<Partial<WordDraft>>({});
    const [isComplete, setIsComplete] = useState<boolean>(false);

    const onShowInputsBox = () => {
        setShowInputsBox((prev) => !prev);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setWord((prev) => ({
            ...prev,
            [name]: value.trim(),
        }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const updatedDraft = {
            ...word,
            ["id"]: isEdit ? editId : wordList.length + 1,
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

        openModal("info-form-word");
        removeItem(DRAFT_WORD_KEY, "session");
    };

    const handleReset = () => {
        removeItem(DRAFT_WORD_KEY, "session");
        setWord({});
    };

    const handleEditWord = () => {
        if (!isWordDataComplete(word)) return;

        const updatedList = wordList.map((item) =>
            item.id === editId ? {...item, ...word} : item,
        );

        setItem(EXCEL_DATA_KEY, updatedList, "local");
        setExcelData(updatedList);
        setItem(TOTAL_WORDS_KEY, updatedList.length, "local");

        openModal("info-form-word");
    };

    const handleCloseModalOption = () => {
        if (isEdit) {
            removeItem(DRAFT_WORD_KEY, "session");
            onClose();
            closeModal("form-word");
        } else {
            setWord({});
        }
    };

    useEffect(() => {
        const existingWord = wordList.find((w) => w.id === editId);
        setWord(existingWord ?? {});
    }, [editId]);

    useEffect(() => {
        setIsComplete(isWordDataComplete(word));
    }, [word]);

    useEffect(() => {
        const bg = document.querySelector<HTMLElement>(
            "[data-background-window]",
        );
        if (!bg) return;

        bg.style.display = showInputsBox ? "block" : "none";
    }, [showInputsBox]);

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
            <ModalWindow
                modalKey="info-form-word"
                title={isEdit ? "Edit word" : "New word"}
                onCloseModalOption={handleCloseModalOption}
            >
                <h4>
                    Your word - "{word.englishWord}" has been successfully{" "}
                    {isEdit ? "updated" : "added"}
                </h4>
            </ModalWindow>

            <section className="word-form">
                <div className="top-box">
                    <div className="view-example">
                        <WordCard row={word as LocalStorage} />
                    </div>
                    <InputButton
                        label={
                            showInputsBox ? (
                                <EyeCloseIcon className="eye-close" />
                            ) : (
                                <EyeOpenIcon className="eye-open" />
                            )
                        }
                        variant="secondary"
                        selected={false}
                        buttonKey="eye-form"
                        onSelect={onShowInputsBox}
                    />
                </div>

                <div
                    className={`bottom-box ${showInputsBox ? "show-inputs" : ""}`}
                >
                    <form className="form">
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
                                value={word.affirmativeSentence || ""}
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
                        <div className="group-buttons">
                            <InputButton
                                label="Reset"
                                selected={false}
                                buttonKey="cancel-form"
                                disabledes={Object.keys(word).length === 0}
                                onSelect={handleReset}
                            />
                            <InputButton
                                label={isEdit ? "Save changes" : "Add new word"}
                                selected={false}
                                buttonKey="add-new-word"
                                disabledes={!isComplete}
                                onSelect={
                                    isEdit ? handleEditWord : handleAddWord
                                }
                            />
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default WordForm;
