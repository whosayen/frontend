import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Avatar, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { editProfileImage } from '@/lib/api';
import api from '@/lib/apiConfig';

// Fetch the previous profile image from your backend
const fetchPreviousProfileImage = async (): Promise<string | null> => {
    try {
        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token is missing');
        }

        // Use the configured api instance to make the request
        const response = await api.get('/profile/picture', {
            responseType: 'blob' // Set response type to blob to handle binary data
        });

        // Convert the image blob to a URL object
        const imageBlob = response.data;
        return URL.createObjectURL(imageBlob);
    } catch (error) {
        console.error('Error fetching profile image:', error);
        return null;
    }
};

const ProfileImageUploader: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false); // For Snackbar
    const [showUploadButton, setShowUploadButton] = useState(true); // Control the upload button visibility

    useEffect(() => {
        // Fetch the previous profile image on component load
        const loadPreviousProfileImage = async () => {
            const previousImage = await fetchPreviousProfileImage();
            if (previousImage) {
                setPreview(previousImage);
            }
        };
        loadPreviousProfileImage();
    }, []);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
            setShowUploadButton(true); // Show the upload button when an image is selected
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) return;
        setIsUploading(true);
        try {
            const response = await editProfileImage(selectedImage);
            console.log('Profile image updated:', response);
            setSuccessMessage(true); // Show success alert
            setIsUploading(false);
            setSelectedImage(null);
            setShowUploadButton(false); // Hide the upload button after upload
        } catch (error) {
            console.error('Error uploading image:', error);
            setIsUploading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage(false);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ p: 4, border: '1px solid #ccc', borderRadius: 2, maxWidth: 400, mx: 'auto', mt: 4 }}
        >
            <Typography variant="h6" gutterBottom>
                Update Profile Picture
            </Typography>

            <Avatar
                src={preview || '/default-avatar.png'} // Show previous image or default if not available
                alt="Profile"
                sx={{ width: 100, height: 100, mb: 2 }}
            />

            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    onChange={handleImageChange}
                />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
                {showUploadButton && selectedImage && (
                    <Button variant="contained" color="secondary" onClick={handleUpload} disabled={isUploading}>
                        {isUploading ? <CircularProgress size={24} /> : 'Upload'}
                    </Button>
                )}
            </Box>

            {selectedImage && (
                <Typography variant="body2" color="textSecondary">
                    {selectedImage.name}
                </Typography>
            )}

            {/* Snackbar for success message */}
            <Snackbar open={successMessage} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Profile image successfully uploaded!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProfileImageUploader;