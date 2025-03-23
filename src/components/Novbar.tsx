import React from "react";
import {Link, useLocation} from "react-router-dom";
import {ROUTES} from "@/routes";

import "@/assets/scss/components/novbar.scss";

import HomeIcon from "@/assets/icons/home.svg?react";
import BookIcon from "@/assets/icons/book.svg?react";
import ClipIcon from "@/assets/icons/clip.svg?react";
import logo from "@/assets/images/logo-transformed.webp";

const Novbar: React.FC = () => {
    const location = useLocation();
    return (
        <nav className="navbar">
            <ul className="pages">
                <li className="page left">
                    <Link to={ROUTES.HOME} className="logo">
                        <img src={logo} alt="logo" />
                        <div className="wordquest">
                            <span className="letter letter-1">W</span>
                            <span className="letter letter-2">o</span>
                            <span className="letter letter-3">r</span>
                            <span className="letter letter-4">d</span>
                            <span className="letter letter-5">Q</span>
                            <span className="letter letter-6">u</span>
                            <span className="letter letter-7">e</span>
                            <span className="letter letter-8">s</span>
                            <span className="letter letter-9">t</span>
                        </div>
                    </Link>
                </li>
                <li className="page">
                    <Link
                        to={ROUTES.HOME}
                        className={`page-box ${
                            location.pathname === ROUTES.HOME
                                ? "active-link"
                                : ""
                        }`}
                    >
                        <span className="icon-box">
                            <HomeIcon />
                        </span>
                        Home
                    </Link>
                </li>
                <li className="page">
                    <Link
                        to={ROUTES.DICTIONARY}
                        className={`page-box ${
                            location.pathname === ROUTES.DICTIONARY
                                ? "active-link"
                                : ""
                        }`}
                    >
                        <span className="icon-box">
                            <BookIcon />
                        </span>
                        Dictionary
                    </Link>
                </li>
                <li className="page">
                    <Link
                        to={ROUTES.UPLOAD}
                        className={`page-box ${
                            location.pathname === ROUTES.UPLOAD
                                ? "active-link"
                                : ""
                        }`}
                    >
                        <span className="icon-box">
                            <ClipIcon />
                        </span>
                        Upload file
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Novbar;
