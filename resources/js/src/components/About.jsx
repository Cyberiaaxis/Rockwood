import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function About({ setPage }) {

    return (
        <React.Fragment>
            <Box sx={{ paddingTop: 0 }} marginTop={0}>
                <Typography variant="h5" align="justify">
                    Cyberia Axis is a text-based online RPG set in Cyberia Axis, a dark, murky underworld where only the sharpest survive. In Cyberia Axis you can be anyone and do anything. Build your character to infinite strengths and play it your way.
                    Cyberia Axis is a massively multiplayer game with thousands of active players around the world. Join them, fight them, befriend them, marry them, gamble against them, trade with them, compete with them, war alongside them. Whatever you do - do it now!
                </Typography>;
            </Box>
        </React.Fragment>
    );
}
