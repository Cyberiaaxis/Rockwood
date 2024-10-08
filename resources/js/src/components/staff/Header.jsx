import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Header(props) {

    const { setMyComponent } = props
    const [open, setOpen] = React.useState(true);

    return (
        <React.Fragment>
            <Navbar open={open} setOpen={setOpen} />
            <Sidebar open={open} setOpen={setOpen} setMyComponent={setMyComponent} />
        </React.Fragment>
    )
}
