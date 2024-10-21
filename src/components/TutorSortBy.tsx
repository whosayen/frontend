import { Teacher } from "@/lib/types/clientTypes";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/system';
import React, { use, useEffect, useState } from 'react'


type TutorSortByProps = {
    onSortChange: (sortBy: keyof Teacher) => void;
    value?: keyof Teacher;
}

const sortableOptions: { field: keyof Teacher; label: string }[] = [
    { field: 'rating', label: 'Rating' },
    { field: 'hourlyRate', label: 'Hourly Rate' },
    { field: 'name', label: 'Name' },
];

const TutorSortBy = ({onSortChange, value: value}: TutorSortByProps) => {
    const [sortBy, setSortBy] = useState<keyof Teacher>('rating'); // Default sort by rating


    useEffect(() => {
        if (value) {
            setSortBy(value);
        }
    }, [value]);

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        const newValue = event.target.value;
        const sortBy = newValue as keyof Teacher;
        setSortBy(sortBy);
        onSortChange(sortBy);
    };

    return (
        <Box display="flex" justifyContent="flex-end">
            <FormControl variant="outlined">
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                    labelId="sort-by-label"
                    value={sortBy}
                    onChange={handleSortChange}
                    label="Sort By"
                >
                    {sortableOptions.map((option) => (
                        <MenuItem key={option.field} value={option.field}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default TutorSortBy