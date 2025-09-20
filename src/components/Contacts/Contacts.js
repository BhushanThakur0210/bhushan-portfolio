import React, { useContext, useState } from 'react';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import emailjs from 'emailjs-com';
import isEmail from 'validator/lib/isEmail';
import { AiOutlineSend, AiOutlineCheckCircle } from "react-icons/ai";
import { FiPhone, FiAtSign } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { ThemeContext } from '../../contexts/ThemeContext';
import { contactsData } from '../../data/contactsData';
import { socialsData } from '../../data/socialsData';
import {
    FaTwitter, FaLinkedinIn, FaGithub, FaYoutube, FaBloggerB,
    FaRedditAlien, FaStackOverflow, FaCodepen, FaInstagram,
    FaGitlab, FaMediumM
} from "react-icons/fa";

import './Contacts.css';

function Contacts() {
    const { theme } = useContext(ThemeContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const useStyles = makeStyles(() => ({
        input: {
            border: `4px solid ${theme.primary80}`,
            backgroundColor: theme.secondary,
            color: theme.tertiary,
            fontFamily: 'var(--primaryFont)',
            fontWeight: 500,
            "&:focus": {
                border: `4px solid ${theme.primary600}`,
            }
        },
        message: {
            border: `4px solid ${theme.primary80}`,
            backgroundColor: theme.secondary,
            color: theme.tertiary,
            fontFamily: 'var(--primaryFont)',
            fontWeight: 500,
            "&:focus": {
                border: `4px solid ${theme.primary600}`,
            }
        },
        label: {
            backgroundColor: theme.secondary,
            color: theme.primary,
            fontWeight: 600,
            fontSize: '0.9rem',
            padding: '0 5px',
            transform: 'translate(25px,50%)',
        },
        socialIcon: {
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '21px',
            backgroundColor: theme.primary,
            color: theme.secondary,
            transition: '250ms ease-in-out',
            "&:hover": {
                transform: 'scale(1.1)',
                backgroundColor: theme.tertiary,
            }
        },
        detailsIcon: {
            backgroundColor: theme.primary,
            color: theme.secondary,
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '23px',
        },
        submitBtn: {
            backgroundColor: theme.primary,
            color: theme.secondary,
            transition: '250ms ease-in-out',
            "&:hover": {
                transform: 'scale(1.08)',
                backgroundColor: theme.tertiary,
            }
        }
    }));

    const classes = useStyles();

    const handleContactForm = (e) => {
        e.preventDefault();
        if (name && email && message) {
            if (isEmail(email)) {
                const templateParams = {
                    name: name,
                    email: email,
                    message: message
                };

                emailjs.send(
                    'service_8i1xzom',
                    'template_53vmyvl',
                    templateParams,
                    '5edr5qQIhY7GrXXaD'
                ).then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    setSuccess(true);
                    setErrMsg('');
                    setName('');
                    setEmail('');
                    setMessage('');
                    setOpen(false);
                }, (err) => {
                    console.log('FAILED...', err);
                    setErrMsg('Failed to send message. Please try again later.');
                    setOpen(true);
                });
            } else {
                setErrMsg('Invalid email');
                setOpen(true);
            }
        } else {
            setErrMsg('Enter all the fields');
            setOpen(true);
        }
    };

    return (
        <div className="contacts" id="contacts" style={{ backgroundColor: theme.secondary }}>
            <div className="contacts--container">
                <h1 style={{ color: theme.primary }}>Contacts</h1>
                <div className="contacts-body">
                    <div className="contacts-form">
                        <form onSubmit={handleContactForm}>
                            <div className="input-container">
                                <label className={classes.label}>Name</label>
                                <input
                                    className={`form-input ${classes.input}`}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    type="text"
                                />
                            </div>
                            <div className="input-container">
                                <label className={classes.label}>Email</label>
                                <input
                                    className={`form-input ${classes.input}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john@doe.com"
                                    type="email"
                                />
                            </div>
                            <div className="input-container">
                                <label className={classes.label}>Message</label>
                                <textarea
                                    className={`form-message ${classes.message}`}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                />
                            </div>
                            <div className="submit-btn">
                                <button type="submit" className={classes.submitBtn}>
                                    <p>{!success ? 'Send' : 'Sent'}</p>
                                    <div className="submit-icon">
                                        <AiOutlineSend className="send-icon" style={{ animation: !success ? 'initial' : 'fly 0.8s linear both' }} />
                                        <AiOutlineCheckCircle className="success-icon" style={{ display: !success ? 'none' : 'inline-flex' }} />
                                    </div>
                                </button>
                            </div>
                        </form>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={open}
                            autoHideDuration={4000}
                            onClose={handleClose}
                        >
                            <SnackbarContent
                                style={{ backgroundColor: theme.primary, color: theme.secondary }}
                                message={errMsg}
                                action={
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                }
                            />
                        </Snackbar>
                    </div>

                    <div className="contacts-details">
                        <a href={`mailto:${contactsData.email}`} className="personal-details">
                            <div className={classes.detailsIcon}><FiAtSign /></div>
                            <p style={{ color: theme.tertiary }}>{contactsData.email}</p>
                        </a>
                        <a href={`tel:${contactsData.phone}`} className="personal-details">
                            <div className={classes.detailsIcon}><FiPhone /></div>
                            <p style={{ color: theme.tertiary }}>{contactsData.phone}</p>
                        </a>
                        <div className="personal-details">
                            <div className={classes.detailsIcon}><HiOutlineLocationMarker /></div>
                            <p style={{ color: theme.tertiary }}>{contactsData.address}</p>
                        </div>

                        <div className="socialmedia-icons">
                            {socialsData.github && <a href={socialsData.github} target="_blank" rel="noreferrer" className={classes.socialIcon}><FaGithub /></a>}
                            {socialsData.linkedIn && <a href={socialsData.linkedIn} target="_blank" rel="noreferrer" className={classes.socialIcon}><FaLinkedinIn /></a>}
                            {socialsData.instagram && <a href={socialsData.instagram} target="_blank" rel="noreferrer" className={classes.socialIcon}><FaInstagram /></a>}
                            {socialsData.twitter && <a href={socialsData.twitter} target="_blank" rel="noreferrer" className={classes.socialIcon}><FaTwitter /></a>}
                        </div>
                    </div>
                </div>
            </div>
            <img src={theme.contactsimg} alt="contacts" className="contacts--img" />
        </div>
    );
}

export default Contacts;
