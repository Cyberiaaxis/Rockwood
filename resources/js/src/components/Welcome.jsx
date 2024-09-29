// Import necessary libraries and components
import * as React from "react";
import { styled } from "@mui/material/styles";
import "../styles/Welcome.css"; // Import custom CSS styles
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
} from '@mui/material'; // Material-UI components
import AnimatedScrollDiv from "./AnimatedScrollDiv"; // Custom animated scrolling component
import {
    ArrowForwardIos as ArrowForwardIosIcon,
    Email as EmailIcon,
    Key as KeyIcon,
    Info as InfoIcon,
    Upgrade as UpgradeIcon,
    Chat as ChatIcon,
    Help as HelpIcon,
    Close as CloseIcon,
} from '@mui/icons-material'; // Material-UI icons
import About from "./About"; // About page component
import Help from "./Help"; // Help page component
import DisplayEvent from "./DisplayEvents"; // Component to display events
import Discussions from "./Discussions"; // Discussions page component
import Upcomings from "./Upcomings"; // Upcoming events page component
import Registration from "./Registration"; // Registration component
import gameServerApi from "../libraries/gameServerApi"; // API utility for server interactions
import { useForm } from "react-hook-form"; // Hook for managing form state
import { AuthContext } from "../libraries/AuthContext"; // Context for user authentication state
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { toast } from "react-toastify"; // Library for toast notifications

// Define a custom styled component for layout items
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff", // Conditional styling based on theme
    ...theme.typography.body2, // Typography styles
    padding: theme.spacing(1), // Padding
    textAlign: "center", // Center text alignment
    color: theme.palette.text.secondary, // Text color
}));

// Define the Welcome component as a functional component
export default function Welcome() {
    // State variables
    const [showPassword, setShowPassword] = React.useState(false); // Toggle password visibility
    const [currentBackgroundImage, setCurrentBackgroundImage] = React.useState(0); // Track current background image index
    const { setUser } = React.useContext(AuthContext); // Retrieve the setUser function from context
    const [page, setPage] = React.useState(false); // Track which page to display
    const [welcomeData, setWelcomeData] = React.useState({ // State for welcome data
        players: [],
        images: [],
        events: [],
        gangs: [],
    });

    // Navigation hook for redirecting after login
    const navigate = useNavigate();

    // Form handling using react-hook-form
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();

    // Function to fetch welcome data from the API
    const getWelcomeData = async () => {
        try {
            const {
                gangs,
                events,
                players,
                images
            } = await gameServerApi("welcomelist"); // Fetch data
            // console.log("Fetched welcome data:", { gangs, events, players, images }); // Log fetched data
            setWelcomeData({ gangs, events, players, images }); // Update state with fetched data
        } catch (error) {
            console.error("Error fetching welcome data:", error); // Handle error
        }
    };

    // Define menu items for the navigation bar
    const menuItems = [
        {
            id: 'about',
            text: 'About',
            icon: <InfoIcon />,
            color: 'blue'
        },
        {
            id: 'upcoming',
            text: 'Upcoming',
            icon: <UpgradeIcon />,
            color: 'green'
        },
        {
            id: 'discussion',
            text: 'Discussion',
            icon: <ChatIcon />,
            color: 'black'
        },
        {

            id: 'help',
            text: 'Help',
            icon: <HelpIcon />,
            color: 'green'
        },
        {
            id: 'join-us',
            text: 'Join Us',
            icon: <InfoIcon />,
            color: 'blue'
        },
    ];

    // Fetch welcome data when the component mounts
    React.useEffect(() => {
        getWelcomeData(); // Call data fetching function
    }, []);

    // Change the background image at regular intervals
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBackgroundImage(
                (prevImage) =>
                    (prevImage + 1) % welcomeData.images.length
            ); // Update image index
        }, 45000); // Change image every 45 seconds
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [welcomeData.images.length]);

    // Component to render the currently active page
    const ActivePage = React.memo(() => {
        const pages = {
            about: <About />,
            help: <Help />,
            discussion: <Discussions />,
            upcoming: <Upcomings />,
            "join-us": <Registration onClose={() => setPage(null)} />,
        };
        return pages[page] || null; // Render the active page or null if none
    });

    // Handle menu item click to open corresponding component
    const handleClickOpenComponent = (e) => {
        setPage(e.target.value); // Set the current page based on button click
    };

    // Form submission handler
    const onSubmit = async (data) => {
        await toast.promise(
            gameServerApi("auth/login", 'POST', data), // API call for login
            {
                pending: "Please wait, we are logging you in.", // Pending state
                success: {
                    theme: 'colored',
                    position: 'top-center',
                    render({ data }) {
                        setUser(data.userId); // Update user context
                        navigate('/dashboard'); // Redirect to dashboard
                    },
                },
                error: {
                    theme: 'colored',
                    position: 'top-center',
                    render({ data }) {
                        reset(); // Reset form fields
                        return Array.isArray(data) ?
                            data.map((msg, i) =>
                                <div key={i}>{msg}</div>) :
                            data?.message; // Display error messages
                    },
                },
            }
        );
    };

    // Render the Welcome component
    return (
        <React.Fragment>
            <Box
                className="background-carousel"
                sx={{
                    "--bg-img": `url(${welcomeData.images[currentBackgroundImage]})`
                }} // Set background image
            >
                <AppBar
                    position="static"
                    elevation={0}
                    color='transparent'>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                href="/" sx={{ mr: 2 }}
                            >
                                <Avatar
                                    sx={{ width: 60, height: 60 }}
                                    alt="Cyberia"
                                    src="/images/logo.png" />
                            </IconButton>

                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: 'none', md: 'flex' }
                                }}
                            >
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
                                <Box
                                    component='form'
                                    sx={{
                                        p: '2px 4px',
                                        gap: 1,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    method="POST"
                                    onSubmit={handleSubmit(onSubmit)} // Handle form submission
                                >
                                    <Input
                                        size='small'
                                        placeholder="Email"
                                        type='email'
                                        {...register("email", { required: true })} // Register email field
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
                                        {...register("password", { required: true })} // Register password field
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <KeyIcon sx={{ color: "green" }} />
                                            </InputAdornment>
                                        }
                                    />
                                    <Tooltip title="Login">
                                        <IconButton
                                            type='submit' sx={{ paddingTop: 1 }}
                                            color="success"
                                        >
                                            <ArrowForwardIosIcon
                                                sx={{ color: "red" }} />
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
                                <Typography
                                    sx={{ backgroundColor: "green" }}
                                    variant="h5" border={1}
                                    color="common.white"
                                    gutterBottom
                                >
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
                                        <IconButton
                                            sx={{ color: "red" }}
                                            onClick={() => setPage(false)}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    )}
                                    {
                                        page ?
                                            <ActivePage /> :
                                            <DisplayEvent
                                                events={welcomeData.events} />
                                    } {/* Render active page or events */}
                                </Typography>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Item sx={{ backgroundColor: "transparent" }}>
                            <Box sx={{ paddingTop: 20 }}>
                                <Typography
                                    sx={{
                                        border: 1,
                                        boxShadow: 3,
                                        backgroundColor: "green"
                                    }}
                                    variant="h5"
                                    color="common.white"
                                    gutterBottom
                                >
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
                        <Item sx={{
                            backgroundColor: "transparent",
                            position: "fixed",
                            bottom: 0
                        }}>
                            <Typography
                                variant="h5"
                                color="common.white"
                                gutterBottom sx={{
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
