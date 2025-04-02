import React, {useState, useEffect} from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import {ROUTES} from "@/routes";

import "@/assets/scss/config/index.scss";
import "@/assets/scss/global/index.scss";

import type {LocalStorage} from "@/types/dictionary-types";

import Home from "@/pages/Home";
import Dictionary from "@/pages/Dictionary";
import TwinQuest from "@/pages/TwinQuest";
import Settings from "@/pages/Settings";
import Novbar from "@/components/Novbar";
import UpButton from "@/components/UpButton";
import RouteWrapper from "@/components/RouteWrapper";

import {getItem} from "@/helpers/persistance-storage";

const App: React.FC = () => {
    const [excelData, setExcelData] = useState<LocalStorage[]>([]);

    useEffect(() => {
        const storedData = getItem("excelData");
        if (storedData) {
            setExcelData(storedData as LocalStorage[]);
        }
    }, []);

    return (
        <Router basename="/">
            <>
                <Novbar />
                <UpButton />

                <Routes>
                    <Route
                        path={ROUTES.HOME}
                        element={
                            <RouteWrapper>
                                <Home />
                            </RouteWrapper>
                        }
                    />
                    <Route
                        path={ROUTES.DICTIONARY}
                        element={
                            <RouteWrapper>
                                <Dictionary data={excelData} />
                            </RouteWrapper>
                        }
                    />
                    <Route
                        path={ROUTES.GAMES.ROOT}
                        element={
                            <RouteWrapper>
                                <TwinQuest localstorData={excelData} />
                            </RouteWrapper>
                        }
                    />
                    <Route
                        path={ROUTES.SETTINGS}
                        element={
                            <RouteWrapper>
                                <Settings setExcelData={setExcelData} />
                            </RouteWrapper>
                        }
                    />
                </Routes>
            </>
        </Router>
    );
};

export default App;
