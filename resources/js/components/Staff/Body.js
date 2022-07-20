import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 7,
        padding: theme.spacing(15),
    },
}));

export default function Body({ children }) {

    const classes = useStyles();
    console.log("children", children);
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
        </main>
    )
}
