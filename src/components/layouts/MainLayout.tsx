'use client'
import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {Box, CssBaseline} from '@mui/material';

function MainLayout() {
    const [selectedValue, setSelectedValue] = useState('option1');

    const handleSelectChange = (event: any) => {
        setSelectedValue(event.target.value);
    };

    const appBarStyle = {
        background: 'transparent',
        boxShadow: 'none',
    };

    const pageStyle = {
        backgroundColor: 'white',
    };

    return (
        <div style={pageStyle}>
            <CssBaseline/>
            <AppBar position="static" style={appBarStyle}>

            </AppBar>
        </div>
    );
}

export default MainLayout;

