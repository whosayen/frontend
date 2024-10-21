import React from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

interface CustomAlertProps {
    message: string;
    open: boolean;
    severity: 'error' | 'warning' | 'info' | 'success';
    onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, open, severity, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={onClose} severity={severity} variant="filled">
                <AlertTitle>{severity.charAt(0).toUpperCase() + severity.slice(1)}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomAlert;
