import React from 'react';
import { TextField, Stack } from '@mui/material';

interface TeachingFormProps {
    userData: {
        hourly_rate?: number;
        description?: string;
        short_description?: string;
        language?: { language_name: string };
        video_url?: string;
    };
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TeachingForm: React.FC<TeachingFormProps> = ({ userData, handleInputChange }) => (
    <Stack spacing={3}>
        <TextField
            label="Hourly Rate"
            name="tutorDto.hourlyRate" // Use dot notation to access the nested field
            value={userData.hourly_rate?.toString() || ''} // TODO - Test if this works
            onChange={handleInputChange}
            fullWidth
        />
        <TextField
            label="Short Description"
            name="tutorDto.shortDescription" // Dot notation for nested fields
            value={userData.short_description || ''} // TODO - Test if this works
            onChange={handleInputChange}
            fullWidth
        />
        <TextField
            label="Description"
            name="tutorDto.description" // Dot notation
            value={userData.description || ''} // TODO - Test if this works
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
        />
        <TextField
            label="Language"
            name="tutorDto.languageToTeach.languageName" // Dot notation for nested language object
            value={userData.language?.language_name || ''} // TODO - Test if this works
            onChange={handleInputChange}
            fullWidth
        />
        <TextField
            label="Video URL"
            name="tutorDto.videoUrl" // Dot notation for video URL
            value={userData.video_url || ''} // TODO - Test if this works
            onChange={handleInputChange}
            fullWidth
        />
    </Stack>
);

export default TeachingForm;
