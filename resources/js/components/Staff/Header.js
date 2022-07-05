import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Header() {
    return (
        <React.Fragment>
            <Navbar />
            <Sidebar />
        </React.Fragment>

    )
}
