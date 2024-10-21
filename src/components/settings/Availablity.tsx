import React, { use, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { TutorAvailability } from "@/lib/tutorAvailability"; // Ensure this is correctly set up to handle the initial state
import Availability from '../parts/tutor/RegistrationSteps/Availability';
import { FullUserDto, ScheduleDto } from "@/lib/types/dtoTypes";
import { availabilityStateToScheduleDto, scheduleDtoToAvailabilityState } from '@/lib/utils';

type AvailabilityFormProps = {
    userScheduleData: ScheduleDto;
    onScheduleChange: (scheduleDto: ScheduleDto) => void;
};

const AvailabilityForm = ({ userScheduleData, onScheduleChange }: AvailabilityFormProps) => {

    const handleAvailabilityChange = (availability : TutorAvailability.AvailabilityState) => {
        onScheduleChange(availabilityStateToScheduleDto(availability));
    };

    return (
        <Grid container spacing={3} sx={{ margin: 2 }}> {/* Outer margin for the whole form */}
            <Grid item xs={12} sx={{ padding: 2, bgcolor: 'background.paper', borderRadius: '8px' }}> {/* Additional styling for the availability container */}
                <Availability initialAvailabilityState={scheduleDtoToAvailabilityState(userScheduleData)} onAvailabilityChange={handleAvailabilityChange} />
            </Grid>
        </Grid>
    );
};

export default AvailabilityForm;
