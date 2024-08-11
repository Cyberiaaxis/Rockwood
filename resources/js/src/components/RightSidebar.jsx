import React from 'react'
import { FaSteamSquare } from "react-icons/fa"
import { SiYourtraveldottv } from "react-icons/si";
import { CgGym } from "react-icons/cg";

import { Box, ListItemButton, Tooltip, Typography } from '@mui/material'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


export default function RightSideBar({ setPage, opener }) {

  const menuItems = [
    {
      title: "Hall of Fame",
      icon: <img src="/images/hof.png" alt="Description of the image" style={{ height: 50, width: 40 }} />,
      url: "halloffame",
    },
    // c:\Users\cyber\Downloads\Hall-Of-Fame-PNG-Download-Image.png
    {
      title: "Recently Active Players",
      icon: <FaSteamSquare style={{ height: 80, width: 40 }} />,
      url: "useronline",
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
        className={`${opener ? 'active' : 'hidden'} menu`}
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
          marginTop: 'auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <li>{opener ? <IoIosArrowForward style={{ color: 'red' }} /> : <IoIosArrowBack style={{ color: 'green' }} />}</li>
      </Box>
    </React.Fragment>

  )
}