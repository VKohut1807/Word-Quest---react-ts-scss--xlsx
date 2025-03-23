import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ROUTES} from "@/routes";

import "@/assets/scss/config/index.scss";
import "@/assets/scss/global/index.scss";

import type {LocalStorage} from "@/types/dictionary-types";

import Home from "@/pages/Home";
import FileUploader from "@/pages/FileUploader";
import Dictionary from "@/pages/Dictionary";
import Novbar from "@/components/Novbar";
import UpButton from "@/components/UpButton";
import RouteWrapper from "@/components/RouteWrapper";

import {getItem} from "@/helpers/persistanceStorage";

const App: React.FC = () => {
    const [excelData, setExcelData] = useState<LocalStorage[]>([]);

    useEffect(() => {
        const storedData = getItem("excelData");
        if (storedData) {
            setExcelData(storedData as LocalStorage[]);
        }
    }, []);

    return (
        <Router>
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
                        path={ROUTES.UPLOAD}
                        element={
                            <RouteWrapper>
                                <FileUploader setExcelData={setExcelData} />
                            </RouteWrapper>
                        }
                    />
                </Routes>
            </>
        </Router>
    );
};

export default App;
