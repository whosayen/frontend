'use client';

import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'

type ClientAppWrapperProps = {
    children: React.ReactNode;
}

export default function ClientAppWrapper({children}: ClientAppWrapperProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
                {children}
                <CssBaseline/>
            </ThemeProvider>
        </LocalizationProvider>
    );
}
