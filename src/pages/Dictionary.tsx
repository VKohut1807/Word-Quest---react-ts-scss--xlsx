import React, {useState} from "react";

import "@/assets/scss/pages/dictionary-page/index.scss";

import type {DictionaryProps, ModalImageProps} from "@/types/dictionary-types";

import DictionaryRow from "@/components/dictionary/DictionaryRow";
import ModalWindow from "@/components/ModalWindow";
import SwiperSlider from "@/components/swiperSlider";

const Dictionary: React.FC<DictionaryProps> = ({data}) => {
    const [selectedImg, setSelectedImg] = useState<ModalImageProps>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isShowSwiper, setIsShowSwiper] = useState<boolean>(false);
    const [initialSlideIndex, setInitialSlideIndex] = useState<number>(0);

    const openModal = (row: ModalImageProps) => {
        setSelectedImg(row);
        setIsModalOpen(true);
    };

    const initSwiper = (id: number) => {
        setInitialSlideIndex(id);
        setIsShowSwiper(true);
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

            <ModalWindow openModal={isModalOpen} setOpenModal={setIsModalOpen}>
                {selectedImg && (
                    <img
                        data-number={selectedImg.id}
                        src={selectedImg.imageUrl}
                        alt={selectedImg.englishWord}
                    />
                )}
            </ModalWindow>

            {data.length > 0 ? (
                <div className="container">
                    <ul className="body">
                        {data.map((row, idx) => (
                            <DictionaryRow
                                key={idx}
                                row={row}
                                onImageClick={openModal}
                                onSlideClick={initSwiper}
                            />
                        ))}
                    </ul>
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
