'use client';
import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const PaymentFailedPage = () => {

    const handleBackToHome = () => {
        // Redirect the user to the home page or another relevant page
        window.location.href = '/';
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                {/* Error Icon */}
                <ErrorOutlineIcon style={{ fontSize: '100px', color: '#f44336' }} />

                {/* Payment Failed Message */}
                <Typography variant="h4" style={{ margin: '20px 0', fontWeight: 'bold' }}>
                    Payment Failed
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: '30px' }}>
                    Unfortunately, we couldn’t process your payment. Please try again or contact support.
                </Typography>

                {/* Retry or Home Actions */}
                <Box mt={2} display="flex" justifyContent="center" gap={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleBackToHome}
                        style={{ padding: '10px 20px' }}
                    >
                        Back to Home
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default PaymentFailedPage;
