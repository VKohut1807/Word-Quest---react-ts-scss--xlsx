import React, {useState, useEffect} from "react";

import "@/assets/scss/components/flip-card.scss";

import Novbar from "@/components/header/Novbar";
import UpButton from "@/components/header/UpButton";

const Header: React.FC = () => {
    return (
        <>
            <Novbar />
            <UpButton />
        </>
    );
};

export default Header;
