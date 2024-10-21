import React, {useEffect, useState} from 'react';
import {Box, TextField} from '@mui/material';
import {ProfileDescriptionState} from "@/components/parts/tutor/RegistrationStepper";

type Props = {
    state: ProfileDescriptionState;
    onChange: (state: ProfileDescriptionState) => void;
}
const ProfileDescription = ({state, onChange} : Props) => {
    const [shortIntro, setShortIntro] = useState('');
    const [aboutTutor, setAboutTutor] = useState('');

    useEffect(() => {
        setShortIntro(state.shortIntro);
        setAboutTutor(state.aboutTutor);
    }, [state.shortIntro, state.aboutTutor]);

    const handleShortIntroChange = (value: string) => {
        setShortIntro(value);
        onChange({shortIntro: value, aboutTutor, isValid: value.length > 0});
    };

    const handleAboutTutorChange = (value: string) => {
        setAboutTutor(value);
        onChange({shortIntro, aboutTutor: value, isValid: value.length > 400});
    };

    return (
        <Box display="flex" justifyContent="center" padding={6}>
            <Box width="100%" maxWidth={700} /* Adjust the maxWidth to your preference */>
                <TextField
                    fullWidth
                    label="Short introduction about you"
                    value={shortIntro}
                    onChange={(e) => handleShortIntroChange(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="About the tutor"
                    value={aboutTutor}
                    onChange={(e) => handleAboutTutorChange(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                    helperText={`${aboutTutor.length} characters currently (400 characters minimum)`}
                />
            </Box>
        </Box>
    );
};

export default ProfileDescription;
