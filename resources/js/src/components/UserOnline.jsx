// src/PlayerOnline.js
import React, { useState, useEffect } from 'react';
import { Avatar, Badge, Typography, Box, Tabs, Tab, Grid, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import OnlineIcon from '@mui/icons-material/OnlinePrediction';
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";

// Utility function to format time
const formatTime = (timestamp) => {
    if (!timestamp) return 'Unknown';

    const now = new Date();
    const lastSeenDate = new Date(timestamp); // Parsing timestamp from database

    const timeDiff = now - lastSeenDate;

    if (timeDiff < 15 * 60 * 1000) { // Less than 15 minutes
        return 'Online';
    } else if (timeDiff < 60 * 60 * 1000) { // Less than 1 hour
        return '  1 hour ago';
    } else {
        return ` ${Math.floor(timeDiff / (24 * 60 * 60 * 1000))} days ago`;
    }
};

// Function to determine the color based on time
const getColorByTime = (timestamp) => {
    if (!timestamp) return 'gray';

    const now = new Date();
    const lastSeenDate = new Date(timestamp); // Parsing timestamp from database

    const timeDiff = now - lastSeenDate;

    if (timeDiff < 15 * 60 * 1000) { // Less than 15 minutes
        return 'green';
    } else if (timeDiff < 60 * 60 * 1000) { // Less than 1 hour
        return 'orange';
    } else {
        return 'red';
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
    const [isOnline, setIsOnline] = useState(true);
    const [onlinePlayers, setOnlinePlayers] = useState([]);
    const [tabValue, setTabValue] = useState(0);

    const handleFilterOnlineList = async (timeData) => {
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
        const interval = setInterval(() => {
            setIsOnline(prev => !prev);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

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
                    color={isOnline ? 'success' : 'error'}
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
                <TabPanel value={tabValue} index={0} >
                    <List sx={{ width: '100%', maxWidth: 360, margin: 'auto', bgcolor: 'background.paper' }}>
                        {
                            onlinePlayers.length ? onlinePlayers.map((player, index) => (
                                <ListItem key={index} variant="body2">
                                    <ListItemAvatar>
                                        <Avatar alt={player.name} src={player.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={
                                        <Grid container>
                                            <Box mr={7} >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: getColorByTime(player.last_seen) }}
                                                >
                                                    {player.name}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1">
                                                    {formatTime(player.last_seen)}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    } />
                                </ListItem>
                            )) : <Typography variant="subtitle1">
                                No Data
                            </Typography>
                        }
                    </List>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <List sx={{ width: '100%', maxWidth: 360, margin: 'auto', bgcolor: 'background.paper' }}>
                        {
                            onlinePlayers.length ? onlinePlayers.map((player, index) => (
                                <ListItem key={index} variant="body2">
                                    <ListItemAvatar>
                                        <Avatar alt={player.name} src={player.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={
                                        <Grid container>
                                            <Box mr={7} >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: getColorByTime(player.last_seen) }}
                                                >
                                                    {player.name}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1">
                                                    {formatTime(player.last_seen)}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    } />
                                </ListItem>
                            )) : <Typography variant="subtitle1">
                                No Data
                            </Typography>
                        }
                    </List>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <List sx={{ width: '100%', maxWidth: 360, margin: 'auto', bgcolor: 'background.paper' }}>
                        {
                            onlinePlayers.length ? onlinePlayers.map((player, index) => (
                                <ListItem key={index} variant="body2">
                                    <ListItemAvatar>
                                        <Avatar alt={player.name} src={player.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={
                                        <Grid container>
                                            <Box mr={7} >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: getColorByTime(player.last_seen) }}
                                                >
                                                    {player.name}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1">
                                                    {formatTime(player.last_seen)}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    } />
                                </ListItem>
                            )) : <Typography variant="subtitle1">
                                No Data
                            </Typography>
                        }
                    </List>
                </TabPanel>
            </Box>
        </React.Fragment>
    );
};

export default UsersOnline;
