'use client';
import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessfullyPaidPage:React.FC = () => {
    const handleBackToHome = () => {
        // Redirect the user to the home page or another relevant page
        window.location.href = '/';
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                {/* Success Icon */}
                <CheckCircleOutlineIcon style={{ fontSize: '100px', color: '#4caf50' }} />

                {/* Payment Successful Message */}
                <Typography variant="h4" style={{ margin: '20px 0', fontWeight: 'bold' }}>
                    Payment Successful!
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: '30px' }}>
                    Thank you for your payment. Your transaction has been successfully processed.
                </Typography>

                {/* Further actions, like "Back to Home" */}
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ marginTop: '20px', padding: '10px 20px' }}
                    onClick={handleBackToHome}
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default SuccessfullyPaidPage;
