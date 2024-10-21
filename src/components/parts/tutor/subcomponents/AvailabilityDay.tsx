import React from 'react';
import {Box, Checkbox, FormControlLabel, IconButton} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {AvailabilityDaySlot} from './AvailabilityDaySlot';
import {TutorAvailability} from "@/lib/tutorAvailability";

interface AvailabilityDayProps {
    day: string;
    state: TutorAvailability.Day;
}

export const AvailabilityDay: React.FC<AvailabilityDayProps> = ({day, state}) => {
    const dispatch = TutorAvailability.useDispatch();

    return (
        <Box padding={2} borderBottom="1px solid grey">
            <FormControlLabel
                control={<Checkbox checked={state.active} onChange={() => dispatch({type: 'TOGGLE_DAY', day})}/>}
                label={day}
            />
            {state.slots.map(slot => (
                <AvailabilityDaySlot key={slot.id} day={day} slot={slot}/>
            ))}
            <IconButton onClick={() => dispatch({type: 'ADD_SLOT', day})}>
                <AddCircleOutlineIcon/>
            </IconButton>

        </Box>
    );
};
