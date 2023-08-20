import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, Box, Paper } from "@mui/material";

export default function Footer({ setPage }) {
    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        // ...theme.typography.body2,
        // padding: theme.spacing(0),
        textAlign: "center",
        // color: theme.palette.text.secondary,
    }));

    const GradientButton = styled(Button)`
        background: linear-gradient(90deg, #f29216 30%, #e9ec0c 90%);
        color: white;
    `;
    return (
        <React.Fragment>
            <Box display={"flex"} >
                <Box sx={{ flex: '1 1' }}>Menu First</Box>
                <Box sx={{ flex: '1 1 auto' }} >Menu Second</Box>
                <Box sx={{ flex: '1 1 auto' }} >Manu Three</Box>
                <Box sx={{ flex: '1 1 auto' }} >Menu Four</Box>
                <Box sx={{ flex: '1 1 auto' }} >Menu Five</Box>
                <Box sx={{ flex: '1 1 auto' }} >Menu Six</Box>
            </Box>
        </React.Fragment >
    );
}
// onClick = {() => setPage("explore")}