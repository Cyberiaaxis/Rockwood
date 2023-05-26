import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function Discussions({ setPage }) {

    return (
        <React.Fragment>
            <Box sx={{ paddingTop: 0, marginTop: 0 }} >
                <Typography variant="h4" align="center">
                    Discussions
                </Typography>
            </Box>
        </React.Fragment>
    );
}
