import React from 'react';
import {Box, IconButton, MenuItem, Select, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import {TutorAvailability} from "@/lib/tutorAvailability";
import {Hour} from "@/lib/Hour";
import BlockIcon from '@mui/icons-material/Block';

interface AvailabilityDaySlotProps {
    day: string;
    slot: TutorAvailability.TimeSlot;
}

const hours = Hour.hoursOfDays;

export const AvailabilityDaySlot: React.FC<AvailabilityDaySlotProps> = ({day, slot}) => {
    const hasError: boolean = slot.error !== undefined;
    const dispatch = TutorAvailability.useDispatch();

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Select
                value={slot.from}
                onChange={(e) => dispatch({
                    type: 'UPDATE_SLOT',
                    day,
                    slotId: slot.id,
                    field: 'from',
                    value: e.target.value
                })}
                fullWidth
                error={hasError}
            >
                {hours.map(hour => (

                    <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                ))}
            </Select>
            <Select
                value={slot.to}
                onChange={(e) => dispatch({
                    type: 'UPDATE_SLOT',
                    day,
                    slotId: slot.id,
                    field: 'to',
                    value: e.target.value
                })}
                fullWidth
                error={hasError}
            >
                {hours.map(hour => (
                    <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                ))}
            </Select>
            <IconButton onClick={() => dispatch({type: 'DELETE_SLOT', day, slotId: slot.id})}>
                <DeleteIcon/>
            </IconButton>
            {hasError && <Tooltip title={slot.error}>
                <BlockIcon color={hasError ? "error" : "disabled"}/>
            </Tooltip>}
        </Box>
    );
};
