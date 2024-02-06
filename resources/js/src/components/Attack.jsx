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
import "../styles/blood.css";


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


const BOX_WIDTH = 70;
const BOX_HEIGHT = 70;

function Attack(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [gunPointer, setGunPointer] = useState({ x: 0, y: 0 });
    const [pointPosition, setPointPosition] = useState({ x: 0, y: 0 });
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [bloodFlash, setBloodFlash] = useState(false);
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
        }, 1000);
        // Buttons tops to shake after 2 seconds
        setTimeout(() => {
            setShake(false);
        }, 5000);
    };

    const manageOption = (event, newValue) => {
        console.log('New Option Selected:', newValue);
        setOption(newValue);
    };

    const handleAttackHit = (event) => {
        setBloodFlash(true);
        setTimeout(() => {
            setBloodFlash(false);
        }, 5000);
        // animate();
    };
    console.log("bloodFlash", bloodFlash);
    const handleClose = (event) => {
        // console.log(event);
        event.preventDefault();
        setAnchorEl(null);
        setOpen(null);
        setPlacement(null);
    };
    const GunFire = () => {
        return (
            <video width="640" height="360" autoPlay>
                <source src="../videos/gunfire.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    }

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
        const crosshairElement = followRef.current
        if (crosshairElement) {
            const container = crosshairElement.parentElement;

            var newX = e.clientX - container.offsetLeft - BOX_WIDTH / 2;
            var newY = e.clientY - container.offsetTop - BOX_HEIGHT / 2;
            crosshairElement.style.left = newX + "px";
            crosshairElement.style.top = newY + "px";

        }
    }

    function onCrosshairContainerMouseMove(e) {
        console.log('mouse move detected', e)
        if (moving) {
            move(e)
        }
    }
    function initialClick(e) {

        if (moving) {
            moving = !moving;
            return;
        }

        moving = !moving;
    }

    React.useEffect(() => {
        // Update the image position whenever the point position changes
        setImagePosition(pointPosition);
    }, [pointPosition]);

    const AttckerLeft = '1rem';
    const AttckerRight = '';

    const OpponentLeft = '';
    const OpponentRight = '1rem';
    const defaultValue = "primary";

    return (
        <Grid container spacing={2} style={{ height: '100vh', overflow: 'hidden' }} >
            {/* First Row */}
            <Grid item xs={4} style={{ height: '10vh' }}>
                <UserAvatar left="1rem">
                    <Avatar alt="WoodenBat" src="/static/images/avatar/1.jpg" />
                    <Grid container direction="column">
                        <Progress label="Energy" percentComplete={70} />
                        <Progress label="HP" percentComplete={30} />
                    </Grid>
                </UserAvatar>
            </Grid>
            <Grid item xs={4} style={{ height: '10vh', zIndex: 10 }}>
                <BottomNavigation showLabels value={option} onChange={manageOption}>
                    <BottomNavigationAction label="Settlement" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="Run Away" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Surrender" icon={<LocationOnIcon />} />
                </BottomNavigation>
            </Grid>
            <Grid item xs={4} style={{ height: '10vh' }}>
                <UserAvatar right="1rem">
                    <Avatar alt="WoodenBat" src="/static/images/avatar/1.jpg" />
                    <Grid container direction="column">
                        <Progress label="HP" percentComplete={30} />
                    </Grid>
                </UserAvatar>
            </Grid>

            {/* Second Row */}
            <Grid item xs={6} onMouseMove={onCrosshairContainerMouseMove} style={{ position: 'relative', overflow: 'hidden', width: '50%', height: '60vh' }}>
                {bloodFlash ? <GunFire /> : ''}
                <Box className={`blood blood${blood}`}></Box>
                {!bloodFlash &&
                    <Box
                        sx={{
                            backgroundColor: 'red',
                            position: "absolute",
                            width: BOX_WIDTH,
                            height: BOX_HEIGHT,
                            top: "30%",
                            bottom: "30%",
                            left: AttckerLeft ? AttckerLeft : "auto",
                            right: AttckerRight ? AttckerRight : "auto",
                            backgroundImage: `url("../images/gunaim.svg")`,
                            backgroundSize: 'contain',
                        }}
                        ref={followRef}
                        onClick={initialClick}
                    ></Box>}
            </Grid>
            <Grid item xs={6} style={{ height: '60vh' }}>
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

            </Grid>

            {/* Third Row */}
            <Grid item xs={6} style={{ height: '10vh' }}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                    <RadioGroup
                        row
                        defaultValue={defaultValue}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <Box>
                            <Tooltip title="Account settings">
                                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                                    <Avatar sx={{ width: 52, height: 32 }} variant="square">M</Avatar>
                                </IconButton>
                            </Tooltip>
                            <FormControlLabel value="primary" control={<Radio />} label="Primary" />
                        </Box>
                        <Box>
                            <Tooltip title="Account settings">
                                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                                    <Avatar sx={{ width: 52, height: 32 }} variant="square">M</Avatar>
                                </IconButton>
                            </Tooltip>
                            <FormControlLabel value="secondary" control={<Radio />} label="Secondary" />
                        </Box>
                        <Box>
                            <Tooltip title="Account settings">
                                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                                    <Avatar sx={{ width: 52, height: 32 }} variant="square">M</Avatar>
                                </IconButton>
                            </Tooltip>
                            <FormControlLabel value="armor" control={<Radio />} label="Armor" />
                        </Box>
                        <Tooltip title="Attack">
                            <IconButton onClick={handleAttackHit} disabled={bloodFlash} color="secondary" aria-label="add an alarm">
                                <AlarmIcon />
                            </IconButton>
                        </Tooltip>
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
            <Grid item xs={6} style={{ height: '10vh' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Box sx={{ paddingInline: 1, flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography>Damage Efficiency</Typography>
                        <Slider sx={{ paddingTop: 0 }} aria-label="ios slider" defaultValue={60} marks={marks} valueLabelDisplay="on" />
                    </Box>
                    <Box sx={{ paddingInline: 1, flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography >Damage Efficiency</Typography>
                        <Slider sx={{ paddingTop: 0 }} aria-label="ios slider" defaultValue={60} marks={marks} valueLabelDisplay="on" />
                    </Box>
                    <Box sx={{ paddingInline: 1, flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography >Damage Efficiency</Typography>
                        <Slider sx={{ paddingTop: 0 }} aria-label="ios slider" defaultValue={60} marks={marks} valueLabelDisplay="on" />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Attack;
//to do list
//shaking effect
//blood effect
//smoke effect of weapons like guns

// function generateRandomNumber(splashesUsed) {
//     let randomNumber = Math.floor(Math.random() * 3);

//     // If the array has reached its size limit, create a new array without the oldest element
//     let newSplashesUsed = splashesUsed.length === 3 ? splashesUsed.slice(1) : splashesUsed;

//     // Check if the generated number is in the array
//     if (newSplashesUsed.includes(randomNumber)) {
//         // Call the function recursively with the current state of the array
//         return generateRandomNumber(newSplashesUsed);
//     }

//     // Return a new array with the new number, maintaining immutability
//     return [...newSplashesUsed, randomNumber];
// }

// // Initialize the splashesUsed array
// let randomNumber = generateRandomNumber(let splashesUsed = []);
// setBlood(randomNumber);