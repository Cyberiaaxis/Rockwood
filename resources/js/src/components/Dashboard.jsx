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
            thread: <Thread threadId={threadId} />
        };

        return pages[page] || pages.home;
    }

    // console.log("openStates", openStates);
    return (
        <React.Fragment>
            <div className="App">
                <nav
                    className={
                        openStates['top'] ? 'primary_menu active' : 'primary_menu'

                    }
                    tabIndex="0"
                // onClick={() => toggleOpen("top")}
                >
                    <Header setPage={setActivePage} />
                </nav>
                <nav
                    className={
                        openStates["left"] ? "secondary_menu active" : "secondary_menu"
                    }
                    tabIndex="0"
                    onClick={() => toggleOpen("left")}
                >
                    <LeftSidebar setPage={setActivePage} />
                </nav>
                <nav
                    className={
                        openStates["right"] ? "tertiary_menu active" : "tertiary_menu"
                    }
                    tabIndex="0"
                    onClick={() => toggleOpen("right")}
                >
                    <RightSidebar setPage={setActivePage} />
                </nav>
                <nav
                    className={
                        openStates["bottom"] ? "quartary_menu active" : "quartary_menu"
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