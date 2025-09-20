import React, { useContext, useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { ThemeContext } from '../../contexts/ThemeContext';
 // Import DesktopNavbar component
import DrawerNavbar from './DrawerNavbar'; // Import the existing DrawerNavbar component
import DesktopNavbar from './DekstopNavbar';

const Navbar = () => {

    const { theme, setHandleDrawer } = useContext(ThemeContext);
    const isDesktop = useMediaQuery('(min-width:1024px)'); // Check if screen size is desktop

    return (
        <div>
            {isDesktop ? <DesktopNavbar/> : <DrawerNavbar/>}
        </div>
    );
}

export default Navbar;
