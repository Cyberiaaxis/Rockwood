// Import necessary libraries and components
import * as React from "react";
import { styled } from "@mui/material/styles";
import "../styles/Welcome.css";
import {
    AppBar,
    Avatar,
    Button,
    Container,
    Box,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    Toolbar,
    Typography,
    Paper,
    Tooltip,
} from '@mui/material';
import AnimatedScrollDiv from "./AnimatedScrollDiv";
import {
    ArrowForwardIos as ArrowForwardIosIcon,
    Email as EmailIcon,
    Key as KeyIcon,
    Info as InfoIcon,
    Upgrade as UpgradeIcon,
    Chat as ChatIcon,
    Help as HelpIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
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
import { toast } from "react-toastify";

// Define custom styled component for items
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

// Define the Welcome component
export default function Welcome() {
    // State variables
    const [showPassword, setShowPassword] = React.useState(false);
    const [currentBackgroundImage, setCurrentBackgroundImage] = React.useState(0);
    const { setUser } = React.useContext(AuthContext);
    const [page, setPage] = React.useState(false);
    const [welcomeData, setWelcomeData] = React.useState({
        players: [],
        images: [],
        events: [],
        gangs: [],
    });

    // Navigation hook
    const navigate = useNavigate();

    // Form handling with react-hook-form
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();

    // Fetch welcome data from API
    const getWelcomeData = async () => {
        try {
            const { gangs, events, players, images } = await gameServerApi("welcomelist");
            console.log("Fetched welcome data:", { gangs, events, players, images });
            setWelcomeData({ gangs, events, players, images });
        } catch (error) {
            console.error("Error fetching welcome data:", error);
        }
    };

    // Define menu items
    const menuItems = [
        { id: 'about', text: 'About', icon: <InfoIcon />, color: 'blue' },
        { id: 'upcoming', text: 'Upcoming', icon: <UpgradeIcon />, color: 'green' },
        { id: 'discussion', text: 'Discussion', icon: <ChatIcon />, color: 'black' },
        { id: 'help', text: 'Help', icon: <HelpIcon />, color: 'green' },
        { id: 'join-us', text: 'Join Us', icon: <InfoIcon />, color: 'blue' },
    ];

    // Fetch welcome data on component mount
    React.useEffect(() => {
        getWelcomeData();
    }, []);

    // Change background image at regular intervals
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBackgroundImage((prevImage) => (prevImage + 1) % welcomeData.images.length);
        }, 45000);
        return () => clearInterval(interval);
    }, [welcomeData.images.length]);

    // Render active page based on selected page
    const ActivePage = React.memo(() => {
        const pages = {
            about: <About />,
            help: <Help />,
            discussion: <Discussions />,
            upcoming: <Upcomings />,
            "join-us": <Registration onClose={() => setPage(null)} />,
        };
        return pages[page] || null;
    });

    // Handle click event to open component
    const handleClickOpenComponent = (e) => {
        setPage(e.target.value);
    };

    // Form submission handler
    const onSubmit = async (data) => {
        await toast.promise(
            gameServerApi("auth/login", 'POST', data),
            {
                pending: "Please wait, we are logging you in.",
                success: {
                    theme: 'colored',
                    position: 'top-center',
                    render({ data }) {
                        setUser(data.userId);
                        navigate('/dashboard');
                    },
                },
                error: {
                    theme: 'colored',
                    position: 'top-center',
                    render({ data }) {
                        reset();
                        return Array.isArray(data) ? data.map((msg, i) => <div key={i}>{msg}</div>) : data?.message;
                    },
                },
            }
        );
    };

    // Return the JSX for the Welcome component
    return (
        <React.Fragment>
            <Box
                className="background-carousel"
                sx={{ "--bg-img": `url(${welcomeData.images[currentBackgroundImage]})` }}
            >
                <AppBar position="static" elevation={0} color='transparent'>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <IconButton edge="start" color="inherit" aria-label="open drawer" href="/" sx={{ mr: 2 }}>
                                <Avatar sx={{ width: 60, height: 60 }} alt="Cyberia" src="/images/logo.png" />
                            </IconButton>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {menuItems.map((item) => (
                                    <Button
                                        sx={{ color: item.color }}
                                        startIcon={item.icon}
                                        key={item.text}
                                        value={item.id}
                                        onClick={handleClickOpenComponent}
                                    >
                                        {item.text}
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
                                        <IconButton type='submit' sx={{ paddingTop: 1 }} color="success">
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
                            <Box sx={{ paddingTop: 20 }}>
                                <Typography sx={{ backgroundColor: "green" }} variant="h5" border={1} color="common.white" gutterBottom>
                                    Top Players
                                </Typography>
                                <AnimatedScrollDiv
                                    className="topplayers"
                                    style={{ height: 200 }}
                                    items={welcomeData.players}
                                    delayTime={0}
                                />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={8} md={8}>
                        <Item sx={{ backgroundColor: "transparent" }}>
                            <Box sx={{ textAlign: "center", height: 550 }}>
                                <Typography variant="h5" color="common.black" gutterBottom>
                                    {page && (
                                        <IconButton sx={{ color: "red" }} onClick={() => setPage(false)}>
                                            <CloseIcon />
                                        </IconButton>
                                    )}
                                    {page ? <ActivePage /> : <DisplayEvent events={welcomeData.events} />}
                                </Typography>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Item sx={{ backgroundColor: "transparent" }}>
                            <Box sx={{ paddingTop: 20 }}>
                                <Typography sx={{ boxShadow: 3, backgroundColor: "green" }} variant="h5" border={1} color="common.white" gutterBottom>
                                    Top Gangs
                                </Typography>
                                <AnimatedScrollDiv
                                    className="topplayers"
                                    style={{ height: 200 }}
                                    items={welcomeData.gangs}
                                    delayTime={1}
                                />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Item sx={{ backgroundColor: "transparent", position: "fixed", bottom: 0 }}>
                            <Typography variant="h5" color="common.white" gutterBottom sx={{
                                fontFamily: 'cursive',
                                fontSize: '1.5rem',
                                textShadow: '1px 1px 2px #000000',
                                letterSpacing: '1px',
                                fontWeight: 'bold'
                            }}>
                                Cyberia &copy; 2023
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
