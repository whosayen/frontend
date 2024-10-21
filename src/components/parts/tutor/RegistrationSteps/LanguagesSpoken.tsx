import React, {useEffect, useState} from 'react';
import {Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    getAllLanguages, isValidLanguageLevel,
    languageProficiencyLevels} from "@/lib/language";
import {
    LanguageLevelDto
} from "@/lib/types/dtoTypes";
import { LanguagesSpokenState } from "@/lib/types/clientTypes";
import { LanguageDto } from "@/lib/types/dtoTypes";

type SpokenLanguageForm = {
    languageName: string;
    levelName: string;
}

type Props = {
    state: LanguagesSpokenState,
    onChange: (state: LanguagesSpokenState) => void;
};

function GetLanguagesSpokenState(languages: SpokenLanguageForm[]): LanguagesSpokenState {
    const spokenLanguages: LanguageLevelDto[] = languages.map(language => ({
        languageDto: {
            languageName: language.languageName,
            code: '' // TODO - Add code to languageDto 
        },
        level: isValidLanguageLevel(language.levelName) ? language.levelName : "A1", // Default to "A1" if invalid
    }));

    // Determine if the state is valid based on the provided criteria
    const isValid = spokenLanguages.length > 0 && spokenLanguages.every(spokenLanguage => isValidLanguageLevel(spokenLanguage.level));

    return {
        spokenLanguages,
        isValid,
    };
}

const LanguagesSpoken: React.FC<Props> = ({state, onChange}) => {
    const [languages, setLanguages] = useState<SpokenLanguageForm[]>([]);
    const [languageOptions, setLanguageOptions] = useState<LanguageDto[]>([]);

    useEffect(() => {
        (async () => {
            const fetchedLanguages = await getAllLanguages();
            setLanguageOptions(fetchedLanguages);
        })();
    }, []);

    useEffect(() => {
        onChange(GetLanguagesSpokenState(languages));
    }, [languages]);

    const handleLanguageChange = (value: string, index: number) => {
        const updatedLanguages = [...languages];
        updatedLanguages[index] = {...updatedLanguages[index], languageName: value};
        setLanguages(updatedLanguages);
    };

    const handleLevelChange = (value: string, index: number) => {
        const updatedLanguages = [...languages];
        updatedLanguages[index] = {...updatedLanguages[index], levelName: value};
        setLanguages(updatedLanguages);
    };

    const handleAddLanguage = () => {
        setLanguages([...languages, {languageName: '', levelName: ''}]);
    };

    const handleRemoveLanguage = (index: number) => {
        setLanguages(languages.filter((_, i) => i !== index));
    };

    return (
        <React.Fragment>
            {languages.map((languageForm, index) => (
                <Grid container spacing={8} key={index} alignItems="center" sx={{pt: index === 0 ? 0 : 2}}>
                    <Grid item xs={5}>
                        <FormControl fullWidth>
                            <InputLabel id="language-select-label">Select Language</InputLabel>
                            <Select
                                label="Select Language"
                                labelId={`language-select-label-${index}`}
                                value={languageForm.languageName}
                                onChange={(e) => handleLanguageChange(e.target.value, index)}
                                displayEmpty
                            >
                                {languageOptions.map((option) => (
                                    <MenuItem key={option.languageName} value={option.languageName}>
                                        {option.languageName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl fullWidth>
                            <InputLabel id="language-select-label">Select Level</InputLabel>
                            <Select
                                label="Select Level"
                                labelId={`level-select-label-${index}`}
                                value={languageForm.levelName}
                                onChange={(e) => handleLevelChange(e.target.value, index)}
                                displayEmpty
                            >
                                {languageProficiencyLevels.map((level) => (
                                    <MenuItem key={level} value={level}>
                                        {level}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {index !== 0 && (
                        <Grid item xs={2}>
                            <IconButton onClick={() => handleRemoveLanguage(index)}>
                                <DeleteIcon/>
                            </IconButton>
                        </Grid>
                    )}
                </Grid>
            ))}
            <Button variant="contained" onClick={handleAddLanguage} sx={{mt: 2}}>
                Add Another Language
            </Button>
        </React.Fragment>
    );
};

export default LanguagesSpoken;
