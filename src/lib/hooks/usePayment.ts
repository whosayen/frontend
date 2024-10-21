
import axios from 'axios';
import { useState } from 'react';
import api from '../apiConfig';

export function usePayment(
    setError: (error: string | null) => void,
    refreshBalance: () => Promise<void>
) {
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    const createConnectedAccount = async () => {
        try {
            setPaymentLoading(true);

            const response = await api.post(
                '/payments/account',
                {},
            );

            if (response.status !== 200) {
                throw new Error('Failed to create connected account');
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setPaymentError(error.response?.data?.message || 'An unknown error occurred.');
            } else if (error instanceof Error) {
                setPaymentError(error.message);
            } else {
                setPaymentError('An unknown error occurred.');
            }
        } finally {
            setPaymentLoading(false);
        }
    };

    const createAccountLink = async () => {
        try {
            setPaymentLoading(true);

            await createConnectedAccount();

            const response = await api.post('/payments/link', {});

            if (response.status === 200) {
                const responseText = response.data; // Axios parses JSON responses automatically
                setPaymentError(null);

                document.body.innerHTML = '<div style="text-align:center;margin-top:20px;font-size:20px;">Please wait while redirecting to Stripe...</div>';
                window.location.href = responseText; // Redirect to Stripe in the same tab
            } else {
                throw new Error('Failed to create account link');
            }

        } catch (error) {
            // Handle errors based on the type of error
            if (axios.isAxiosError(error)) {
                // Axios-specific error handling
                setPaymentError(error.response?.data?.message || 'An unknown error occurred.');
            } else if (error instanceof Error) {
                // Generic error handling for non-Axios errors
                setPaymentError(error.message);
            } else {
                setPaymentError('An unknown error occurred.');
            }
        } finally {
            setPaymentLoading(false);
        }
    };

    const getPaymentFromWallet = async (withdrawAmount: number) => {
        try {
            setPaymentLoading(true);

            // Using the axios instance to make the POST request
            const response = await api.post(
                '/payments/transfer-money',
                {}, // Empty object as payload for POST request
                {
                    params: { amount: withdrawAmount } // Passing the withdraw amount as a query parameter
                }
            );

            if (response.status === 200) {
                setPaymentError(null);
                await refreshBalance(); // Refresh balance after successful transfer
            } else {
                throw new Error('Failed to transfer money');
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Axios-specific error handling
                setPaymentError(error.response?.data?.message || 'An unknown error occurred.');
            } else if (error instanceof Error) {
                // Generic error handling
                setPaymentError(error.message);
            } else {
                setPaymentError('An unknown error occurred.');
            }
        } finally {
            setPaymentLoading(false);
        }
    };

    return {
        createAccountLink,
        getPaymentFromWallet,
        paymentLoading,
        paymentError,
    };
}
