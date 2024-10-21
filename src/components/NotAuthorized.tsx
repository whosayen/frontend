import { useRouter } from 'next/navigation';
import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

const NotAuthorized: React.FC = () => {

    const router = useRouter();

    const handleLoginRedirect = () => {
        router.push('auth/login');
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h2" gutterBottom>
                403 - Not Authorized
            </Typography>
            <Typography variant="body1" paragraph>
                You do not have permission to view this page.
            </Typography>
            <Box mt={4}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleLoginRedirect}
                    size="large"
                >
                    Go to Login
                </Button>
            </Box>
        </Container>
    );
};

export default NotAuthorized;