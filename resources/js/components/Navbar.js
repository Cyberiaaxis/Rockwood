import React, { useState, Fragment } from "react";
// import { Link } from 'react-router-dom';
import logo from "../images/logo.svg";
// import logo from "../images/pulse.gif";
import "../styles/Navbar.scss";
import Model from "./Model";
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Forums from "./Forums";

export default function Navbar() {
    const [homeModal, setHomeModal] = useState(false);
    const [aboutModal, setAboutModal] = useState(false);
    const [contactModal, setContactModal] = useState(false);
    const [forumsModal, setForumsModal] = useState(false);

    return (
        <Fragment>
            <div className="navbar bg-transparent fixed-top">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <ul className="menu">
                    <li>
                        <div>
                        <span
                            className="nav-link"
                            onClick={() => {
                                setHomeModal(true);
                                setAboutModal(false);
                                setContactModal(false);
                                setForumsModal(false);
                            }}
                        >
                            Home
                        </span>
                        </div>
                    </li>
                    <li>
                        <span
                            className="nav-link"
                            onClick={() => {
                                setAboutModal(true);
                                setHomeModal(false);
                                setContactModal(false);
                                setForumsModal(false);
                            }}
                        >
                            About Us
                        </span>
                    </li>
                    <li>
                        <span
                            className="nav-link"
                            onClick={() => {
                                setContactModal(true);
                                setHomeModal(false);
                                setAboutModal(false);
                                setForumsModal(false);
                            }}
                        >
                            Contact Us
                        </span>
                    </li>
                    <li>
                        <span
                            className="nav-link"
                            onClick={() => {
                                setForumsModal(true);
                                setContactModal(false);
                                setHomeModal(false);
                                setAboutModal(false);
                            }}
                        >
                            {" "}
                            Forums{" "}
                        </span>
                    </li>
                </ul>
                <Login />
                {homeModal ? (
                <Model title="Home" onCancel={() => setHomeModal(false)}>
                    <Home />
                </Model>
            ) : aboutModal ? (
                <Model title="About Us" onCancel={() => setAboutModal(false)}>
                    <About />
                </Model>
            ) : contactModal ? (
                <Model title="Contact Us" onCancel={() => setContactModal(false)}>
                    <Contact />
                </Model>
            ) : (
                forumsModal && (
                    <Model title="Forums" onCancel={() => setForumsModal(false)}>
                        <Forums />
                    </Model>
                )
            )}
            </div>

        </Fragment>
    );
}
