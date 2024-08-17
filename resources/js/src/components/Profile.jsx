import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PersonalDetails from "./PersonalDetails";
import Signature from "./Signature";
import Communication from "./Communication";
import Action from "./Action";
import SwipeableTextMobileStepper from "./Medal";
import Avatar from "@mui/material/Avatar";


/**
 * Profile Component
 * This component renders the profile page with different tabs for 
 * viewing personal details, actions, communication, and signature of a player.
 * It uses Material-UI's Tab and TabPanel components for tabbed navigation.   playerDetails
 */
export default function Profile() {
    // Accessing the playerId from ProfileContext
    // const { playerId } = useProfile();

    // State to manage the currently selected tab
    const [value, setValue] = React.useState("Details");
    // const [playerDetail, setPlayerDetail] = React.useState("");


    /**
     * handleChange
     * Updates the selected tab when a new tab is clicked.
     * @param {object} event - The event object triggered by tab change.
     * @param {string} newValue - The new value corresponding to the selected tab.
     */
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    // console.log("playerDetail", playerDetail.userName);
    // userName: 'Rocky', rank: 'demoRank', gang_name: 'Demo Gang 1', level: 'demoLevel', age: '2024-08-10 11:39:28'
    return (
        <React.Fragment>
            <Box display="flex" flexDirection="row" margin={0} padding={0}>
                <Box flex={1}
                    sx={{
                        width: { xs: "100%", md: "300px" }, // Fixed width for consistency
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden", // Prevents overflow in tabs
                        p: 0, // Remove padding if any
                        m: 0  // Remove margin if any
                    }}
                >
                    {/* Tabs Container */}
                    <Box
                        sx={{
                            width: { xs: "100%", md: "300px" }, // Set a fixed width for consistency
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <TabContext value={value}>
                            <Box
                                sx={{
                                    width: { xs: "100%", md: "550px" }, // Fixed width for consistency
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden" // Prevents overflow in tabs
                                }}
                            >
                                <TabContext value={value}>
                                    <Box sx={{ width: { xs: "100%", md: "550px" } }}>
                                        <TabList
                                            onChange={handleChange}
                                            aria-label="Profile tabs"
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            sx={{ overflow: "hidden" }} // Prevents unexpected scrolling
                                        >
                                            <Tab label="Details" value="Details" />
                                            <Tab label="Actions" value="Actions" />
                                            <Tab label="Communication" value="Communication" />
                                            <Tab label="Signature" value="Signature" />
                                        </TabList>
                                    </Box>
                                    {/* Tab Panels */}
                                    <Box
                                        sx={{
                                            flexGrow: 0,
                                            display: "flex",
                                            flexDirection: "column",
                                            overflow: "hidden", // Prevents overflow in tab panels
                                            width: { xs: "100%", md: "550px" },
                                        }}
                                    >
                                        <TabPanel value="Details" sx={{ p: 0, overflow: "auto" }}>
                                            <PersonalDetails />
                                        </TabPanel>
                                        <TabPanel value="Actions" sx={{ p: 0, overflow: "auto" }}>
                                            <Action />
                                        </TabPanel>
                                        <TabPanel value="Communication" sx={{ p: 0, overflow: "auto" }}>
                                            <Communication />
                                        </TabPanel>
                                        <TabPanel value="Signature" sx={{ p: 0, overflow: "auto" }}>
                                            <Signature />
                                        </TabPanel>
                                    </Box>
                                </TabContext>
                            </Box>
                        </TabContext>
                        <Box sx={{ border: 1, margin: 0, padding: 0, width: { xs: "100%", md: "530px" }, }}>
                            player signture box
                        </Box>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    {/* Profile Image Box */}
                    <Box
                        sx={{
                            width: { xs: "100%", md: "570px" }, // Set a fixed width for consistency
                            height: { xs: "45vh", md: "55vh" },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            boxShadow: 3,
                            borderRadius: "16px",
                            mb: 0.5, // Adds margin at the bottom to separate from the next Box
                        }}
                    >
                        <Avatar
                            alt="Profile Image"
                            src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
                            variant="square"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "inherit",
                            }}
                        />
                    </Box>

                    {/* SwipeableTextMobileStepper Box */}
                    <Box
                        sx={{
                            width: { xs: "100%", md: "570px" }, // Set the same fixed width as the image Box
                            boxShadow: 3,
                            borderRadius: "16px",
                            mt: 2, // Adds margin on top to separate from the above Box
                        }}
                    >
                        <SwipeableTextMobileStepper />
                    </Box>
                </Box>
            </Box>
        </React.Fragment >
    );
}
