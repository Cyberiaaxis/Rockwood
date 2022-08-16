import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Body from '../components/Staff/Body';
import Footer from '../components/Staff/Footer';
import Header from "../components/Staff/Header";
import PanelComponent from "../components/Staff/PanelComponent";

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
    },
}));

export default function StaffApp() {
    const classes = useStyles();
    const theme = useTheme();
    const [myComponent, setMyComponent] = useState(<Footer />);
    // console.log("StaffApp()", myComponent);
    return (
        <React.Fragment>
            <div className={classes.root}>
                <CssBaseline />
                <Header setMyComponent={setMyComponent} />
                <Body> { myComponent.url ? <PanelComponent data={myComponent} /> : myComponent   }</Body>
            </div>
        </React.Fragment>
    )
}
