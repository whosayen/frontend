'use client';

import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { fetchUserData } from '@/lib/api'; 
import WalletCard from './WalletCard';

const WalletPage = () => {
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshBalance = async () => {
        const userId = sessionStorage.getItem('id');

        if (!userId) {
            setError('User not found');
            setLoading(false);
            return;
        }


        try {
            const userData = await fetchUserData(userId);
            setAmount(userData.userDto.balance);
        } catch (error) {
            setError('Failed to fetch user balance');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshBalance();
    }, []);

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', my: 4, p: 2 }}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <WalletCard amount={amount} setError={setError} refreshBalance={refreshBalance} />
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
};

export default WalletPage;
