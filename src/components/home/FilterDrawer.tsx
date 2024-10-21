import React, {useEffect, useState } from 'react';
import {
    Box,
    Button,
    Divider,
    Drawer,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    TextField,
    Typography,
    useMediaQuery,
    Slider,
    SelectChangeEvent,
    SliderProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';
import { Filters } from "@/lib/types/clientTypes";
import { getAllLanguages, languageProficiencyLevels } from '@/lib/language';
import { LanguageDto } from "@/lib/types/dtoTypes";
import TutorSortBy from '../TutorSortBy';

// Create a styled version of FormControl for all form elements
const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginTop: theme.spacing(1),
    '& .MuiInputBase-root': {
        height: 36, // Ensures the height matches Select components
        fontSize: '0.875rem', // Ensures the font size is uniform
    },
    '& .MuiInputLabel-root': {
        fontSize: '0.875rem', // Ensures label font size is consistent
    }
}));

type FilterDrawerProps = {
    open: boolean;
    onClose: () => void;
    onApplyFilters: (filters: Filters) => void;
    initialFilters: Filters;
};

const FilterDrawer = ({ open, onClose, onApplyFilters, initialFilters }: FilterDrawerProps) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [languages, setLanguages] = useState<LanguageDto[]>([]);
    const [priceRange, setPriceRange] = useState<number[]>([
        initialFilters.minRate ? parseInt(initialFilters.minRate) : 20,
        initialFilters.maxRate ? parseInt(initialFilters.maxRate) : 100
    ]); // Initialize price range from initial filters

    useEffect(() => {
        setFilters(initialFilters);
        setPriceRange([
            initialFilters.minRate ? parseInt(initialFilters.minRate) : 20,
            initialFilters.maxRate ? parseInt(initialFilters.maxRate) : 100
        ]);
        fetchLanguages();
    }, [initialFilters]);

    const handleFilterChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = event.target;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handlePriceChange: SliderProps['onChange'] = (
        event: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        // Check if newValue is an array before using it
        if (Array.isArray(newValue)) {
            setPriceRange(newValue);
            setFilters((prevFilters) => ({
                ...prevFilters,
                minRate: newValue[0].toString(),
                maxRate: newValue[1].toString()
            }));
        }
    };

    const handleApplyFilters = () => {
        onApplyFilters(filters);
        onClose();
    };

    const fetchLanguages = async () => {
        const languages = await getAllLanguages();
        setLanguages(languages);
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: isMobile ? '100vw' : 350, padding: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Filters</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    <ListItem>
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <StyledFormControl fullWidth sx={{ mr: 1 }}>
                                <InputLabel id="language-level-label">Language Level</InputLabel>
                                <Select
                                    labelId="language-level-label"
                                    name="languageLevel"
                                    value={filters.languageLevel}
                                    onChange={handleFilterChange}
                                    label="Language Level"
                                >
                                    {languageProficiencyLevels.map((level) => (
                                        <MenuItem key={level} value={level}>
                                            {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </StyledFormControl>
                            <StyledFormControl fullWidth sx={{ ml: 1 }}>
                                <TutorSortBy
                                    onSortChange={(sortBy) => setFilters((prevFilters) => ({ ...prevFilters, sortBy }))}
                                    value={filters.sortBy}
                                />
                            </StyledFormControl>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <StyledFormControl fullWidth>
                            <InputLabel id="language-label">Language</InputLabel>
                            <Select
                                labelId="language-label"
                                name="language"
                                value={filters.languageToTeach}
                                onChange={handleFilterChange}
                                label="Language"
                            >
                                {languages.map((language) => (
                                    <MenuItem key={language.languageName} value={language.languageName}>
                                        {language.languageName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </StyledFormControl>
                    </ListItem>
                    <ListItem>
                        <StyledFormControl fullWidth>
                            <Typography gutterBottom>Price Range</Typography>
                            <Slider
                                value={priceRange}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={200}
                                step={10}
                                marks={[
                                    { value: 0, label: '0' },
                                    { value: 50, label: '50' },
                                    { value: 100, label: '100' },
                                    { value: 150, label: '150' },
                                    { value: 200, label: '200' },
                                ]}
                            />
                        </StyledFormControl>
                    </ListItem>
                    <ListItem>
                        <StyledFormControl fullWidth variant="outlined">
                            <TextField
                                name="keyword"
                                value={filters.keyword}
                                onChange={handleFilterChange}
                                placeholder="Search..."
                                label="Keyword"
                            />
                        </StyledFormControl>
                    </ListItem>
                </List>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button variant="contained" color="primary" onClick={handleApplyFilters}>
                        OK
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default FilterDrawer;
