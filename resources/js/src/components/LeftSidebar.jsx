import React from "react";
import { Chat, Home } from "@mui/icons-material";

export default function LeftSidebar({ setPage }) {

  const menuItems = [
    {
      text: 'Home',
      url: 'home',
      icon: <Home />
    },
    {
      text: 'Profile',
      url: 'profile',
      icon: <Home />
    },
    {
      text: 'Chat',
      url: 'chat',
      icon: <Chat />
    },
    {
      text: 'Crimes',
      url: 'crime',
      icon: <Home />
    },
  ]

  return (
    <React.Fragment>
      <ul>
        {menuItems.map((x, i) => <li key={i} onClick={setPage(x.url)}>
          {x.text}
        </li>)}
      </ul>
    </React.Fragment>
  );
}