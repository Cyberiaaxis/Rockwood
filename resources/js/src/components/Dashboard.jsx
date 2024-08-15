import React, { useState } from "react";
import { ProfileProvider } from "../libraries/ProfileContext";
import "../styles/Main.css";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Footer from "./Footer";
import Home from "./Home";
import Explore from "./Explore";
import Profile from "./Profile";
import HallOfFame from "./HallOfFame";
import Recovery from "./Recovery";
import Lockup from "./Lockup";
import Savings from "./Savings";
import Gang from "./Gang";
import Gym from "./Gym";
import Attack from "./Attack";
import Crimes from "./Crimes";
import Travel from "./Travel";
import Event from "./Event";
import Forums from "./Forums";
import Mail from "./Mailbox";
import Thread from "./Thread";
import FightClubs from "./FightClubs";
import MyAccount from "./MyAccount";
import UserOnline from "./UserOnline";

export default function Dashboard() {
    const [openStates, setOpenStates] = React.useState({});
    const [activePage, setActivePage] = React.useState(<Home />);
    const [threadId, setThreadId] = React.useState(<Home />);

    function toggleOpen(menuName) {
        setOpenStates((os) => ({ ...os, [menuName]: !os[menuName] }));
    }

    const pages = React.useMemo(() => ({
        home: <Home />,
        explore: <Explore setPage={setActivePage} />,
        profile: <Profile />,
        event: <Event />,
        halloffame: <HallOfFame />,
        recovery: <Recovery />,
        lockup: <Lockup />,
        savings: <Savings />,
        gym: <Gym />,
        gang: <Gang />,
        attack: <Attack />,
        crimes: <Crimes />,
        travel: <Travel />,
        mail: <Mail />,
        forums: <Forums />,
        thread: <Thread threadId={threadId} />,
        fightclub: <FightClubs />,
        myaccount: <MyAccount />,
        useronline: <UserOnline setPage={setActivePage} />
    }), [threadId]);

    return (
        <React.Fragment>
            <ProfileProvider>
                <div className="App">
                    <nav
                        className={openStates['top'] ? 'top_menu active' : 'top_menu'}
                        tabIndex="0"
                    >
                        <Header setPage={setActivePage} />
                    </nav>
                    <nav
                        className={openStates["left"] ? "left_menu active" : "left_menu"}
                        tabIndex="0"
                        onClick={() => toggleOpen("left")}
                    >
                        <LeftSidebar setPage={setActivePage} opener={openStates.left} />
                    </nav>
                    <nav
                        className={openStates["right"] ? "right_menu active" : "right_menu"}
                        tabIndex="0"
                        onClick={() => toggleOpen("right")}
                    >
                        <RightSidebar setPage={setActivePage} opener={openStates.right} />
                    </nav>
                    <nav
                        className={openStates["bottom"] ? "bottom_menu active" : "bottom_menu"}
                        tabIndex="0"
                    >
                        <Footer setPage={setActivePage} />
                    </nav>
                    <main className="content-area">
                        {pages[activePage] || pages.home}
                    </main>
                </div>
            </ProfileProvider>

        </React.Fragment>
    );
}
