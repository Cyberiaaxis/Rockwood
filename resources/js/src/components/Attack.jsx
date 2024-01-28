import React, { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import {
    Grid,
    Box,
    Typography,
    Avatar,
    Badge,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Card,
    Divider,
    MenuItem,
    Select,
    FormControl,
    Button,
    InputLabel,
    Paper,
    Slider,
    Tooltip,
    Menu,
    List,
    ListItem,
    ListItemIcon,
    RadioGroup,
    Radio,
    SliderRoot,
    styled,
    FormControlLabel,
    FormLabel,
    Input,
    InputBase,
    IconButton,
} from "@mui/material";

import "../styles/Attack.css";

// import gunfire from "../images/gunfire.gif";
// import gunfire from "../videos/gunfire.mov";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonAdd from "@mui/icons-material/PersonAdd";
import AlarmIcon from '@mui/icons-material/Alarm';
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Progress from "./Progress";

function Attack(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [pointPosition, setPointPosition] = useState({ x: 0, y: 0 });
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [shake, setShake] = React.useState(false);
    const [fire, setFire] = React.useState(false);
    const [option, setOption] = React.useState(0);

    const [placement, setPlacement] = React.useState();

    const [blood, setBlood] = React.useState(null);



    const animate = () => {
        // Button begins to shake
        setShake(true);
        setFire(true);
        let randomNumber = Math.floor(Math.random() * 3);
        let splashesUsed = [];
        if (splashesUsed.length == 3) {
            splashesUsed.shift();
            splashesUsed.shift();
        }
        while (splashesUsed.includes(randomNumber)) {
            randomNumber = Math.floor(Math.random() * 3);
        }

        splashesUsed.push(randomNumber);
        setBlood(randomNumber);
        setTimeout(() => {
            setBlood(null);
            setFire(false);
        }, 1500);
        // Buttons tops to shake after 2 seconds
        setTimeout(() => {
            setShake(false);
        }, 5000);
    };

    const manageOption = (event, newValue) => {
        setOption(newValue);
    };

    const handleClose = (event) => {
        // console.log(event);
        event.preventDefault();
        setAnchorEl(null);
        setOpen(null);
        setPlacement(null);
    };

    const UserAvatar = styled("div")(({ theme, left, right }) => ({
        position: "absolute",
        top: "1rem",
        display: "grid",
        gridTemplateColumns: "2.5rem minmax(0, 1fr)",
        gap: "0.5rem",
        left: left || "auto",
        right: right || "auto",
    }));

    const marks = [
        {
            value: 0,
        },
        {
            value: 20,
        },
        {
            value: 37,
        },
        {
            value: 100,
        },
    ];



    const followRef = useRef(null);
    let moving = false;

    function move(e) {
        if (followRef.current) {
            var newX = e.clientX - 70;
            var newY = e.clientY - 70;
            followRef.current.style.left = newX + "px";
            followRef.current.style.top = newY + "px";
        }
    }

    function initialClick(e) {
        console.log('clicked');
        if (moving) {
            document.removeEventListener("mousemove", move);
            moving = !moving;
            return;
        }

        moving = !moving;
        document.addEventListener("mousemove", move, false);

    }

    React.useEffect(() => {
        // Update the image position whenever the point position changes
        setImagePosition(pointPosition);
    }, [pointPosition]);

    const AttckerLeft = '1rem';
    const AttckerRight = '';

    const OpponentLeft = '';
    const OpponentRight = '1rem';

    return (
        <Box position="relative">
            <Box position="relative" sx={{
                border: '1px solid #000',
                width: '100%',
                height: 'calc(95vh - 5rem)',
                overflow: 'hidden'
            }}>

                <UserAvatar left="1rem">
                    <Avatar alt="WoodenBat" src="/static/images/avatar/1.jpg" />
                    <Grid container direction="column">
                        <Progress label="Energy" percentComplete={70} />
                        <Progress label="HP" percentComplete={30} />
                    </Grid>
                </UserAvatar>

                <UserAvatar right="1rem">
                    <Avatar alt="WoodenBat" src="/static/images/avatar/1.jpg" />
                    <Grid container direction="column">
                        <Progress label="HP" percentComplete={30} />
                    </Grid>
                </UserAvatar>
                {/* {fire && (
                <Box>
                     <Gunfire/>
                </Box>
            )} */}
                <Box sx={{ width: "50%" }}>
                    <Box className={`blood blood${blood}`}></Box>

                    <Box sx={{
                        backgroundColor: 'red',
                        position: "absolute",
                        width: "70px",
                        height: "70px",
                        top: "30%",
                        bottom: "30%",
                        left: AttckerLeft ? AttckerLeft : "auto",
                        right: AttckerRight ? AttckerRight : "auto",
                        backgroundImage: `url("../images/gunaim.svg")`,
                        backgroundSize: 'contain',
                    }}
                        ref={followRef}
                        onClick={initialClick}
                    ></Box>
                </Box>
                <Box sx={{ width: "50%" }}>
                    <Box className={`blood blood${blood}`}></Box>

                    <Box sx={{
                        backgroundColor: 'red',
                        position: "absolute",
                        width: "70px",
                        height: "70px",
                        top: "30%",
                        bottom: "30%",
                        left: OpponentLeft ? OpponentLeft : "auto",
                        right: OpponentRight ? OpponentRight : "auto",
                    }}

                    ></Box>
                </Box>

                {/*** Weapon Selection */}
                <Box className="action">
                    <Box padding={1}>
                        <BottomNavigation showLabels value={option} onChange={manageOption}>
                            <BottomNavigationAction label="Settlement" icon={<RestoreIcon />} />
                            <BottomNavigationAction label="Run Away" icon={<FavoriteIcon />} />
                            <BottomNavigationAction label="Surrender" icon={<LocationOnIcon />} />
                        </BottomNavigation>
                    </Box>
                </Box>
            </Box>

            <Grid container className="bottom-menu">
                <Grid item xs className="">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                            <Box>
                                <Tooltip title="Account settings">
                                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                    </IconButton>
                                </Tooltip>
                                <FormControlLabel value="primary" control={<Radio />} label="Primary" />
                            </Box>
                            <Box>
                                <Tooltip title="Account settings">
                                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                    </IconButton>
                                </Tooltip>
                                <FormControlLabel value="secondary" control={<Radio />} label="Secondary" />
                            </Box>
                            <Box>
                                <Tooltip title="Account settings">
                                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                    </IconButton>
                                </Tooltip>
                                <FormControlLabel value="armor" control={<Radio />} label="Armor" />
                            </Box>
                            <IconButton color="secondary" aria-label="add an alarm">
                                <AlarmIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> My account
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs className="stats">
                    <Box sx={{ padding: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Box sx={{ padding: 1, flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <Typography>Damage Efficiency</Typography>
                            <Slider aria-label="ios slider" defaultValue={60} marks={marks} valueLabelDisplay="on" />
                        </Box>
                        <Box sx={{ padding: 1, flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <Typography >Damage Efficiency</Typography>
                            <Slider aria-label="ios slider" defaultValue={60} marks={marks} valueLabelDisplay="on" />
                        </Box>
                        <Box sx={{ padding: 1, flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <Typography >Damage Efficiency</Typography>
                            <Slider aria-label="ios slider" defaultValue={60} marks={marks} valueLabelDisplay="on" />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Attack;
//to do list
//shaking effect
//blood effect
//smoke effect of weapons like guns