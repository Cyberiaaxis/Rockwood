import React, { useRef, useState } from "react";

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
    TextField,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Fab,
    SliderRoot,
    styled,
    ListSubheader,
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

function Attack(props) {
    const [shake, setShake] = React.useState(false);
    const [fire, setFire] = React.useState(false);
    const [option, setOption] = React.useState(0);
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const [weapon, setWeapon] = React.useState({
        primaryWeapon: 0,
        secondaryWeapon: 0,
        armor: 0
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    const [blood, setBlood] = React.useState(null);

    const menuref = React.useRef(null);

    const Video = styled("video")(({ theme }) => ({
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "block",
        width: "100%",
    }));
// console.log(weapon);
    // function Gunfire() {
    //     console.log(gunfire);
    //     return (
    //         <Video controls autoPlay width="100%" height="100%">
    //             <source src={gunfire} type="video/mov"></source>
    //         </Video>
    //     );
    // }

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

        // console.log(splashesUsed);

        // Buttons tops to shake after 2 seconds
        setTimeout(() => {
            setShake(false);
        }, 5000);
    };

    const manageOption = (event, newValue) => {
        setOption(newValue);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setWeapon(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log("name", name);
        console.log("value", value);
    };

    const handleOpen = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const handleClose = (event) => {
        console.log(event);
        event.preventDefault();
        setAnchorEl(null);
        setOpen(null);
        setPlacement(null);
    };

    const colorChange = (event) => {};

    const UserAvatar = styled("div")(({ theme, left, right }) => ({
        position: "absolute",
        top: "1rem",
        display: "grid",
        gridTemplateColumns: "2.5rem minmax(0, 1fr)",
        gap: "0.5rem",
        left: left || "auto",
        right: right || "auto",
    }));

    const AtkOptions = styled("div")(({ theme, left, right }) => ({
        position: "absolute",
        top: "30%",
        bottom: "30%",
        left: left || "auto",
        right: right || "auto",
    }));

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    const iOSBoxShadow = "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

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

    const IOSSlider = styled(Slider)(({ theme }) => ({
        color: theme.palette.mode === "dark" ? "#3880ff" : "#3880ff",
        height: 2,
        padding: "15px 0",
        "& .MuiSlider-thumb": {
            height: 28,
            width: 28,
            backgroundColor: "#fff",
            boxShadow: iOSBoxShadow,
            "&:focus, &:hover, &.Mui-active": {
                boxShadow: "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                    boxShadow: iOSBoxShadow,
                },
            },
        },
        "& .MuiSlider-valueLabel": {
            fontSize: 12,
            fontWeight: "normal",
            top: -6,
            backgroundColor: "unset",
            color: theme.palette.text.primary,
            "&:before": {
                display: "none",
            },
            "& *": {
                background: "transparent",
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
            },
        },
        "& .MuiSlider-track": {
            border: "none",
        },
        "& .MuiSlider-rail": {
            opacity: 0.5,
            backgroundColor: "#bfbfbf",
        },
        "& .MuiSlider-mark": {
            backgroundColor: "#bfbfbf",
            height: 8,
            width: 1,
            "&.MuiSlider-markActive": {
                opacity: 1,
                backgroundColor: "currentColor",
            },
        },
    }));

    return (
        <Box className={clsx("attack", "main", "shake" && "fire")} position="relative">
            <UserAvatar left="1rem">
                <Avatar alt="WoodenBat" src="/static/images/avatar/1.jpg" />
                <Grid container direction="column">
                    <progress id="progress1" max="100" value="70">
                        60%
                    </progress>
                    <progress id="progress1" max="100" value="70">
                        60%
                    </progress>
                </Grid>
            </UserAvatar>

            <UserAvatar right="1rem">
                <Avatar alt="WoodenBat" src="/static/images/avatar/1.jpg" />
                <Grid container direction="column">
                    <progress id="progress1" max="100" value="70">
                        60%
                    </progress>
                    <progress id="progress1" max="100" value="70">
                        60%
                    </progress>
                </Grid>
            </UserAvatar>
            {/* {fire && (
                <Box>
                     <Gunfire/>
                </Box>
            )} */}

            <Box className={`blood blood${blood}`}></Box>

            <AtkOptions left="1rem" className="weapon" />

            {/* <AtkOptions right="1rem">

            </AtkOptions> */}

            <Box className="action">
                <Box padding={1}>
                    <BottomNavigation showLabels value={option} onChange={manageOption}>
                        <BottomNavigationAction label="Settlement" icon={<RestoreIcon />} />
                        <BottomNavigationAction label="Run Away" icon={<FavoriteIcon />} />
                        <BottomNavigationAction label="Surrender" icon={<LocationOnIcon />} />
                    </BottomNavigation>
                </Box>
            </Box>

            <Grid container className="bottom-menu">
                <Grid item xs className="">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem",
                        }}
                    >
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Primary Weapon</InputLabel>
                            <Select placeholder="Primary Weapon" fullWidth labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" name={"primaryWeapon"} value={weapon.primaryWeapon} onChange={handleChange} displayEmpty={true} autoWidth={true}>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={60}>
                                    pm1
                                </MenuItem>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={70}>
                                pm2
                                </MenuItem>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={80}>
                                pm3
                                </MenuItem>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={90}>
                                    pm4
                                </MenuItem>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={100}>
                                pm5
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Button sx={{ flexShrink: 0 }} variant="contained" color="primary" onClick={animate}>
                            Hit Him
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem",
                        }}
                    >
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Secondary Weapon</InputLabel>
                            <Select fullWidth labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" name={"secondaryWeapon"} value={weapon.secondaryWeapon} onChange={handleChange} displayEmpty={true} autoWidth={true}>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={60}>
                                    sw1
                                </MenuItem>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={70}>
                                sw2
                                </MenuItem>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={80}>
                                sw3
                                </MenuItem>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={90}>
                                sw4
                                </MenuItem>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={100}>
                                sw5
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Button sx={{ flexShrink: 0 }} variant="contained" color="primary" onClick={animate}>
                            Hit Him
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem",
                        }}
                    >
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Armor</InputLabel>
                            <Select fullWidth labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" name={"armor"} value={weapon.armor} onChange={handleChange} displayEmpty={true} autoWidth={true}>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={60}>
                                    ar1
                                </MenuItem>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={70}>
                                ar2
                                </MenuItem>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={80}>
                                ar3
                                </MenuItem>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={90}>
                                ar4
                                </MenuItem>
                                <MenuItem ref={menuref} onMouseEnter={handleOpen("right-start")} onMouseLeave={handleClose} value={100}>
                                ar5
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Button sx={{ flexShrink: 0 }} variant="contained" color="primary" onClick={animate}>
                            Hit Him
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs className="stats">
                    <Box sx={{ paddingTop: 6 }}>
                        <IOSSlider aria-label="ios slider" defaultValue={60} marks={marks} valueLabelDisplay="on" />
                        <IOSSlider aria-label="ios slider" defaultValue={60} marks={marks} valueLabelDisplay="on" />
                        <IOSSlider aria-label="ios slider" defaultValue={60} marks={marks} valueLabelDisplay="on" />
                    </Box>
                </Grid>
                <Grid item xs className="chat">
                    <Item>xs</Item>
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
