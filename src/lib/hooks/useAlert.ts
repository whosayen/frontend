import { useState } from 'react';

export const useAlert = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('info');

    const showAlert = (msg: string, sev: 'error' | 'warning' | 'info' | 'success') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };

    const hideAlert = () => setOpen(false);

    return { open, message, severity, showAlert, hideAlert };
};
