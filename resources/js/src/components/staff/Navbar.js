import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar(props) {
    const theme = useTheme();
    const { open, setOpen } = props;

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <AppBar
            color='default'
            variant='outlined'
            elevation={0}
            position="fixed"
            open={open}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawer}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Mini variant drawer
                </Typography>
            </Toolbar>
        </AppBar>
    );
}