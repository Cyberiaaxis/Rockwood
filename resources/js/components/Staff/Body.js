import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        padding: 120,
        paddingTop:20,
    //   backgroundColor: 'blue',
    },
  });

export default function Body({ children }) {

    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.root}>
                {children}
            </div>
        </React.Fragment>

    )
}
