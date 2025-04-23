import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCards, Pagination, Navigation, Autoplay} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "@/assets/scss/components/swiper-slider.scss";

import type {DictionaryProps} from "@/types/dictionary-types";
import type {SwiperRef} from "swiper/react";

import InputButton from "@/components/inputs/InputButton";

import ProgressIcon from "@/assets/icons/progress.svg?react";
import ShutdownIcon from "@/assets/icons/shutdown.svg?react";
import StopButtonIcon from "@/assets/icons/stop-button.svg?react";
import PlayButtonIcon from "@/assets/icons/play-button.svg?react";

const SwiperSlider: React.FC<
    DictionaryProps & {
        initialSlide: number;
        setIsShowSwiper: React.Dispatch<React.SetStateAction<boolean>>;
    }
> = ({data, initialSlide, setIsShowSwiper}) => {
    const [visibleSlides, setVisibleSlides] = useState(
        data.slice(initialSlide > 2 ? initialSlide - 3 : 0, initialSlide + 3),
    );
    const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
    const [swiperDelay, setSwiperDelay] = useState<number>(7000);
    const progressCircle = useRef<SVGSVGElement>(null);
    const progressContent = useRef<HTMLSpanElement>(null);
    const swiperInstance = useRef<SwiperRef>(null);

    const closeModal = () => {
        setIsShowSwiper(false);
    };

    const handleReachEnd = () => {
        setVisibleSlides((prev) => {
            const next = data.slice(prev.length, prev.length + 3);
            return [...prev, ...next];
        });
    };

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

    useEffect(() => {
        setVisibleSlides(
            data.slice(
                initialSlide > 2 ? initialSlide - 3 : 0,
                initialSlide + 3,
            ),
        );
    }, [data]);

    return (
        <>
            <div className="bg-swiper"></div>
            <Swiper
                ref={swiperInstance}
                modules={[EffectCards, Pagination, Navigation, Autoplay]}
                effect={"cards"}
                initialSlide={initialSlide > 2 ? 2 : initialSlide == 1 ? 0 : 1}
                grabCursor={true}
                pagination={{
                    dynamicBullets: true,
                }}
                navigation={true}
                slidesPerView={1}
                lazyPreloadPrevNext={2}
                onReachEnd={handleReachEnd}
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
            >
                {visibleSlides?.map((row, idx) => (
                    <SwiperSlide key={idx} data-swiper-autoplay={swiperDelay}>
                        <div className="slide-box">
                            <div className="left-box">
                                <div className="transcription-box">
                                    <span className="bracket">[</span>

                                    <div className="transcription">
                                        {row["transcription"]
                                            .split(" ")
                                            .map((word, index) => (
                                                <span key={index}>{word} </span>
                                            ))}
                                    </div>
                                    <span className="bracket">]</span>
                                </div>
                                <u>{row.partOfSpeech}</u>
                                <h3>{row.englishWord}</h3>
                                <h4>{row.ukrainianWord}</h4>
                            </div>
                            <div className="right-box">
                                <div className="image-box">
                                    <img
                                        src={row.imageUrl}
                                        loading="lazy"
                                        alt={row.englishWord}
                                        className="image"
                                    />
                                </div>
                            </div>
                        </div>
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
