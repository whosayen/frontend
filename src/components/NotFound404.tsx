import React from 'react';
import { Container, Typography } from '@mui/material';

const NotFound404 = () => {
    return (
        <Container fixed>
            <Typography variant="h3" component="h1" align="center" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" align="center">
                The page you are looking for does not exist or the user is not a tutor.
            </Typography>
        </Container>
    );
};

export default NotFound404;
