import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCards, Pagination, Navigation, Autoplay} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "@/assets/scss/components/swiper-slider.scss";

import type {
    DictionaryProps,
    LocalStorage,
    SwiperProps,
} from "@/types/dictionary-types";
import type {SwiperRef} from "swiper/react";

import InputButton from "@/components/inputs/InputButton";
import FlipCard from "@/components/FlipCard";

import ProgressIcon from "@/assets/icons/progress.svg?react";
import ShutdownIcon from "@/assets/icons/shutdown.svg?react";
import StopButtonIcon from "@/assets/icons/stop-button.svg?react";
import PlayButtonIcon from "@/assets/icons/play-button.svg?react";
import InfoIcon from "@/assets/icons/info.svg?react";

const SwiperSlider: React.FC<SwiperProps> = ({
    data,
    initialSlide,
    setIsShowSwiper,
}) => {
    const closeModal = () => {
        setIsShowSwiper(false);
    };

    const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
    const [swiperDelay, setSwiperDelay] = useState<number>(7000);
    const progressCircle = useRef<SVGSVGElement>(null);
    const progressContent = useRef<HTMLSpanElement>(null);
    const swiperInstance = useRef<SwiperRef>(null);
    const onAutoplayTimeLeft = (
        swiper: object,
        time: number,
        progress: number,
    ) => {
        if (progressCircle.current) {
            progressCircle.current.style.setProperty(
                "--progress",
                `${1 - progress}`,
            );
        }

        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };
    const toggleAutoplay = () => {
        if (swiperInstance.current) {
            const swiper = swiperInstance.current.swiper;

            if (isAutoplay) {
                swiper.autoplay.stop();
            } else {
                swiper.autoplay.start();
            }
            setIsAutoplay(!isAutoplay);
        }
    };

    const [visibleSlides, setVisibleSlides] = useState<LocalStorage[]>(
        data.slice(initialSlide > 3 ? initialSlide - 4 : 0, initialSlide + 3),
    );
    const [pendingSlideShift, setPendingSlideShift] = useState<number | null>(
        null,
    );
    const loadMoreSlides = (direction: "next" | "prev") => {
        if (direction === "next") {
            const lastId = visibleSlides[visibleSlides.length - 1]?.id ?? 0;
            const nextSlides = data
                .filter((item) => item.id > lastId)
                .slice(0, 3);

            if (nextSlides.length > 0) {
                setVisibleSlides((prev) => [...prev, ...nextSlides]);
            }
        } else if (direction === "prev") {
            const firstId = visibleSlides[0]?.id ?? 0;
            const prevSlides = data
                .filter((item) => item.id < firstId)
                .slice(-3);

            if (prevSlides.length > 0 && swiperInstance.current) {
                const swiper = swiperInstance.current.swiper;
                const currentIndex = swiper.activeIndex;

                setVisibleSlides((prev) => {
                    setPendingSlideShift(currentIndex + prevSlides.length);
                    return [...prevSlides, ...prev];
                });
            }
        }
    };
    useEffect(() => {
        if (pendingSlideShift !== null && swiperInstance.current) {
            swiperInstance.current.swiper.slideTo(pendingSlideShift - 1, 0);
            setPendingSlideShift(null);
        }
    }, [pendingSlideShift]);

    return (
        <>
            <div className="bg-swiper"></div>
            <Swiper
                ref={swiperInstance}
                modules={[EffectCards, Pagination, Navigation, Autoplay]}
                effect={"cards"}
                grabCursor={true}
                pagination={{
                    dynamicBullets: true,
                }}
                navigation={true}
                slidesPerView={1}
                autoplay={
                    isAutoplay
                        ? {
                              delay: Number(swiperDelay),
                              disableOnInteraction: false,
                          }
                        : false
                }
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
                initialSlide={initialSlide > 3 ? 3 : initialSlide - 1}
                onReachEnd={() => loadMoreSlides("next")}
                onReachBeginning={() => loadMoreSlides("prev")}
            >
                {visibleSlides.map((row, idx) => (
                    <SwiperSlide
                        key={idx}
                        data-swiper-autoplay={swiperDelay}
                        className={String(row.id)}
                    >
                        <FlipCard
                            front={
                                <>
                                    <div className="slide-box">
                                        <div className="left-box">
                                            <div className="idx">{row.id}</div>
                                            <div className="transcription-box">
                                                <span className="bracket">
                                                    [
                                                </span>

                                                <div className="transcription">
                                                    {row["transcription"]
                                                        .split(" ")
                                                        .map((word, index) => (
                                                            <span key={index}>
                                                                {word}{" "}
                                                            </span>
                                                        ))}
                                                </div>
                                                <span className="bracket">
                                                    ]
                                                </span>
                                            </div>
                                            <u>{row.partOfSpeech}</u>
                                            <h3>{row.englishWord}</h3>
                                            <h4>{row.ukrainianWord}</h4>
                                        </div>
                                        <div className="right-box">
                                            <div className="image-box">
                                                <img
                                                    className="swiper-lazy image"
                                                    src={row.imageUrl}
                                                    alt={row.englishWord}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                            back={
                                <>
                                    <div className="back-slide-box">
                                        <div className="title">
                                            <h3>{row.englishWord}</h3>
                                            <u>{row.partOfSpeech}</u>
                                            <u className="form">
                                                {row.wordForms !== "-" &&
                                                    row.wordForms}
                                            </u>
                                            <div data-tooltip>
                                                <InfoIcon />
                                                <div className="tooltip-info">
                                                    <div className="colors">
                                                        <div className="color-box">
                                                            <span className="color affirmative-sentance"></span>
                                                            -&nbsp;affirmative
                                                            sentence
                                                        </div>
                                                        <div className="color-box">
                                                            <span className="color negative-sentance"></span>
                                                            -&nbsp;negative
                                                            sentence
                                                        </div>
                                                        <div className="color-box">
                                                            <span className="color question-sentance"></span>
                                                            -&nbsp;question
                                                            sentence
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="sentences">
                                            <li className="sentance affirmative-sentance gradient">
                                                {row.affirmativeSentence}
                                            </li>
                                            <li className="sentance negative-sentance gradient ">
                                                {row.negativeSentence}
                                            </li>
                                            <li className="sentance question-sentance gradient">
                                                {row.questionSentence}
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            }
                        />
                    </SwiperSlide>
                ))}

                {isAutoplay && (
                    <div className="autoplay-progress">
                        <ProgressIcon ref={progressCircle} />
                        <span ref={progressContent}></span>
                    </div>
                )}

                <InputButton
                    secondaryButton={true}
                    buttonKey="swiper-autoplay"
                    selected={false}
                    additionalText=""
                    label={isAutoplay ? <StopButtonIcon /> : <PlayButtonIcon />}
                    onSelect={toggleAutoplay}
                    classesName="swiper-autoplay"
                />

                <ShutdownIcon className="close-icon" onClick={closeModal} />
            </Swiper>
        </>
    );
};

export default SwiperSlider;
