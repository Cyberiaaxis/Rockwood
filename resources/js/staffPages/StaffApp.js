import React, { useState } from 'react'
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
    const [myComponent, setMyComponent] = useState(<Footer/>);

    return (
        <React.Fragment>
            <div className={classes.root}>
                <CssBaseline />
                <Header setMyComponent={setMyComponent} />
                <Body>{myComponent}</Body>
            </div>
        </React.Fragment>
    )
}
