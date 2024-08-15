import React, { useState, useEffect } from 'react';
import { Avatar, Badge, Typography, Box, Tabs, Tab, Grid, List, ListItem, ListItemText, ListItemAvatar, Tooltip } from '@mui/material';
import OnlineIcon from '@mui/icons-material/OnlinePrediction';
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";

// Utility function to format time
const formatTime = (timestamp) => {

    if (!timestamp) return 'Unknown';

    const now = new Date();
    const lastSeenDate = new Date(timestamp);

    const timeDiff = now - lastSeenDate;

    // Handle the case where the timestamp is in UTC (ends with 'Z')
    if (isNaN(lastSeenDate.getTime())) {
        return 'Invalid Date';
    }

    if (timeDiff < 15 * 60 * 1000) { // Less than 15 minutes
        return 'Online';
    } else if (timeDiff < 60 * 60 * 1000) { // Less than 1 hour
        const minutesAgo = Math.floor(timeDiff / (60 * 1000));
        return `${minutesAgo} minutes ago`;
    } else if (timeDiff < 24 * 60 * 60 * 1000) { // Less than 24 hours
        const hoursAgo = Math.floor(timeDiff / (60 * 60 * 1000));
        return `${hoursAgo} hours ago`;
    } else {
        const daysAgo = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
        return `${daysAgo} days ago`;
    }
};

// Function to determine the color based on time
const getColorByTime = (timestamp, badge = true) => {
    if (!timestamp) return '#808080'; // gray

    const now = new Date();
    const lastSeenDate = new Date(timestamp);

    const timeDiff = now - lastSeenDate;

    if (timeDiff < 15 * 60 * 1000) { // Less than 15 minutes
        return badge ? 'success' : '#004d00'; // Very dark green
    } else if (timeDiff < 60 * 60 * 1000) { // Less than 1 hour
        return badge ? 'warning' : '#BFA600';
    } else {
        return badge ? 'error' : '#f44336'; // Red
    }
};

// TabPanel Component
const TabPanel = ({ value, index, children }) => {
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            sx={{
                maxHeight: '25rem',
                overflowY: "auto",
            }}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </Box>
    );
};

const UsersOnline = () => {
    const [onlinePlayers, setOnlinePlayers] = useState([]);
    const [tabValue, setTabValue] = useState(0);

    const handleFilterOnlineList = async (timeData) => {
        // console.log("handleFilterOnlineList", timeData);
        try {
            const response = await toast.promise(
                gameServerApi('/onlinePlayers', 'POST', { timeData }), // Adjust the API endpoint as needed
                {
                    pending: 'Fetching online players...',
                    success: {
                        render({ data }) {
                            setOnlinePlayers(data);
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
            // Handle error
        }
    };

    useEffect(() => {
        handleFilterOnlineList(15); // Initial load with the last 15 minutes
    }, []);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };
    console.log("onlinePlayers", onlinePlayers.data);
    return (
        <React.Fragment>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
            >
                <Badge
                    color={getColorByTime(Date.now())} // Using the current time to simulate online status
                    variant="dot"
                    overlap="circular"
                >
                    <Avatar sx={{ width: 56, height: 56, color: "green", backgroundColor: "black" }}>
                        <OnlineIcon />
                    </Avatar>
                </Badge>
            </Box>

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
                {[15, 60, 1440].map((time, index) => (
                    <TabPanel value={tabValue} index={index} key={index}>
                        <List sx={{ width: '100%', maxWidth: 360, margin: 'auto' }}>
                            {
                                onlinePlayers.data ? onlinePlayers.data.map((player, idx) => (
                                    <ListItem key={idx} variant="body2" sx={{ padding: 0 }}>
                                        <ListItemAvatar>
                                            <Badge
                                                color={getColorByTime(player.last_seen)}
                                                variant="dot"
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            >
                                                <Avatar alt={player.name} src={player.avatar} />
                                            </Badge>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <React.Fragment>
                                                    <Box>
                                                        <Tooltip
                                                            title={
                                                                <Typography style={{ color: getColorByTime(player.last_seen) }}>
                                                                    {formatTime(player.last_seen)}
                                                                </Typography>
                                                            }
                                                            arrow
                                                            placement="top"
                                                        >
                                                            <Typography
                                                                variant="subtitle1"
                                                                style={{ color: getColorByTime(player.last_seen) }}
                                                            >
                                                                {player.name}
                                                            </Typography>
                                                        </Tooltip>

                                                        <Typography
                                                            variant="subtitle1"
                                                            style={{ color: getColorByTime(player.last_seen, false) }}
                                                        >
                                                            {formatTime(player.last_seen)}
                                                        </Typography>
                                                    </Box>
                                                </React.Fragment>
                                            } />
                                    </ListItem>
                                )) : <Typography variant="subtitle1">
                                    No Data
                                </Typography>
                            }
                        </List>
                    </TabPanel>
                ))}
            </Box>
        </React.Fragment>
    );
};

export default UsersOnline;
