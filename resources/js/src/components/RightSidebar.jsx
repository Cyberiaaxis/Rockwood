import React from 'react';
import { FaTrophy, FaUsers } from "react-icons/fa"; // Icons for Hall of Fame and Recently Active Players
import { GiWeightLiftingUp } from "react-icons/gi"; // Icon for Gym
import { Box, ListItemButton, Tooltip } from '@mui/material'; // Material UI components
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"; // Toggle icons

/**
 * RightSideBar component.
 * 
 * This component displays a sidebar with navigation options to different sections of the application.
 *
 * @param {Function} setPage - Function to update the current page based on user selection.
 * @param {boolean} opener - Flag indicating whether the sidebar is open or closed.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const RightSideBar = ({ setPage, opener }) => {
  // Menu items with their titles, icons, and corresponding URLs
  const menuItems = [
    {
      title: "Hall of Fame",
      icon: <FaTrophy style={{
        height: 50,
        width: 40,
        color: '#ffbb33'
      }} />,
      url: "halloffame",
    },
    {
      title: "Recently Active Players",
      icon: <FaUsers style={{
        height: 50,
        width: 40,
        color: '#007bff'
      }} />,
      url: "useronline",
    },
    {
      title: "Gym",
      icon: <GiWeightLiftingUp style={{
        height: 50,
        width: 40,
        color: '#28a745'
      }} />,
      url: "gym",
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
          marginTop: 'auto', // Pushes the toggle to the bottom
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <li>
          {opener ? (
            <IoIosArrowBack style={{ color: 'green' }} /> // Icon to close the sidebar
          ) : (
            <IoIosArrowForward style={{ color: 'red' }} /> // Icon to open the sidebar
          )}
        </li>
      </Box>
    </React.Fragment>
  );
};

export default RightSideBar;
