import React, {useState, useEffect} from "react";
import {getRndInteger, shuffleArray} from "@/helpers/randoms";

import "@/assets/scss/pages/twin-quest.scss";

import type {LocalStorage, TwinQuestProps, PartOfSpeech} from "@/types";

const TwinQuest: React.FC<TwinQuestProps> = ({localstorData}) => {
    // for now
    const partTranslation = {
        noun: "іменник",
        idiom: "ідіома",
        phrase: "фраза",
        verb: "дієслово",
        adjective: "прикметник",
        adverb: "прислівник",
    };

    const gameSettings = {
        countBoxes: 14,
        frontImg:
            "https://img.freepik.com/premium-photo/white-blue-color-cube-boxes-wall-sphere-dome-background_25920-59.jpg?ga=GA1.1.252512678.1731170037&semt=ais_hybrid",
    };

    const [randomItems, setRandomItems] = useState<LocalStorage[]>([]);
    const [activeIds, setActiveIds] = useState<string[]>([]);
    const [hiddenIds, setHiddenIds] = useState<string[]>([]);
    const [isWin, setIsWin] = useState<boolean>(false);
    const [canClick, setCanClick] = useState<boolean>(true);
    const [countdown, setCountdown] = useState<number>(0.0);
    const [shuffledCards, setShuffledCards] = useState<
        {id: number; type: "eng" | "ukr"; item: LocalStorage}[]
    >([]);

    const translatePartOfSpeech = (part: PartOfSpeech): string => {
        return partTranslation[part] || part;
    };

    const handleClick = (id: number, type: "eng" | "ukr") => {
        if (!canClick) return;
        setCanClick(false);
        let newActiveIds = [...activeIds];
        const uniqueId: string = `${type}-${id}`;

        if (newActiveIds.includes(uniqueId)) {
            newActiveIds = newActiveIds.filter((item) => item !== uniqueId);
        } else {
            newActiveIds.push(uniqueId);
            if (newActiveIds.length > 2) {
                newActiveIds = [uniqueId];
            }
        }

        setActiveIds(newActiveIds);
        setCountdown(1500);

        setTimeout(() => {
            setCanClick(true);
        }, 1250);
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 100) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevCountdown - 100;
                });
            }, 100);

            return () => clearInterval(timer);
        }
    }, [countdown]);

    useEffect(() => {
        const generateUniqueRandomNumbers = (
            count: number,
            min: number,
            max: number,
        ): number[] => {
            const uniqueNumbers: Set<number> = new Set();
            while (uniqueNumbers.size < count) {
                uniqueNumbers.add(getRndInteger(min, max));
            }
            return Array.from(uniqueNumbers);
        };

        if (localstorData.length > 0) {
            const numbers = generateUniqueRandomNumbers(
                gameSettings.countBoxes,
                0,
                localstorData.length - 1,
            );

            const selectedItems = numbers.map((num) => localstorData[num]);

            setRandomItems(selectedItems);
        }
    }, [localstorData.length]);

    useEffect(() => {
        if (randomItems.length > 0) {
            const allCards: {
                id: number;
                type: "eng" | "ukr";
                item: LocalStorage;
            }[] = randomItems.flatMap((item) => [
                {id: item.id, type: "eng" as const, item},
                {id: item.id, type: "ukr" as const, item},
            ]);

            setShuffledCards(shuffleArray(allCards));
        }
    }, [randomItems]);

    useEffect(() => {
        if (activeIds.length === 2) {
            const [first, second] = activeIds;
            const engWordId = first.split("-")[1];
            const ukrWordId = second.split("-")[1];

            if (engWordId === ukrWordId) {
                setTimeout(() => {
                    setHiddenIds((prev) => [...prev, engWordId, ukrWordId]);
                    setActiveIds([]);
                }, 2000);
            }
        }
    }, [activeIds]);

    useEffect(() => {
        if (hiddenIds.length >= gameSettings.countBoxes * 2) {
            setTimeout(() => {
                setIsWin(true);
            }, 2500);
        }
    }, [hiddenIds]);

    return (
        <section className="twin-quest">
            <header>
                <h1>Twin Quest</h1>
                {!canClick && countdown >= 0 && (
                    <div className="timer">
                        <h3>
                            Wait: <span>{(countdown / 1000).toFixed(1)}s</span>
                        </h3>
                    </div>
                )}
            </header>
            <main>
                {!isWin ? (
                    <div className="gallery">
                        {shuffledCards.map(({id, type, item}, idx) => (
                            <div
                                onClick={() => handleClick(id, type)}
                                key={`${type}-${id}`}
                                className={`card-box ${activeIds.includes(`${type}-${id}`) ? "active" : ""} ${hiddenIds.includes(String(id)) ? "hidden" : ""}`}
                            >
                                <div className="card front">
                                    <img
                                        src={gameSettings.frontImg}
                                        alt="image"
                                    />
                                </div>
                                <div className="card back">
                                    <img
                                        src={item["imageUrl"]}
                                        alt={item["englishWord"]}
                                    />
                                    <div className="backdrop"></div>
                                    <div className="text">
                                        <h4>
                                            {type === "eng"
                                                ? item["englishWord"]
                                                : item["ukrainianWord"]}
                                        </h4>
                                        <u>
                                            {type === "eng"
                                                ? item["partOfSpeech"]
                                                : translatePartOfSpeech(
                                                      item[
                                                          "partOfSpeech"
                                                      ] as PartOfSpeech,
                                                  )}
                                        </u>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="win">YOU WIN</div>
                )}
            </main>
        </section>
    );
};

export default TwinQuest;
