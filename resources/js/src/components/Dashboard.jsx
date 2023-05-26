import React from "react";
// import { clsx } from "clsx";
import "../src/styles/Main.css";
import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import HallOfFame from "./components/HallOfFame";
import Recovery from "./components/Recovery";
import Lockup from "./components/Lockup";
import Savings from "./components/Savings";
import Gang from "./components/Gang";
import Gym from "./components/Gym";
import Attack from "./components/Attack";
import Crimes from "./components/Crimes";
import Travel from "./components/Travel";
import Chat from "./components/chat";


export default function Dashboard() {
  const [openStates, setOpenStates] = React.useState({});
  const [activePage, setActivePage] = React.useState(<Home />);

  function toggleOpen(menuName) {
    setOpenStates((os) => ({ ...os, [menuName]: !os[menuName] }));
  }

  function Page({ page = "home" }) {
    const pages = {
      home: <Home />,
      explore: <Explore setPage={setActivePage} />,
      profile: <Profile />,
      halloffame: <HallOfFame />,
      recovery: <Recovery />,
      lockup: <Lockup />,
      savings: <Savings />,
      gym: <Gym />,
      gang: <Gang />,
      attack: <Attack />,
      crimes: <Crimes />,
      travel: <Travel />,
      chat: <Chat />
    };

    return pages[page] || pages.home;
  }

  // console.log("openStates", openStates);
  return (
    <React.Fragment>
      <div className="App">
        <header>
          <nav
            className={
              openStates["top"] ? "primary_menu active" : "primary_menu"
            }
            tabIndex="0"
            onClick={() => toggleOpen("top")}
          >
            <Header setMenu={setActivePage} />
          </nav>
        </header>
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
          onClick={() => toggleOpen("bottom")}
        >
          <Footer setPage={setActivePage} />
        </nav>
        <main className="content-area" sx={{ backgroundImage: `url("/14.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Page page={activePage} />
        </main>
      </div>
    </React.Fragment>
  );
}
