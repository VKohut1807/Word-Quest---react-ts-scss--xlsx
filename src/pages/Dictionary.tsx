import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";

import "@/assets/scss/pages/dictionary-page/index.scss";

import WordCard from "@/components/dictionary/WordCard";
import ModalWindow from "@/components/ModalWindow";
import SwiperSlider from "@/components/swiper-slider";
import Pagination from "@/components/pagination";
import WordForm from "@/components/dictionary/WordForm";
import InputButton from "@/components/inputs/InputButton";

import {useItemsPerPage, useModalManager} from "@/context";

import type {
    DictionaryProps,
    ModalImageProps,
    FileUploader,
    LocalStorage,
} from "@/types";

import {getItem, setItem} from "@/helpers/persistance-storage";
import {EXCEL_DATA_KEY, TOTAL_WORDS_KEY} from "@/helpers/constants";

const Dictionary: React.FC<DictionaryProps & FileUploader> = ({
    data,
    setExcelData,
}) => {
    const {openModal} = useModalManager();

    const [selectedImg, setSelectedImg] = useState<ModalImageProps>();
    const handleShowPhoto = (row: ModalImageProps) => {
        setSelectedImg(row);
        openModal("photo-view");
    };

    const [isShowSwiper, setIsShowSwiper] = useState<boolean>(false);
    const [initialSlideIndex, setInitialSlideIndex] = useState<number>(0);
    const initSwiper = (id: number) => {
        setInitialSlideIndex(id);
        setIsShowSwiper(true);
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = parseInt(searchParams.get("page") || "1");
    const currentPage = isNaN(pageParam) ? 1 : pageParam;
    const handlePageChange = (page: number) => {
        setSearchParams({page: page.toString()});
    };

    const {itemsPerPage} = useItemsPerPage();
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentItems = data.slice(startIdx, startIdx + itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const [word, setWord] = useState<LocalStorage | null>(null);
    const [removedWord, setRemovedWord] = useState<LocalStorage | null>(null);
    const handleShowFormWord = (row: LocalStorage | null = null) => {
        setWord(row ?? null);
        openModal("form-word");
    };
    const handleFormClose = () => {
        if (word) {
            setWord(null);
        }
    };
    const handleRemoveWord = (row: LocalStorage) => {
        setRemovedWord(row);
        openModal("info-remove-form-word");
        const wordList: LocalStorage[] = getItem(EXCEL_DATA_KEY, "local") ?? [];
        const updatedList = wordList
            .filter((item: {id: number}) => item.id !== row.id)
            .map((item, index) => ({...item, id: index + 1}));

        setItem(EXCEL_DATA_KEY, updatedList, "local");
        setItem(TOTAL_WORDS_KEY, updatedList.length, "local");
        setExcelData(updatedList);
    };

    return (
        <>
            {isShowSwiper && (
                <SwiperSlider
                    data={data}
                    initialSlide={initialSlideIndex}
                    setIsShowSwiper={setIsShowSwiper}
                />
            )}

            <ModalWindow
                modalKey="photo-view"
                title={
                    selectedImg?.englishWord +
                    " - " +
                    selectedImg?.ukrainianWord
                }
            >
                {selectedImg && (
                    <div className="modal-image-box">
                        <img
                            data-number={selectedImg.id}
                            src={selectedImg.imageUrl}
                            alt={selectedImg.englishWord}
                        />
                    </div>
                )}
            </ModalWindow>

            {currentItems.length > 0 ? (
                <>
                    <div className="container">
                        <InputButton
                            label="Create new word"
                            variant="primary"
                            selected={false}
                            buttonKey="new-file"
                            onSelect={() => openModal("form-word")}
                            classesName="add-new-word"
                        />

                        <ModalWindow
                            title={word ? "Edit word" : "New word"}
                            modalKey="form-word"
                            onCloseModalOption={handleFormClose}
                        >
                            <WordForm
                                setExcelData={setExcelData}
                                editId={word?.id}
                                onClose={handleFormClose}
                            />
                        </ModalWindow>

                        <ModalWindow
                            modalKey="info-remove-form-word"
                            title="Remove word"
                        >
                            <h4>
                                Your word - "{removedWord?.englishWord}" has
                                been removed
                            </h4>
                        </ModalWindow>

                        {totalPages > 5 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}

                        <ul className="body">
                            {currentItems?.map((row, idx) => (
                                <li key={idx} className="element-word-card">
                                    <WordCard
                                        row={row}
                                        onImageClick={handleShowPhoto}
                                        onSlideClick={initSwiper}
                                    />
                                    <div className="option-word-card">
                                        <div className="option-container"></div>
                                        <div className="dropdown-container">
                                            <div className="hide-container">
                                                <div className="box">
                                                    <InputButton
                                                        label="Edit word"
                                                        selected={false}
                                                        variant="tertiary"
                                                        buttonKey="edit-word"
                                                        onSelect={() =>
                                                            handleShowFormWord(
                                                                row,
                                                            )
                                                        }
                                                    />
                                                    <InputButton
                                                        label="Remove word"
                                                        selected={false}
                                                        variant="tertiary"
                                                        buttonKey="remove-word"
                                                        onSelect={() =>
                                                            handleRemoveWord(
                                                                row,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                otherClasses={"bottom"}
                            />
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h2>Oops...</h2>
                    <p>Data not found.</p>
                </>
            )}
        </>
    );
};

export default Dictionary;
