import React from "react";
// import { clsx } from "clsx";
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
import Mail from "./mail/Mailbox";
import Thread from "./Thread";
import FightClubs from "./FightClubs";
// import Chat from "./Chat";


export default function Dashboard() {
    const [openStates, setOpenStates] = React.useState({});
    const [activePage, setActivePage] = React.useState(<Home />);
    const [threadId, setThreadId] = React.useState(<Home />);
    // console.log("**Dashboard**");

    function toggleOpen(menuName) {
        setOpenStates((os) => ({ ...os, [menuName]: !os[menuName] }));
    }

    function Page({ page = "home" }) {
        const pages = {
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
            fightclub: <FightClubs />
        };
        console.log("pages[page] || pages.home", pages[page]);
        return pages[page] || pages.home;
    }
    activePage
    console.log("openStates", openStates.left);
    console.log("activePage", activePage);
    return (
        <React.Fragment>
            <div className="App">
                <nav
                    className={
                        openStates['top'] ? 'top_menu active' : 'top_menu'

                    }
                    tabIndex="0"
                // onClick={() => toggleOpen("top")}
                >
                    <Header setPage={setActivePage} />
                </nav>
                <nav
                    className={
                        openStates["left"] ? "left_menu active" : "left_menu"
                    }
                    tabIndex="0"
                    onClick={() => toggleOpen("left")}
                >
                    <LeftSidebar setPage={setActivePage} opener={openStates.left} />
                </nav>
                <nav
                    className={
                        openStates["right"] ? "right_menu active" : "right_menu"
                    }
                    tabIndex="0"
                    onClick={() => toggleOpen("right")}
                >
                    <RightSidebar setPage={setActivePage} opener={openStates.right} />
                </nav>
                <nav
                    className={
                        openStates["bottom"] ? "bottom_menu active" : "bottom_menu"
                    }
                    tabIndex="0"
                // onClick={() => toggleOpen("bottom")}
                >
                    <Footer setPage={setActivePage} />
                </nav>
                <main className="content-area">
                    <Page page={activePage} />
                </main>
            </div>
        </React.Fragment>
    );
}