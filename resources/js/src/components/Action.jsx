import React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ReportIcon from "@mui/icons-material/Report";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

/**
 * Action Component
 * 
 * This component renders a set of action icons with tooltips. Each icon represents a different action,
 * and the tooltip provides a descriptive label for each action.
 * 
 * Icons:
 * - PersonAddIcon: Represents adding a person
 * - PersonRemoveIcon: Represents removing a person
 * - ReportIcon: Represents reporting an issue
 * - QueryStatsIcon: Represents viewing statistics
 * - CurrencyExchangeIcon: Represents currency exchange
 * 
 * The icons are displayed in a flex container for proper alignment and spacing.
 * 
 * @returns {JSX.Element} The Action component.
 */
export default function Action() {
  // List of actions with their corresponding icons and labels
  const actions = [
    { icon: <PersonAddIcon />, label: "Add Person" },
    { icon: <PersonRemoveIcon />, label: "Remove Person" },
    { icon: <ReportIcon />, label: "Report" },
    { icon: <QueryStatsIcon />, label: "Statistics" },
    { icon: <CurrencyExchangeIcon />, label: "Exchange" },
  ];

  return (
    <Box
      sx={{
        display: 'flex', // Flex container to align icons horizontally
        justifyContent: 'space-around', // Distribute space evenly around icons
        alignItems: 'center', // Align items vertically centered
        p: 2, // Padding around the container
        // bgcolor: 'background.paper', // Background color of the container
        borderRadius: 2, // Rounded corners for the container
        boxShadow: 3, // Shadow for the container
        flexWrap: 'wrap', // Wrap icons to the next line on smaller screens
      }}
    >
      {actions.map((action, index) => (
        <Tooltip title={action.label} key={index} arrow>
          <Box
            sx={{
              display: 'flex', // Flex container to align icon and label
              flexDirection: 'column', // Arrange icon and label in a column
              alignItems: 'center', // Center align icon and label
              '& .MuiSvgIcon-root': { fontSize: 40 }, // Medium icon size
              m: 1, // Margin around each icon
            }}
          >
            {action.icon}
            <Typography variant="caption" mt={1}>
              {action.label}
            </Typography>
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
}
