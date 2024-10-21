import React from 'react';
import { TextField, Stack } from '@mui/material';
import ProfileImageUploader from '../ProfileImageUploader';
import { Box } from '@mui/system';

// Define the types for props
interface PersonalInfoFormProps {
    userData: {
        firstName?: string;
        lastName?: string;
        email?: string;
        country?: { name: string };
        city?: string;
        phoneCode?: string;
        phoneNumber?: string;
        timezone?: string;
    };
    email: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Added as a prop
}
const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ userData, email, handleInputChange }) => (
    <Stack spacing={3}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ProfileImageUploader />
        </Box>
        <TextField
            label="First Name"
            name="userSettingsDto.firstName" // Dot notation for nested field
            value={userData.firstName || ''}
            onChange={handleInputChange}
            fullWidth
        />
        <TextField
            label="Last Name"
            name="userSettingsDto.lastName" // Dot notation
            value={userData.lastName || ''}
            onChange={handleInputChange}
            fullWidth
        />
        <TextField
            label="Email"
            name="userDto.email" // Use dot notation for email in userDto
            value={email || ''}
            onChange={handleInputChange}
            fullWidth
        />
        <TextField
            label="Country"
            name="userSettingsDto.country.name" // Dot notation for nested country object
            value={userData?.country?.name || ''}
            onChange={handleInputChange}
            fullWidth
        />
        <TextField
            label="City"
            name="userSettingsDto.city" // Dot notation
            value={userData.city || ''}
            onChange={handleInputChange}
            fullWidth
        />
        <TextField
            label="Phone Code"
            name="userSettingsDto.phoneCode" // Dot notation
            value={userData.phoneCode || ''}
            onChange={handleInputChange}
            fullWidth
        />
        <TextField
            label="Phone Number"
            name="userSettingsDto.phoneNumber" // Dot notation
            value={userData.phoneNumber || ''}
            onChange={handleInputChange}
            fullWidth
        />
        <TextField
            label="Timezone"
            name="userSettingsDto.timezone" // Dot notation
            value={userData.timezone || ''}
            onChange={handleInputChange}
            fullWidth
        />
    </Stack>
);

export default PersonalInfoForm;
