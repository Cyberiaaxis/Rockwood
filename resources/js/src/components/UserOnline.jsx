import React, { useState, useEffect } from 'react';
import { Avatar, Badge, Typography, Box, Tabs, Tab, List, ListItem, ListItemText, ListItemAvatar, Tooltip } from '@mui/material';
import OnlineIcon from '@mui/icons-material/OnlinePrediction';
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";
import { useProfile } from "../libraries/ProfileContext";

/**
 * Function to determine the color based on the user's activity status.
 *
 * @param {string} status - The activity status ('Online', 'Idle', 'Offline').
 * @param {boolean} [badge=true] - Whether the color is for a badge or text.
 * @returns {string} The color associated with the status.
 */
const getColorByStatus = (status, badge = true) => {
    switch (status) {
        case "Online":
            return badge ? 'success' : '#004d00'; // Very dark green for 'Online'
        case "Idle":
            return badge ? 'warning' : '#BFA600'; // Dark yellow for 'Idle'
        case "Offline":
        default:
            return badge ? 'error' : '#f44336'; // Red for 'Offline'
    }
};

/**
 * TabPanel component to render content based on the selected tab.
 *
 * @param {object} props - The component props.
 * @param {number} props.value - The current value of the selected tab.
 * @param {number} props.index - The index of this TabPanel.
 * @param {React.ReactNode} props.children - The content to display inside the panel.
 * @returns {JSX.Element} The rendered TabPanel component.
 */
const TabPanel = ({ value, index, children }) => (
    <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        sx={{ maxHeight: '25rem', overflowY: "auto" }}
    >
        {value === index && <Box p={3}>{children}</Box>}
    </Box>
);

/**
 * UsersOnline component that displays a list of online players based on different time filters.
 *
 * @param {function} setPage - Function to change the current page/view.
 * @returns {JSX.Element} The rendered UsersOnline component.
 */
const UsersOnline = ({ setPage }) => {
    const { setPlayerId } = useProfile(); // Access setPlayerId from ProfileContext
    const [onlinePlayers, setOnlinePlayers] = useState([]); // State to store online players
    const [tabValue, setTabValue] = useState(0); // State to store the current tab value

    /**
     * Fetch the list of online players based on the selected time range.
     *
     * @param {number} timeData - The time range in minutes to filter online players.
     */
    const handleFilterOnlineList = async (timeData) => {
        try {
            const response = await toast.promise(
                gameServerApi('/onlinePlayers', 'POST', { timeData }),
                {
                    pending: 'Fetching online players...',
                    success: {
                        render({ data }) {
                            setOnlinePlayers(data);
                            return 'Online players fetched successfully!';
                        },
                    },
                    error: {
                        theme: 'colored',
                        render({ data }) {
                            return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message || 'An error occurred while fetching online players';
                        },
                    },
                }
            );
        } catch (error) {
            toast.error('Failed to fetch online players');
        }
    };

    // Fetch initial data for players online within the last 15 minutes.
    useEffect(() => {
        handleFilterOnlineList(15);
    }, []);

    /**
     * Handle tab change event to update the selected time range.
     *
     * @param {object} event - The event object.
     * @param {number} newValue - The new value for the tab.
     */
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    /**
     * Handle redirect to profile and set player ID.
     *
     * @param {string} playerId - The ID of the player to set.
     */
    const handleRedirect = (playerId) => {
        setPlayerId(playerId); // Set the player ID in context
        setPage("profile"); // Navigate to profile page
    };

    return (
        <React.Fragment>
            {/* Avatar and Badge for displaying online status */}
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ flexDirection: 'column', textAlign: 'center' }}>
                <Badge
                    color={getColorByStatus("Online")}
                    variant="dot"
                    overlap="circular"
                >
                    <Avatar sx={{ width: 36, height: 36, color: "green", backgroundColor: "black" }}>
                        <OnlineIcon />
                    </Avatar>
                </Badge>
            </Box>

            {/* Tabs for time range filters */}
            <Box>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    aria-label="player online tabs"
                    variant="fullWidth"
                    sx={{ m: 0 }}
                >
                    <Tab onClick={() => handleFilterOnlineList(15)} label="Last 15 Minutes Online Players" />
                    <Tab onClick={() => handleFilterOnlineList(60)} label="Last Hour Online Players" />
                    <Tab onClick={() => handleFilterOnlineList(1440)} label="Last 24 Hours Online Players" />
                </Tabs>

                {/* Tab panels for displaying players based on the selected time range */}
                {[15, 60, 1440].map((time, index) => (
                    <TabPanel value={tabValue} index={index} key={index}>
                        <List sx={{ width: '100%', maxWidth: 360, margin: 'auto' }}>
                            {onlinePlayers.length ? onlinePlayers.map((player, idx) => (
                                <ListItem key={idx} sx={{ padding: 0 }}>
                                    <ListItemAvatar>
                                        <Badge
                                            color={getColorByStatus(player.activity_status)}
                                            variant="dot"
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        >
                                            <Avatar alt={player.name} src={player.avatar} />
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box>
                                                {/* Player's name with tooltip showing last seen time */}
                                                <Tooltip
                                                    title={
                                                        <Typography style={{ color: getColorByStatus(player.activity_status) }}>
                                                            {player.last_seen}
                                                        </Typography>
                                                    }
                                                    arrow
                                                    placement="top"
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        style={{ color: getColorByStatus(player.activity_status) }}
                                                    >
                                                        {player.name}
                                                    </Typography>
                                                </Tooltip>
                                                {/* Last seen time with click event to redirect to profile */}
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: getColorByStatus(player.activity_status, false), cursor: 'pointer' }}
                                                    onClick={() => handleRedirect(player.id)}
                                                >
                                                    {player.last_seen}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            )) : (
                                <Typography variant="subtitle1" align="center">
                                    No Data
                                </Typography>
                            )}
                        </List>
                    </TabPanel>
                ))}
            </Box>
        </React.Fragment>
    );
};

export default UsersOnline;
