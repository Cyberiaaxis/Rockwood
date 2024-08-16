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
import { useProfile } from "../libraries/ProfileContext";
import Avatar from "@mui/material/Avatar";

/**
 * Profile Component
 * This component renders the profile page with different tabs for 
 * viewing personal details, actions, communication, and signature of a player.
 * It uses Material-UI's Tab and TabPanel components for tabbed navigation.
 */
export default function Profile() {
    // Accessing the playerId from ProfileContext
    const { playerId } = useProfile();

    // State to manage the currently selected tab
    const [value, setValue] = React.useState("Details");

    /**
     * handleChange
     * Updates the selected tab when a new tab is clicked.
     * @param {object} event - The event object triggered by tab change.
     * @param {string} newValue - The new value corresponding to the selected tab.
     */
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log("Profile", playerId);

    return (
        <React.Fragment>
            <Box display="flex" flexDirection="row">
                <Box className="details" flex={1}>
                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList
                                    onChange={handleChange}
                                    aria-label="Profile tabs"
                                    variant="scrollable"
                                    scrollButtons="auto"
                                >
                                    <Tab label="Details" value="Details" />
                                    <Tab label="Actions" value="Actions" />
                                    <Tab label="Communication" value="Communication" />
                                    <Tab label="Signature" value="Signature" />
                                </TabList>
                            </Box>
                            <TabPanel value="Details">
                                <PersonalDetails />
                            </TabPanel>
                            <TabPanel value="Actions">
                                <Action />
                            </TabPanel>
                            <TabPanel value="Communication">
                                <Communication />
                            </TabPanel>
                            <TabPanel value="Signature">
                                <Signature />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box
                        sx={{
                            height: { xs: "45vh", md: "55vh" },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden", // Ensures the image does not overflow the Box
                            boxShadow: 3, // Adds a shadow to the Box
                            borderRadius: "16px" // Ensures the shadow follows the rounded corners
                        }}
                    >
                        <Avatar
                            alt="Profile Image"
                            src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
                            variant="square" // Ensures the Avatar is square-shaped
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "inherit" // Inherits the radius from the Box
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            boxShadow: 3, // Adds a shadow to the Box
                            borderRadius: "16px", // Optional: Add rounded corners
                            mt: 2 // Adds some margin on top to separate it from the above Box
                        }}
                    >
                        <SwipeableTextMobileStepper />
                    </Box>

                </Box>
            </Box>
        </React.Fragment>
    );
}
