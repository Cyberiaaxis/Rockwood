import React from 'react';
import { FaPlaneDeparture, FaComments } from "react-icons/fa"; // Travel and Forums icons
import { GiWeightLiftingUp } from "react-icons/gi"; // Gym icon
import { Box, ListItemButton, Tooltip } from '@mui/material'; // Material UI components
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"; // Toggle icons
import { MdSecurity } from "react-icons/md"; // Security icon for crime theme
import { BiMap } from "react-icons/bi"; // Map icon for travel

/**
 * LeftSideBar component.
 * 
 * This component displays a sidebar with navigation options for different sections of the application.
 *
 * @param {Function} setPage - Function to set the current page based on user selection.
 * @param {boolean} opener - Flag indicating whether the sidebar is open or closed.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const LeftSideBar = ({ setPage, opener }) => {
  // Define menu items with titles, icons, and corresponding URLs
  const menuItems = [
    {
      title: "Travel",
      icon: <BiMap style={{
        height: 70,
        width: 30,
        color: '#ff5722'
      }} />, // Map icon
      url: "travel",
    },
    {
      title: "Forums",
      icon: <FaComments style={{
        height: 70,
        width: 30,
        color: '#ff5722'
      }} />, // Comments icon
      url: "forums",
    },
    {
      title: "Gym",
      icon: <GiWeightLiftingUp style={{
        height: 70,
        width: 40,
        color: '#ff5722'
      }} />, // Gym icon
      url: "gym",
    },
    {
      title: "Security",
      icon: <MdSecurity style={{
        height: 70,
        width: 30,
        color: '#ff5722'
      }} />, // Security icon
      url: "security",
    },
  ];

  return (
    <React.Fragment>
      {/* Sidebar Menu */}
      <Box
        component='ul'
        sx={{
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        className={`${opener ? 'active' : 'hidden'} menu`} // Dynamic class based on 'opener' prop
      >
        {/* Render menu items */}
        {menuItems.map((item, index) => (
          <li
            key={index} // Unique key for each list item
            style={{
              flex: '1 1 auto',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              listStyle: 'none',
              border: 'none',
            }}
          >
            <Tooltip title={item.title} placement="right"> {/* Tooltip for item */}
              <ListItemButton
                onClick={() => setPage(item.url)} // Change page on click
                sx={{
                  fontSize: '1.5rem',
                  justifyContent: 'center',
                }}
              >
                {item.icon} {/* Render icon */}
              </ListItemButton>
            </Tooltip>
          </li>
        ))}
      </Box>

      {/* Sidebar Toggle Button */}
      <Box
        className='toggle'
        component='ul'
        sx={{
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <li>
          <Tooltip title={opener ? 'opened' : 'closed'} placement="top"> {/* Tooltip for toggle state */}
            <div>
              {opener ? (
                <IoIosArrowForward style={{ color: 'green' }} /> // Icon for toggling open
              ) : (
                <IoIosArrowBack style={{ color: '#ff5722' }} /> // Icon for toggling closed
              )}
            </div>
          </Tooltip>
        </li>
      </Box>
    </React.Fragment>
  );
};

export default LeftSideBar;
