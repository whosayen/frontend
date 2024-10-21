'use client';

import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    CardMedia,
    Menu,
    MenuItem,
    Button,
    Badge,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery
} from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import logo from "/public/logo.png";

const Navbar = () => {
    const pathname = usePathname();
    const [balanceAnchorEl, setBalanceAnchorEl] = useState<null | HTMLElement>(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const router = useRouter();

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        setIsLoggedIn(!!accessToken);
    }, []);

    const handleBalanceMenu = (event: React.MouseEvent<HTMLElement>) => {
        setBalanceAnchorEl(event.currentTarget);
    };

    const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleBalanceMenuClose = () => {
        setBalanceAnchorEl(null);
    };

    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    // Conditionally render the Navbar based on the current route
    const shouldShowNavbar = ![
        /^\/auth\/login$/,
        /^\/auth\/signup(\/.*)?$/, // This will match /auth/signup and any subpath like /auth/signup/*
        /^\/*$/
    ].some((regex) => regex.test(pathname));

    const handleLogOut = () => {
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('id');
        setIsLoggedIn(false);
        router.push('/auth/login');
    };

    const handleProfileRedirect = () => {
        const id = sessionStorage.getItem('id');
        const role = sessionStorage.getItem('role');

        if (role === 'TUTOR') {
            router.push(`/tutor/${id}`);
        } else if (role === 'STUDENT') {
            // router.push('/profile');
        }
        handleProfileMenuClose();
    };

    const handleBookingsRedirect = () => {
        router.push('/bookings');
        handleProfileMenuClose();
    };

    const renderDesktopMenu = () => (
        <>
            <Button
                className="text-lg"
                sx={{ textTransform: 'none', fontSize: '1rem' }}
                onClick={() => router.push('/tutor')}
            >
                Find a tutor
            </Button>
            {isLoggedIn ? (
                <>
                    <Box className="relative">
                        <Button
                            aria-controls="balance-menu"
                            aria-haspopup="true"
                            onClick={() => router.push('/wallet')}
                            className="text-lg"
                            sx={{ textTransform: 'none', fontSize: '1rem' }}
                        >
                            Balance
                        </Button>
                    </Box>
                    <Button onClick={() => router.push('/chat')} className="text-lg" sx={{ textTransform: 'none', fontSize: '1rem' }}>My chats</Button>
                    <Button className="text-lg" sx={{ textTransform: 'none', fontSize: '1rem' }} onClick={handleLogOut}>Log out</Button>
                    <Box className="relative">
                        <IconButton
                            aria-controls="profile-menu"
                            aria-haspopup="true"
                            onClick={handleProfileMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="profile-menu"
                            anchorEl={profileAnchorEl}
                            keepMounted
                            open={Boolean(profileAnchorEl)}
                            onClose={handleProfileMenuClose}
                        >
                            <MenuItem onClick={() => {
                                router.push('/my-lessons');
                                handleProfileMenuClose();
                            }}>My Lessons</MenuItem>
                            <MenuItem onClick={() => {
                                router.push('/settings');
                                handleProfileMenuClose();
                            }}>Settings</MenuItem>
                            <MenuItem onClick={handleProfileMenuClose}>My Teachers</MenuItem>
                            {/* <MenuItem onClick={handleProfileRedirect}>My Profile</MenuItem> */}
                            <MenuItem onClick={handleBookingsRedirect}>Bookings</MenuItem>
                        </Menu>
                    </Box>
                </>
            ) : (
                <>
                    <Button className="text-lg" sx={{ textTransform: 'none', fontSize: '1rem' }} onClick={() => router.push('/auth/login')}>Login</Button>
                    <Button className="text-lg" sx={{ textTransform: 'none', fontSize: '1rem' }} onClick={() => router.push('/auth/signup')}>Sign up</Button>
                </>
            )}
        </>
    );

    const renderMobileMenu = () => (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerToggle}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={handleDrawerToggle}
                onKeyDown={handleDrawerToggle}
            >
                <List>
                    <ListItem button onClick={() => router.push('/tutor')}>
                        <ListItemText primary="Find a tutor" />
                    </ListItem>
                    {isLoggedIn ? (
                        <>
                            <ListItem button onClick={() => router.push('/wallet')}>
                                <ListItemText primary="Balance" />
                            </ListItem>
                            <ListItem button onClick={() => router.push('/my-lessons')}>
                                <ListItemText primary="My Lessons" />
                            </ListItem>
                            <ListItem button onClick={() => router.push('/settings')}>
                                <ListItemText primary="Settings" />
                            </ListItem>
                            <ListItem button onClick={() => router.push('/my-teachers')}>
                                <ListItemText primary="My Teachers" />
                            </ListItem>
                            <ListItem button onClick={handleProfileRedirect}>
                                <AccountCircle />
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <ListItem button onClick={handleBookingsRedirect}>
                                <ListItemText primary="Bookings" />
                            </ListItem>
                            <ListItem button onClick={handleLogOut}>
                                <ListItemText primary="Log out" />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem button onClick={() => router.push('/auth/login')}>
                                <ListItemText primary="Login" />
                            </ListItem>
                            <ListItem button onClick={() => router.push('/auth/signup')}>
                                <ListItemText primary="Sign up" />
                            </ListItem>
                        </>
                    )}
                </List>
            </Box>
        </Drawer>
    );

    return (
        shouldShowNavbar && (
            <AppBar position="static" color="transparent" className="shadow-md">
                <Toolbar className="flex justify-between">
                    <IconButton edge="start" color="inherit" onClick={() => router.push('/')}>
                        <CardMedia
                            component="img"
                            image={logo.src}
                            alt="Logo"
                            sx={{ width: 48 }}
                        />
                    </IconButton>
                    {isMobile ? (
                        <>
                            <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>
                            {renderMobileMenu()}
                        </>
                    ) : (
                        <Box className="flex items-center gap-6">
                            {renderDesktopMenu()}
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        )
    );
};

export default Navbar;
