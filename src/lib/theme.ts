'use client';

import { createTheme } from '@mui/material/styles';
import '@fontsource/inter';  // Import Poppins font
import '@fontsource/poppins'; // Import Poppins font
import '@fontsource/roboto';  // Import Roboto font

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif', // Base font family changed to Poppins
        fontSize: 12, // Reduced default font size from 14px to 12px
        h3: {
            fontFamily: 'Poppins, Arial, sans-serif', // Poppins for h3
            fontWeight: 700, // Added font weight for h3
            letterSpacing: '0.12em',
            fontSize: '1.5rem', // Adjusted heading size for h3
            '@media (min-width:600px)': {
                fontSize: '2rem', // Medium screens
            },
            [createTheme().breakpoints.up('md')]: {
                fontSize: '2.5rem', // Large screens
            },
        },
        h4: {
            fontFamily: 'Poppins, Arial, sans-serif', // Use Poppins for h4
            fontWeight: 700,
            fontSize: '1.25rem', // Smaller h4 size
            '@media (min-width:600px)': {
                fontSize: '1.75rem',
            },
            [createTheme().breakpoints.up('md')]: {
                fontSize: '2.25rem',
            },
        },
        h6: {
            fontFamily: 'Poppins, Arial, sans-serif', // Use Poppins for h6
            fontWeight: 600,
            fontSize: '1rem', // Smaller h6 size
            '@media (min-width:600px)': {
                fontSize: '1.2rem',
            },
            [createTheme().breakpoints.up('md')]: {
                fontSize: '1.4rem',
            },
        },
        body1: {
            fontFamily: 'Poppins, Arial, sans-serif', // Use Poppins for body1
            fontSize: '0.875rem', // Adjusted body1 size
            '@media (min-width:600px)': {
                fontSize: '1rem',
            },
            [createTheme().breakpoints.up('md')]: {
                fontSize: '1.125rem',
            },
        },
        body2: {
            fontFamily: 'Poppins, Arial, sans-serif', // Use Poppins for body2
            fontSize: '0.75rem', // Adjusted body2 size
            '@media (min-width:600px)': {
                fontSize: '0.875rem',
            },
            [createTheme().breakpoints.up('md')]: {
                fontSize: '1rem',
            },
        },
    },
    palette: {
        primary: {
            main: '#148E87', // Custom primary color
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '50px', // Rounded button corners
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderRadius: 30, // Rounded text fields
                    },
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderRadius: 30, // Rounded autocomplete fields
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderRadius: 30, // Rounded select fields
                    },
                },
            },
        },
    },
});

export default theme;
