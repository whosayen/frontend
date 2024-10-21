"use client";

import React, { useEffect, useState } from 'react';
import { Box, Button, Container, InputAdornment, TextField, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeroSection: React.FC = () => {
    const router = useRouter();
    const [search, setSearch] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Menu anchor

    // Check for user authentication token on mount
    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSearch = () => {
        if (search.trim() !== '') {
            router.push(`/tutor?keyword=${encodeURIComponent(search)}`);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken'); // Remove token from session storage
        sessionStorage.removeItem('role'); // Remove role from session storage
        sessionStorage.removeItem('id'); // Remove id from session storage
        localStorage.removeItem('refreshToken'); // Remove refresh token from local storage
        setIsLoggedIn(false); // Update login state
        setAnchorEl(null); // Close menu
        router.push('/'); // Redirect to home page
    };

    // Popup Menu handlers
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget); // Open the menu
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Close the menu
    };

    const handleProfileRedirect = () => {
        const id = sessionStorage.getItem('id');
        const role = sessionStorage.getItem('role');

        if (role === 'TUTOR') {
            router.push(`/tutor/${id}`);
        } else if (role === 'STUDENT') {
            router.push('/');
        }
        handleMenuClose();
    };

    return (
        <Box className="w-full h-screen flex flex-col justify-center items-center overflow-hidden">
            {/* Background Image */}
            <Image
                src="/main.jpg"
                alt="Hero Background"
                fill
                style={{ objectFit: 'cover' }}
                quality={100}
                priority
                className="absolute inset-0 w-full h-full object-cover"
            />
            <Box className="absolute inset-0 bg-black opacity-40"></Box>

            {/* Top Right Buttons */}
            <Box className="absolute top-4 right-8 flex space-x-4 z-20">
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'white', color: 'black', borderRadius: '50px', '&:hover': {
                            backgroundColor: '#f0f0f0',
                        },
                    }}
                    onClick={() => router.push('/tutor')}
                >
                    Find Tutor
                </Button>

                {isLoggedIn ? (
                    <>
                        {/* Account Circle Icon with Popup Menu */}
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            onClick={handleMenuClick}
                        >
                            <AccountCircleIcon sx={{ color: 'white' }} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {/* <MenuItem onClick={handleProfileRedirect}>
                                My Profile
                            </MenuItem> */}
                            <MenuItem onClick={() => { router.push('/settings'); handleMenuClose(); }}>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'white', color: '#148E87', borderRadius: '50px', '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                },
                            }}
                            onClick={() => router.push('/auth/login')}
                        >
                            Log in
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'white', color: '#148E87', borderRadius: '50px', '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                },
                            }}
                            onClick={() => router.push('/auth/signup')}
                        >
                            Sign up
                        </Button>
                    </>
                )}
            </Box>

            {/* Hero Section */}
            <Container className="relative z-10 flex flex-col items-start text-white">
                <Typography variant="h2" className="font-bold mb-4 mt-16 text-left">
                    BE THE BEST YOU CAN BE
                </Typography>
                <Box className="mt-8 flex justify-start items-center w-full md:w-2/3 lg:w-1/2">
                    <TextField
                        variant="outlined"
                        placeholder="Search any language or specialty"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            style: {
                                backgroundColor: 'white', borderRadius: '999px',
                            },
                        }}
                        className="w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection;
