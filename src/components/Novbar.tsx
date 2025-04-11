import React from "react";
import {Link, useLocation} from "react-router-dom";
import {ROUTES} from "@/routes";

import "@/assets/scss/components/novbar.scss";

import HomeIcon from "@/assets/icons/home.svg?react";
import BookIcon from "@/assets/icons/book.svg?react";
import GameIcon from "@/assets/icons/game.svg?react";
import SlidersIcon from "@/assets/icons/sliders.svg?react";
import logo from "@/assets/images/logo-transformed.webp";

const Novbar: React.FC = () => {
    const location = useLocation();
    return (
        <nav className="navbar">
            <div className="wrapper margin-sero">
                <div className="navbar-box">
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
                    <ul className="pages">
                        <li className="page">
                            <Link
                                to={ROUTES.HOME}
                                className={`page-box ${
                                    location.pathname === ROUTES.HOME
                                        ? "active-link"
                                        : ""
                                }`}
                            >
                                <div className="icon-box">
                                    <HomeIcon />
                                </div>
                                <div className="name">
                                    <span className="text">Home</span>
                                </div>
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
                                <div className="icon-box">
                                    <BookIcon />
                                </div>
                                <div className="name">
                                    <span className="text">Dictionary</span>
                                </div>
                            </Link>
                        </li>
                        <li className="page">
                            <Link
                                to={ROUTES.GAMES.ROOT}
                                className={`page-box ${
                                    location.pathname === ROUTES.GAMES.ROOT
                                        ? "active-link"
                                        : ""
                                }`}
                            >
                                <div className="icon-box">
                                    <GameIcon />
                                </div>
                                <div className="name">
                                    <span className="text">Games</span>
                                </div>
                            </Link>
                        </li>
                        <li className="page">
                            <Link
                                to={ROUTES.SETTINGS}
                                className={`page-box ${
                                    location.pathname === ROUTES.SETTINGS
                                        ? "active-link"
                                        : ""
                                }`}
                            >
                                <div className="icon-box">
                                    <SlidersIcon />
                                </div>
                                <div className="name">
                                    <span className="text">Settings</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Novbar;
