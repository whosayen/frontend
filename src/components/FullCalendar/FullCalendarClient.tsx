"use client";
import React, { useRef, useState, useEffect } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { EventClickArg, EventSourceInput } from '@fullcalendar/core';
import { FullCalendarLessonInfoModal } from './FullCalendarLessonInfoModal';
import FullCalendarStyle from './FullCalendarStyle';
import { getDurationInMinutes } from '@/lib/fullCalendar';
import { BookingDuration } from "@/lib/types/dtoTypes";
import { BookingDto } from "@/lib/types/dtoTypes";
import { fetchBookings } from '@/lib/api';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { dateStringWithoutTimezone } from '@/lib/utils';
import api from '@/lib/apiConfig';


export const calculateEndTime = (startTime: string, duration: BookingDuration): string => {
    const startDate = new Date(startTime);

    // Check if startTime is a valid date
    if (isNaN(startDate.getTime())) {
        console.error("Invalid start time provided:", startTime);
        return "Invalid start time"; // Handle invalid start time gracefully
    }

    const endDate = new Date(startDate.getTime() + getDurationInMinutes(duration) * 60000);

    // Check if endDate calculation is valid
    if (isNaN(endDate.getTime())) {
        console.error("Error calculating end time from:", startTime, "with duration:", duration);
        return "Invalid end time"; // Handle invalid end time gracefully
    }

    return endDate.toISOString();
};


export default function FullCalendarClient() {
    const calendarRef = useRef<FullCalendar | null>(null);
    const [bookings, setBookings] = useState<BookingDto[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<BookingDto | null>(null);
    const [isLessonDialogOpen, setLessonDialogOpen] = useState<boolean>(false);
    const [fullCalendarEvents, setFullCalendarEvents] = useState<EventSourceInput | undefined>();
    const [userRole, setUserRole] = useState<string | null>(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (typeof window !== "undefined") {
            const role = sessionStorage.getItem('role');
            setUserRole(role);
        }
    }, []);

    useEffect(() => {

        const fullCalendarEvents: EventSourceInput = bookings
            .filter(lesson => lesson.type !== 'DECLINED')
            .map(lesson => ({
                id: lesson.enrollmentDto.id,
                title: getLessonParticipantName(userRole, lesson),
                start: dateStringWithoutTimezone(lesson.time),
                end: calculateEndTime(dateStringWithoutTimezone(lesson.time), lesson.bookingDuration),
            }));

        setFullCalendarEvents(fullCalendarEvents);
    }, [bookings]);

    const fetchAndSetBookings = async () => {
        try {
            const startTime = new Date().toISOString();
            const finishTime = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
            const bookings = await fetchBookings(startTime, finishTime, userRole);
            console.log(bookings)
            setBookings(bookings);
            console.log(bookings)
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {

        const fetchAndSetBookings = async () => {
            try {
                const startTime = new Date().toISOString();
                const finishTime = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
                const bookings = await fetchBookings(startTime, finishTime, userRole);
                console.log(bookings)
                setBookings(bookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchAndSetBookings();
    }, [userRole]);


    const handleEventClick = (arg: EventClickArg) => {
        const clickedLesson = bookings.find(lesson => lesson.enrollmentDto.id === arg.event.id);
        if (clickedLesson) {
            setSelectedLesson(clickedLesson);
            setLessonDialogOpen(true);
        }
    };

    const handleCancelLesson = async (id: string) => {
        try {
            // Send DELETE request using the axios instance
            const response = await api.delete(`/enrollment/cancel-booking/${id}`);

            if (response.status === 200) { // Check if the response was successful
                setLessonDialogOpen(false);
                setOpenSnackbar(true);
                setSnackbarMessage('Lesson cancel request has been processed successfully');
                setSnackbarSeverity('success');
                fetchAndSetBookings(); // Optionally refresh bookings to reflect the cancellation
            } else {
                throw new Error('Failed to cancel lesson'); // Handle any non-200 responses
            }
        } catch (error) {
            console.error('Error deleting lesson:', error);
            setOpenSnackbar(true);
            setSnackbarMessage('Failed to cancel lesson. Please try again.');
            setSnackbarSeverity('error');
        }
    };

    const handleUpdateLesson = async (updatedLesson: BookingDto) => {
        try {
            await api.put(`/lessons/${updatedLesson.enrollmentDto.id}`, updatedLesson);

            setBookings(prevLessons =>
                prevLessons.map(lesson =>
                    (lesson.enrollmentDto.id === updatedLesson.enrollmentDto.id ? updatedLesson : lesson)
                )
            );

            setLessonDialogOpen(false);
        } catch (error) {
            console.error('Error updating lesson:', error);
        }
    };

    const handleSubmitFeedback = async (lessonId: string, rating: number, comment: string, tutorId: string) => {
        try {
            // Use the axios instance to make the PUT request
            await api.put('/enrollment/rate', null, {
                params: {
                    tutorId,
                    rate: rating,
                    comment,
                },
                headers: {
                    'Content-Type': 'application/json', // Ensure the correct content type
                },
            });

            // Update the local state to reflect the feedback submission
            setBookings(prevLessons =>
                prevLessons.map(lesson =>
                    lesson.enrollmentDto.id === lessonId ? { ...lesson, hasRated: true } : lesson
                )
            );

            setLessonDialogOpen(false); // Close the dialog after submission
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <>
            <div className="p-2">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                    }}
                    initialView="dayGridMonth"
                    allDaySlot={false}
                    nowIndicator={true}
                    events={fullCalendarEvents}
                    eventClick={handleEventClick}
                    firstDay={1}
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false // 24-hour format
                    }}
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false // 24-hour format for events
                    }}
                />
            </div>

            {selectedLesson && (
                <FullCalendarLessonInfoModal
                    open={isLessonDialogOpen}
                    lesson={selectedLesson}
                    onClose={() => setLessonDialogOpen(false)}
                    onCancel={handleCancelLesson}
                    onUpdate={handleUpdateLesson}
                    onSubmitFeedback={handleSubmitFeedback}
                    userRole={userRole}
                />
            )}

            {/* Snackbar for feedback */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <FullCalendarStyle />
        </>
    );
}
function getLessonParticipantName(userRole: string | null, lesson: BookingDto): string {
    return userRole == 'TUTOR' ? `${lesson.enrollmentDto.bookingEnrollmentStudentDto.firstName} ${lesson.enrollmentDto.bookingEnrollmentStudentDto.lastName}` : `${lesson.enrollmentDto.bookingEnrollmentTutorDto.firstName} ${lesson.enrollmentDto.bookingEnrollmentTutorDto.lastName}`;
}

