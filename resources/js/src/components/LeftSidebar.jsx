import React from "react";
import { Chat, Home } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function LeftSidebar({ setPage }) {
  function selectPage(event) {
    setPage(event.target.innerText);
  }

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
      <Box component='ul' sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '0.5rem',
      }}>
        {menuItems.map((x, i) => <li key={i} onClick={() => setPage(x.url)}>
          {x.text}
        </li>)}
      </Box>
    </React.Fragment>
  );
}