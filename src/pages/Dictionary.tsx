import React, {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import "@/assets/scss/pages/dictionary-page/index.scss";

import type {DictionaryProps, ModalImageProps} from "@/types";

import DictionaryRow from "@/components/dictionary/DictionaryRow";
import ModalWindow from "@/components/ModalWindow";
import SwiperSlider from "@/components/swiper-slider";
import Pagination from "@/components/pagination";

import {useItemsPerPage} from "@/context";

const Dictionary: React.FC<DictionaryProps> = ({data}) => {
    const [selectedImg, setSelectedImg] = useState<ModalImageProps>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = (row: ModalImageProps) => {
        setSelectedImg(row);
        setIsModalOpen(true);
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

    return (
        <>
            {isShowSwiper && (
                <SwiperSlider
                    data={data}
                    initialSlide={initialSlideIndex}
                    setIsShowSwiper={setIsShowSwiper}
                />
            )}

            {isModalOpen && (
                <ModalWindow setOpenModal={setIsModalOpen}>
                    {selectedImg && (
                        <img
                            data-number={selectedImg.id}
                            src={selectedImg.imageUrl}
                            alt={selectedImg.englishWord}
                        />
                    )}
                </ModalWindow>
            )}

            {currentItems.length > 0 ? (
                <div className="container">
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}

                    <ul className="body">
                        {currentItems.map((row, idx) => (
                            <DictionaryRow
                                key={idx}
                                row={row}
                                onImageClick={openModal}
                                onSlideClick={initSwiper}
                            />
                        ))}
                    </ul>

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
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
