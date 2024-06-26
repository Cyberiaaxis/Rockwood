import React from 'react';
import gameServerApi from '../../libraries/gameServerApi';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory, Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PanelComponent from "./PanelComponent";
// import Rank from "./Rank";
// import Role from "./Role";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));


export default function Sidebar(props) {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();

    const { open, setOpen, myComponent, setMyComponent } = props;
    // console.log("myComponent", myComponent);
    const handleRSaccess = async () => {
        const result = await gameServerApi("rsaccess");
        history.push("/dashboard/");
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleClick = async (e) => {
        // console.log(e.target.innerText);
        // <PanelComponent name='Rank' table='ranks' url="makeRank" />
        // const result = await gameServerApi("rsaccess");
        // history.push("/dashboard");
    }
    const pages = {
        Role: { name: "Role", table: "roles", url: "saveRole" }, //works well
        Permission: { name: "Permission", table: "permissions", url: "savePermission" }, //works well
        Rank: { name: "Rank", table: "ranks", url: "saveRank" }, //works well
        RealEstate: { name: "Real Estate", table: "real_estates", url: "saveRealEstate" },
        RequirementsAndEffects: { name: "Requirements And Effects", table: "requirements_and_effects", url: "saveRequirementsAndEffects" },

        // Job: { name: "Job", table: "jobs", url: "saveJob" },
        // Shop: { name: "Shop", table: "shops", url: "saveShop" },
        // Course: { name: "Course", table: "courses", url: "saveCourse" },
        // Gang: { name: "Gang", table: "Gangs", url: "saveGang" },
        // Country: { name: "Country", table: "countries", url: "saveCountry" },
        // City: { name: "City", table: "cities", url: "saveCity" },
        // Area: { name: "Area", table: "areas", url: "saveArea" },
    };

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {[
                    // 'Back to profile',
                    'Role',
                    'Rank',
                    'RealEstate',
                    'Benefits',
                    'Permission',
                    'RequirementsAndEffects',
                ].map((text, index) => (
                    <ListItem button key={text} onClick={(e) => setMyComponent(pages[text])}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText onClick={(e) => setMyComponent(pages[text])} primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </Drawer >
    )
}
// https://paste.gg/p/anonymous/72c10ffc7ec741f28658c8c1d3a20279
