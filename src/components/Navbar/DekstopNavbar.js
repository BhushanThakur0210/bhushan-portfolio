import React, { useContext } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { IoHomeSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { BsFillGearFill } from "react-icons/bs";
import { MdPhone } from "react-icons/md";
import { makeStyles } from '@material-ui/core/styles';
import { ThemeContext } from '../../contexts/ThemeContext';

import './DekstopNavbar.css';
import { headerData } from '../../data/headerData';

const DesktopNavbar = () => {

    const { theme } = useContext(ThemeContext);

    const useStyles = makeStyles((t) => ({
        navLink: {
            color:theme.primary ,
            fontSize: '1.3rem',
            fontWeight: 600,
            margin: '0 1.5rem',
            textDecoration: 'none',
            transition: 'color 0.3s',
            "&:hover": {
                color: '#f39c12',
            },
        },
        navIcon: {
            fontSize: '1.6rem',
            marginRight: '8px',
        },
        navbarContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 2rem',
            position: 'fixed',
            top: 0,
        
            zIndex: 1000,
            backgroundColor: theme.secondary,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            width:'100%'
        },
        navbarBrand: {
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: theme.primary,
            letterSpacing: '1px',
        },
        navbarLinks: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
        }
    }));

    const classes = useStyles();
    const shortname = (name) => {
        if(name.length > 12) {
            return name.split(" ")[0]
        } else {
            return name
        }
    }

    return (
        <div className={classes.navbarContainer}>
             <h1 className='dekstopname' style={{color:'white'}}>{shortname(headerData.name)}</h1>
          
            <div className={classes.navbarLinks}>
            {/* <p style={{color: theme.secondary}}>{shortname(headerData.name)}</p> */}
            <NavLink to="/" className={classes.navLink} smooth={true} spy={true}>
                    {/* <IoHomeSharp className={classes.navIcon} /> */}
                   
                </NavLink>
                <NavLink to="/" className={classes.navLink} smooth={true} spy={true}>
                    {/* <IoHomeSharp className={classes.navIcon} /> */}
                    Home
                </NavLink>
                <NavLink to="/#about" className={classes.navLink} smooth={true} spy={true}>
                    {/* <FaUser className={classes.navIcon} /> */}
                    About
                </NavLink>
                <NavLink to="/#education" className={classes.navLink} smooth={true} spy={true}>
                    {/* <HiDocumentText className={classes.navIcon} /> */}
                    Education
                </NavLink>
                <NavLink to="/#projects" className={classes.navLink} smooth={true} spy={true}>
                    {/* <BsFillGearFill className={classes.navIcon} /> */}
                    Projects
                </NavLink>
                <NavLink to="/#contacts" className={classes.navLink} smooth={true} spy={true}>
                    {/* <MdPhone className={classes.navIcon} /> */}
                    Contact
                </NavLink>
            </div>
        </div>
    );
}

export default DesktopNavbar;
