import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Body from '../components/Staff/Body';
import Footer from '../components/Staff/Footer';
import Header from "../components/Staff/Header";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

export default function StaffApp() {

    const classes = useStyles();
    const theme = useTheme();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <CssBaseline />
                <Header />
                <Body />
            </div>
        </React.Fragment>
    )
}
