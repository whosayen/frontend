import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import {bookingDurationLabel, bookingDurations} from "@/lib/bookingDuration";
import { BookingDuration } from "@/lib/types/dtoTypes";

type BookingDurationSelectProps = {
    value: BookingDuration | undefined;
    onChange: (event: SelectChangeEvent<BookingDuration>) => void;
    variant?: "standard" | "outlined" | "filled";
};

const BookingDurationSelect: React.FC<BookingDurationSelectProps> = ({ value, onChange, variant = "outlined" }) => {
    return (
        <Select value={value} onChange={onChange} variant={variant}>
            {bookingDurations.map((duration) => (
                <MenuItem key={duration} value={duration}>
                    {bookingDurationLabel[duration]}
                </MenuItem>
            ))}
        </Select>
    );
};

export default BookingDurationSelect;
