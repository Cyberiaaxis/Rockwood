import React from 'react'
import { FaSteamSquare } from "react-icons/fa"
import { SiYourtraveldottv } from "react-icons/si";
import { CgGym } from "react-icons/cg";

import { Box, ListItemButton, Tooltip } from '@mui/material'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


export default function LeftSideBar({ setPage, opener }) {
  function selectPage(event) {
    setPage(event.target.innerText);
  }

  const menuItems = [
    {
      title: "Travel",
      icon: <SiYourtraveldottv style={{ height: 80, width: 40 }} />,
      url: "travel",
    },

    {
      title: "Forums",
      icon: <FaSteamSquare style={{ height: 80, width: 40 }} />,
      url: "forums",
    },

    {
      title: "Gym",
      icon: <CgGym style={{ height: 100, width: 60 }} />,
      url: "gym",
      // divider: true,
    },

  ];

  return (
    <React.Fragment>
      <Box
        component='ul'
        sx={{
          textAlign: 'center',
          height: '100%',
          display: 'flex',   // Making the <ul> a flex container
          flexDirection: 'column',
        }}
        className={`${opener ? 'active' : ''} menu`}
      >
        {
          menuItems.map((item, i) =>
            <li
              key={i}
              style={{
                flex: '1 1 auto',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                listStyle: 'none',
                border: 'none',
              }}
            >
              <Tooltip title={item.title} placement="right">
                <ListItemButton onClick={() => setPage(item.url)} sx={{
                  fontSize: '1.5rem',
                }}>
                  {item.icon}
                </ListItemButton>
              </Tooltip>
            </li>
          )}

      </Box>

      <Box
        className='toggle'
        component='ul'
        sx={{
          textAlign: 'center',
          height: '100%',
          display: 'flex',   // Making the <ul> a flex container
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <li>
          <Tooltip title={opener ? 'opened' : 'closed'} placement="top">
            <div>
              {opener ? <IoIosArrowBack style={{ color: 'red' }} /> : <IoIosArrowForward style={{ color: 'green' }} />}
            </div>
          </Tooltip>
        </li>
      </Box>
    </React.Fragment >

  )
}