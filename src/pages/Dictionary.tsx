import React, {useState} from "react";

import "@/assets/scss/pages/dictionary-page/index.scss";

import type {
    DictionaryProps,
    LocalStorage,
    ModalImageProps,
} from "@/types/dictionary-types";

import DictionaryRow from "@/components/dictionary/DictionaryRow";
import ModalWindow from "@/components/ModalWindow";

const Dictionary: React.FC<DictionaryProps> = ({data}) => {
    const [selectedImg, setSelectedImg] = useState<ModalImageProps>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (row: ModalImageProps) => {
        setSelectedImg(row);
        setIsModalOpen(true);
    };

    return (
        <>
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
