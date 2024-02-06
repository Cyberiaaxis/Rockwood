import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// Icons
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import RoleIcon from '@mui/icons-material/Tune';
import RankIcon from '@mui/icons-material/MilitaryTech';
import PermissionIcon from '@mui/icons-material/Assignment';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


const pages = {
    roles: { name: "Role", table: "roles", url: "saveRole" },
    permissions: { name: "Permission", table: "permissions", url: "savePermission" },
    ranks: { name: "Rank", table: "ranks", url: "saveRank" },
    users: { name: "Users", table: "users", url: "saveUsers" },
    realEstate: { name: "Real Estate", table: "real_estates", url: "saveRealEstate" },
    job: { name: "Job", table: "jobs", url: "saveJob" },
    shop: { name: "Shop", table: "shops", url: "saveShop" },
    course: { name: "Course", table: "courses", url: "saveCourse" },
    gang: { name: "Gang", table: "Gangs", url: "saveGang" },
    country: { name: "Country", table: "countries", url: "saveCountry" },
    city: { name: "City", table: "cities", url: "saveCity" },
    area: { name: "Area", table: "areas", url: "saveArea" },
};

const menuItems = [
    {
        label: 'roles',
        text: 'Role',
        icon: <RoleIcon />
    },
    {
        label: 'permissions',
        text: 'Permissions',
        icon: <PermissionIcon />,
        divider: true,
    },
    {
        label: 'users',
        text: 'Users',
        icon: <PeopleIcon />
    },
    {
        label: 'realEstate',
        text: 'Real Estate',
        icon: <ApartmentIcon />,
        divider: true,
    },
    {
        label: 'settings',
        text: 'Settings',
        icon: <SettingsIcon />
    },
]

export default function Sidebar(props) {
    const theme = useTheme();
    const { open, setOpen, setMyComponent } = props;

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar />
            <Divider />
            <List>
                {menuItems.map((m, index) => (
                    <React.Fragment key={index}>
                        {m.divider ? <Divider /> : ''}
                        <ListItem key={m.label} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => setMyComponent(pages[m.label])}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {m.icon}
                                </ListItemIcon>
                                <ListItemText primary={m.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
}
