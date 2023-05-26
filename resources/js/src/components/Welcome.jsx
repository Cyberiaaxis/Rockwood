import * as React from "react";
import { styled } from "@mui/material/styles";
import "../styles/Welcome.css";
import { Paper, AppBar, Avatar, Button, Container, FormControl, Box, Grid, IconButton, Input, InputAdornment, InputBase, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import AnimatedScrollDiv from "./AnimatedScrollDiv";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import InfoIcon from '@mui/icons-material/Info';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import ChatIcon from '@mui/icons-material/Chat';
import HelpIcon from '@mui/icons-material/Help';
import About from "./About";
import Help from "./Help";
import DisplayEvent from "./DisplayEvents";
import Discussions from "./Discussions";
import Upcomings from "./Upcomings";
import Registration from "./Registration";
import gameServerApi from "../libraries/gameServerApi";
import { useForm } from "react-hook-form";
import { AuthContext } from "../libraries/AuthContext";
import { useNavigate } from "react-router-dom";
// import axios, { isCancel, AxiosError } from "axios";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));



export default function Welcome() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [currentBackgroundImage, setCurrentBackgroundImage] = React.useState(0);
    const { user, setUser } = React.useContext(AuthContext);
    const [page, setPage] = React.useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const {
        register,
        setError,
        formState: { errors },
        handleSubmit,
        clearErrors,
    } = useForm();

    const items = [
        "Rockwood",
        "efdee",
        "Bill Gates",
        "Steve Jobs",
        "Linus Torvalds",
        "Rockwood",
        "efdee",
        "Bill Gates",
        "Steve Jobs",
        "Linus Torvalds",
        "Rockwood",
        "efdee",
        "Bill Gates",
        "Steve Jobs",
        "Linus Torvalds"
    ];

    const menuItems = [
        {
            id: 'about',
            text: 'About',
            icon: <InfoIcon />,
            color: 'blue',
        },
        {
            id: 'upcoming',
            text: 'Upcoming',
            icon: <UpgradeIcon />,
            color: 'green',
        },
        {
            id: 'discussion',
            text: 'Discussion',
            icon: <ChatIcon />,
            color: 'black',
        },
        {
            id: 'help',
            text: 'Help',
            icon: <HelpIcon />,
            color: 'green',
        },
        {
            id: 'join-us',
            text: 'Join Us',
            icon: <InfoIcon />,
            color: 'blue',
        },
    ];


    const images = ["https://picsum.photos/1024/768", "https://picsum.photos/1280/1024"];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBackgroundImage((prevImage) => (prevImage + 1) % images.length);
        }, 45000);
        return () => clearInterval(interval);
    }, [images.length, currentBackgroundImage]);

    function ActivePage() {
        const pages = {
            about: <About />,
            help: <Help />,
            discussion: <Discussions />,
            upcoming: <Upcomings />,
            "join-us": <Registration />,
        };
        return pages[page]
    }

    const handleClickOpenComponent = (e) => {
        // console.log("***page name string***", e.target.value);
        setPage(e.target.value);
    }
    const onSubmit = async (data) => {
        console.log("data", data);
        const result = await gameServerApi("auth/login", 'POST', data);
        // console.log("result", result);
        if (result.userId) {
            const userDetails = {
                userId: result.userId,
                loggedIn: true
            };
            setUser(userDetails);
            navigate("/dashboard");
        } else {
            console.log("*** error display ", result);
            for (const [fieldName, errors] of Object.entries(result.errors)) {
                setError(fieldName, {
                    type: "manual",
                    message: errors[0],
                });
            }

            setTimeout(() => {
                clearErrors();
            }, 10000);
        }
    };
    return (
        <React.Fragment>
            <Box
                className="background-carousel"
                sx={{
                    "--bg-img": `url(${images[currentBackgroundImage]})`
                }}

            >
                <AppBar position="static" elevation={0} color='transparent'>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                href="/welcome"
                                sx={{ mr: 2 }}
                            >
                                <Avatar sx={{ width: 60, height: 60 }} alt="Cyberia" src="/images/logo.jpg" />
                            </IconButton>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {menuItems.map((page) => (
                                    <Button
                                        sx={{ color: page.color }}
                                        startIcon={page.icon}
                                        key={page.text}
                                        value={page.id}
                                        onClick={handleClickOpenComponent}
                                    >
                                        {page.text}
                                    </Button>
                                ))}
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                <Box component='form' sx={{ p: '2px 4px', gap: 1, display: 'flex', alignItems: 'center' }} method="POST" onSubmit={handleSubmit(onSubmit)}>

                                    <Input
                                        size='small'
                                        placeholder="Email"
                                        type='email'
                                        {...register("email", { required: true })}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <EmailIcon sx={{ color: "green" }} />
                                            </InputAdornment>
                                        }
                                    />

                                    <Input
                                        size='small'
                                        placeholder='Password'
                                        type='password'
                                        {...register("password", { required: true })}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <KeyIcon sx={{ color: "green" }} />
                                            </InputAdornment>
                                        }
                                    />

                                    <Tooltip title="Login">
                                        <IconButton type='submit' paddingTop={1} color="success">
                                            <ArrowForwardIosIcon sx={{ color: "red" }} />
                                        </IconButton>
                                    </Tooltip>

                                </Box>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Grid container spacing={2}>
                    <Grid item xs={2} md={2}>
                        <Item sx={{ backgroundColor: "transparent" }}>
                            <Box sx={{ paddingTop: 20 }} >
                                <Typography sx={{ backgroundColor: "green" }} variant="h5" border={1} color="common.white" gutterBottom>
                                    Top Players
                                </Typography>
                                <AnimatedScrollDiv
                                    className="topplayers"
                                    style={{ height: 200 }}
                                    items={items}
                                />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={8} md={8}>
                        <Item sx={{ backgroundColor: "transparent" }}>
                            <Box sx={{ textAlign: "center", top: 0, bottom: 0, height: 550, width: "100%" }}>
                                <Typography variant="h5" color="common.black" gutterBottom>
                                    {page ? <ActivePage /> : <DisplayEvent switched={currentBackgroundImage} />}
                                </Typography>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Item sx={{ backgroundColor: "transparent" }}>
                            <Box sx={{ paddingTop: 20 }}>
                                <Typography sx={{ boxShadow: 3, backgroundColor: "green" }} variant="h5" border={1} color="common.white" gutterBottom>
                                    Top Players
                                </Typography>
                                <AnimatedScrollDiv
                                    className="topplayers"
                                    style={{ height: 200 }}
                                    items={items}
                                />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Item sx={{ backgroundColor: "transparent", position: "fixed", bottom: 0 }}>
                            <Typography variant="h5" color="common.white" gutterBottom>
                                Copyright &copy; 2023
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
