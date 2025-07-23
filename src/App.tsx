import React, {useState, useEffect} from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import {ROUTES} from "@/routes";

import "@/assets/scss/config/index.scss";
import "@/assets/scss/global/index.scss";

import Home from "@/pages/Home";
import Dictionary from "@/pages/Dictionary";
import TwinQuest from "@/pages/TwinQuest";
import Settings from "@/pages/Settings";
import Header from "@/components/header";
import Footer from "@/components/footer";
import RouteWrapper from "@/components/RouteWrapper";

import {ContextSettingsProvider} from "@/context";

import type {LocalStorage} from "@/types";

import {getItem} from "@/helpers/persistance-storage";
const EXCEL_DATA = import.meta.env.VITE_EXCEL_DATA_KEY;

const App: React.FC = () => {
    const [excelData, setExcelData] = useState<LocalStorage[]>([]);

    useEffect(() => {
        const storedData = getItem(EXCEL_DATA);
        if (storedData) {
            setExcelData(storedData as LocalStorage[]);
        }
    }, []);

    return (
        <ContextSettingsProvider>
            <RouteWrapper>
                <Router basename="/">
                    <Header />
                    <>
                        <Routes>
                            <Route path={ROUTES.HOME} element={<Home />} />
                            <Route
                                path={ROUTES.DICTIONARY}
                                element={<Dictionary data={excelData} />}
                            />
                            <Route
                                path={ROUTES.GAMES.ROOT}
                                element={
                                    <TwinQuest localstorData={excelData} />
                                }
                            />
                            <Route
                                path={ROUTES.SETTINGS}
                                element={
                                    <Settings setExcelData={setExcelData} />
                                }
                            />
                        </Routes>
                    </>
                    <Footer />
                </Router>
            </RouteWrapper>
        </ContextSettingsProvider>
    );
};

export default App;
