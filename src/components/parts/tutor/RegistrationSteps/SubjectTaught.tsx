import React, { useEffect, useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { getAllLanguages } from "@/lib/language";
import { LanguageDto } from "@/lib/types/dtoTypes";
import { SubjectTaughtState } from "@/components/parts/tutor/RegistrationStepper";

type Props = {
    state: SubjectTaughtState;
    onChange: (state: SubjectTaughtState) => void;
}

const SubjectTaught: React.FC<Props> = ({ state, onChange }) => {
    const [languageOptions, setLanguageOptions] = useState<LanguageDto[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");

    useEffect(() => {
        (async () => {
            const fetchedLanguages = await getAllLanguages();
            setLanguageOptions(fetchedLanguages);
        })();
    }, []);

    useEffect(() => {
        // Correctly construct the SubjectTaughtState object for onChange
        onChange({
            selectedSubjects: languageOptions.filter(option => option.languageName === selectedLanguage),
            isValid: true, // You can adjust the validation logic as needed
        });
    }, [selectedLanguage, languageOptions]);

    const handleLanguageChange = (event: SelectChangeEvent<string>) => {
        setSelectedLanguage(event.target.value as string);
    };

    return (
        <React.Fragment>
            <Grid container spacing={2} alignItems="center" sx={{padding: 2}} maxWidth={300}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="language-select-label">Select Language</InputLabel>
                        <Select
                            value={selectedLanguage}
                            labelId="language-select-label"
                            id="language-select"
                            label="Select Language"
                            onChange={handleLanguageChange}
                        >
                            {languageOptions.map((option) => (
                                <MenuItem key={option.languageName} value={option.languageName}>
                                    {option.languageName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default SubjectTaught;
