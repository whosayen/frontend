'use client';

import React from 'react';
import { Box, Button, Card, Typography, IconButton, Tooltip, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { usePayment } from '@/lib/hooks/usePayment';

type WalletCardProps = {
    amount: number;
    setError: (error: string | null) => void;
    refreshBalance: () => Promise<void>;
};

const WalletCard: React.FC<WalletCardProps> = ({ amount, setError, refreshBalance }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { createAccountLink, getPaymentFromWallet, paymentLoading, paymentError } = usePayment(setError, refreshBalance);

    return (
        <Card sx={{
            maxWidth: 360,
            mx: 'auto',
            my: 2,
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                I&apos;ve earned
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant={isMobile ? "h5" : "h4"} color="primary" sx={{ lineHeight: 1 }}>
                    {amount/100} $
                </Typography>
                <Tooltip title="Information about currency conversion">
                    <IconButton size={isMobile ? "small" : "medium"}>
                        <HelpOutlineIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1,
                mt: 2,
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                <Button 
                    variant="contained" 
                    sx={{ bgcolor: '#148E87', '&:hover': { bgcolor: '#148E87' }, px: isMobile ? 2 : 3 }}
                    onClick={() => getPaymentFromWallet(amount)}
                    disabled={paymentLoading}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        {paymentLoading ? <CircularProgress size={24} /> : 'Withdraw'}
                    </Box>
                </Button>
                <Button 
                    variant="outlined" 
                    sx={{ borderColor: '#148E87', color: '#148E87', px: isMobile ? 2 : 3 }}
                    onClick={createAccountLink}
                    disabled={paymentLoading}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        {paymentLoading ? <CircularProgress size={24} /> : 'Transfer'}
                    </Box>
                </Button>
            </Box>
            {paymentError && (
                <Typography color="error" variant="caption" sx={{ mt: 2 }}>
                    {paymentError}
                </Typography>
            )}
            <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
                * The amounts listed here are close approximations. There may be a slight difference due to changes in foreign exchange rates. All amounts are based on US Dollars
            </Typography>
        </Card>
    );
};

export default WalletCard;
