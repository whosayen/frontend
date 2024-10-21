import React, {useEffect} from "react";
import {Button, Grid, List, ListItem, ListItemSecondaryAction} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    getAllLanguages,
    languageProficiencyLevels} from "@/lib/language";
import { LanguageLevelDto } from "@/lib/types/dtoTypes";
import { LanguageProficiencyLevel } from "@/lib/types/dtoTypes";
import { LanguageDto } from "@/lib/types/dtoTypes";
import {Box} from "@mui/system";

type Props = {
    languages: LanguageLevelDto[];
    onChange: (newValues: LanguageLevelDto[]) => void;
};

const SpokenLanguageSelectionList = (props: Props) => {
    const [language, setLanguage] = React.useState<LanguageDto | null>(null);
    const [level, setLevel] = React.useState<LanguageProficiencyLevel | null>(null);
    const [options, setOptions] = React.useState<readonly LanguageDto[]>([]);

    const remove = (index: number) => {
        const updatedLanguages = [...props.languages];
        updatedLanguages.splice(index, 1);
        props.onChange(updatedLanguages);
    };

    // if the language already exists in the list, update it. Otherwise, add it.
    const addOrUpdate = () => {
        if (!language || !level) {
            return; // if selected language or selected level is null, do nothing
        }

        const newSpokenLanguage: LanguageLevelDto = {
            languageDto: language,
            level: level,
        };

        for (let i = 0; i < props.languages.length; i++) {
            // check if the language already exists in the list
            if (props.languages[i].languageDto === language) {
                const updatedLanguages = [...props.languages]; // copy the array
                updatedLanguages[i] = newSpokenLanguage; // update the language
                props.onChange(updatedLanguages);
                return;
            }
        }

        props.onChange([...props.languages, newSpokenLanguage]); // add the new language if it doesn't exist
    };

    useEffect(() => {
        (async () => {
            const languages = await getAllLanguages();
            setOptions(languages);
        })();
    }, []);

    return (
        <Box>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        disablePortal
                        id="spoken-language-select"
                        options={options}
                        getOptionLabel={(option) => option.languageName}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Language" variant="outlined" size="small" fullWidth/>
                        )}
                        onChange={(_, value) => setLanguage(value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        disablePortal
                        id="spoken-language-level-select"
                        options={languageProficiencyLevels}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Level" variant="outlined" size="small" fullWidth/>
                        )}
                        onChange={(_, value) => setLevel(value)}
                    />
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addOrUpdate()}
                    sx={{marginLeft: '16px', marginTop: '8px'}}
                >
                    Add Another Language
                </Button>
            </Grid>

            {props.languages.length > 0 && (
                <Box sx={{padding: '16px', background: '#f5f5f5', borderRadius: '8px', marginTop: '16px'}}>
                    <List>
                        {props.languages.map((spokenLanguage, index) => (
                            <ListItem key={index + 1} sx={{padding: '12px', marginBottom: '8px'}}>
                                <Typography sx={{fontWeight: 'bold', fontSize: '1rem', paddingRight: '8px'}}>
                                    {spokenLanguage.languageDto.languageName}
                                </Typography>
                                <Typography>{spokenLanguage.level}</Typography>
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => remove(index)} edge="end" aria-label="delete">
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default SpokenLanguageSelectionList;
