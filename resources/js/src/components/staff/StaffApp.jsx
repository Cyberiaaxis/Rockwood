import React, { useState } from 'react'
import { Box, CssBaseline } from '@mui/material';
import Navbar from '../staff/Navbar';
import Body from "../staff/Body";
import PanelComponent from "../staff/PanelComponent";
import Footer from '../staff/Footer';
import Sidebar from '../staff/Sidebar';

export default function StaffApp() {
    const [myComponent, setMyComponent] = useState(<Footer />);
    const [open, setOpen] = useState(true);

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Navbar open={open} setOpen={setOpen} />
                <Sidebar open={open} setOpen={setOpen} setMyComponent={setMyComponent} />
                <Body>{myComponent.url ? <PanelComponent data={myComponent} /> : myComponent}</Body>
            </Box>
        </React.Fragment>
    )
}
