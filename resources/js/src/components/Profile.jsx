import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "../styles/Profile.css";
import PersonalDetails from "./PersonalDetails";
import Signature from "./Signature";
import Communication from "./Communication";
import Action from "./Action";
import SwipeableTextMobileStepper from "./Medal";

export default function Profile() {
    const [value, setValue] = React.useState("Details");

    const handleChange = (event, newValue) => {
        // console.log("newValue", newValue);
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <div className="profileContainer">
                <div className="details">
                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList
                                    onChange={handleChange}
                                    aria-label=""
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
                </div>
                <div className="avatar">
                    <div className="profileImage">top</div>
                    <div className="awards">
                        <SwipeableTextMobileStepper />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
