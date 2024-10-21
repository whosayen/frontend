import React, { useState, ChangeEvent } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import axios from 'axios';
import { ChatMessageDto, ChatMessageRequest } from '@/lib/types/dtoTypes';
import api from '@/lib/apiConfig';

// Define the props interface for the component
interface SendMessageToTutorProps {
    open: boolean;
    handleClose: () => void;
    recipientId: string,
}

// Define the possible values for Snackbar severity
type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

const SendMessageToTutor: React.FC<SendMessageToTutorProps> = ({ open, handleClose, recipientId }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>('success');

    // Handle input change
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
    };

    // Handle form submit
    const handleSubmit = async (): Promise<void> => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token is missing');
        }

        const chatMessageRequest: ChatMessageRequest = {
            recipientId: recipientId,
            content: inputValue,
        };

        setLoading(true);
        try {
            // Use the axios instance to make the POST request
            const response = await api.post<ChatMessageDto>(
                '/message/start',
                chatMessageRequest
            );

            if (response.status !== 200) {
                throw new Error('Failed to send message');
            }

            setSnackbarMessage('Message sent successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Failed to send message.');
            setSnackbarSeverity('error');
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
            handleClose();
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
                <DialogTitle id="dialog-title">Send a Message</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your message and click Send.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Message"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Send'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SendMessageToTutor;
