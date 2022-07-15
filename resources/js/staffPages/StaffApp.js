import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Body from '../components/Staff/Body';
import Footer from '../components/Staff/Footer';
import Header from "../components/Staff/Header";
import { AuthContext } from "../libraries/AuthContext";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

export default function StaffApp() {
    const { user, setUser, unsetUser, staffPanelAccess, setStaffPanelAccess } = React.useContext(AuthContext);

    const classes = useStyles();
    const theme = useTheme();
    const handleSaccess = async () => {

    const result = gameServerApi("saccess");
        setStaffPanelAccess(false);
    }

    console.log(staffPanelAccess)
    return (
        <React.Fragment>
            <div onClick={handleSaccess}> Back to player </div>
            <div className={classes.root}>
                <CssBaseline />
                <Header />
                <Body />
            </div>
        </React.Fragment>
    )
}
