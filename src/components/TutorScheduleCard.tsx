'use client';

import React, { use, useEffect, useState } from 'react';
import { Alert, Box, Button, Card, CircularProgress, IconButton, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { addDays, differenceInCalendarDays, format, subDays } from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BookingDurationEnum } from "@/lib/enums";
import { BookingDuration } from "@/lib/types/dtoTypes";
import BookingDurationSelect from "@/components/BookingDurationSelect";
import { useTutorSchedule } from "@/lib/hooks/useTutorSchedule";
import TutorScheduleAllTimeButtons from "@/components/TutorScheduleAllTimeButtons";

type TutorScheduleCardProps = {
    tutorId: string;
    price: number;
}

export default function TutorScheduleCard({ tutorId, price}: TutorScheduleCardProps) {
    const [startDateOfSchedule, setStartDateOfSchedule] = useState<Date>(new Date());
    const [duration, setDuration] = useState<BookingDuration>(BookingDurationEnum.THIRTY_MINUTES);
    const { loading, scheduleData, error} = useTutorSchedule(tutorId, duration, startDateOfSchedule);

    const today = new Date();
    const prevWeekDisabled = differenceInCalendarDays(startDateOfSchedule, today) <= 0;
    const nextWeekDisabled = differenceInCalendarDays(startDateOfSchedule, today) >= 28;

    const handleDurationChange = (event: SelectChangeEvent<BookingDuration>) => {
        setDuration(event.target.value as BookingDuration);
    };

    // useEffect(() => {
    //     // Calculate the start date of the schedule from scheduleData
    //     const startOfTheScheduleDate = scheduleData.length > 0 ? new Date(scheduleData[0].date) : new Date();
    //     setStartDateOfSchedule(startOfTheScheduleDate);
    // }, [scheduleData]);

    const handlePrevWeek = () => {
        const newStartDate = subDays(startDateOfSchedule, 7);
        if (prevWeekDisabled) {
            return;
        }
        setStartDateOfSchedule(newStartDate);
    };

    const handleNextWeek = () => {
        const newStartDate = addDays(startDateOfSchedule, 7);
        if (nextWeekDisabled) {
            return;
        }
        setStartDateOfSchedule(newStartDate);
    };

    const getWeekDates = (startDate: Date) => {
        return Array.from({ length: 7 }, (_, index) => addDays(startDate, index));
    };

    const weekDates = getWeekDates(startDateOfSchedule);

    if (error) {
        return (
            <Card id="schedule" sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Alert severity="error">
                    An error occurred while fetching the schedule. Please try again later.
                    <br />
                    <Typography variant="body2">
                        {error}
                    </Typography>
                </Alert>
            </Card>
        );
    }

    return (
        <Card id="schedule" sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Choose the time for your first lesson. The timings are displayed in your local timezone.
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
                <BookingDurationSelect value={duration} onChange={handleDurationChange} variant={"outlined"} />
            </Stack>
            <Box mt={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <IconButton onClick={handlePrevWeek} disabled={prevWeekDisabled}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {format(startDateOfSchedule, 'MMM d')} – {format(addDays(startDateOfSchedule, 6), 'MMM d, yyyy')}
                    </Typography>
                    <IconButton onClick={handleNextWeek} disabled={nextWeekDisabled}>
                        <ArrowForwardIcon />
                    </IconButton>
                </Stack>
                <Box className="grid grid-cols-7 gap-4 mt-4">
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="200px" width="100%">
                            <CircularProgress />
                        </Box>
                    ) : (
                        weekDates.map((date) => (
                            <Box key={date.toString()} className="flex flex-col items-center">
                                <Typography variant="subtitle1">{format(date, 'EEE')}</Typography>
                                <Typography variant="body2">{format(date, 'd')}</Typography>
                                <Box className="mt-2 space-y-1">
                                    <TutorScheduleAllTimeButtons bookingDuration={duration} scheduleData={scheduleData} date={date} tutorId={tutorId} price={price}/>
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>
            </Box>
        </Card>
    );
}
