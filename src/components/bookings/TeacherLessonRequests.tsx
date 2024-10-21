'use client';
import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from '@mui/material';
import { BookingDto } from "@/lib/types/dtoTypes";
import { fetchBookings, cancelBooking } from '@/lib/api'; 
import { StatusEnum } from '@/lib/enums';
import { useRouter } from 'next/navigation';
import { BookingDuration } from "@/lib/types/dtoTypes";
import api from '@/lib/apiConfig';

const getDurationText = (duration: BookingDuration) => {
    switch (duration) {
        case 'THIRTY_MINUTES':
            return '30 minutes';
        case 'ONE_HOUR':
            return '1 hour';
        case 'ONE_AND_HALF_HOUR':
            return '1.5 hours';
        case 'FORTY_FIVE_MINUTES':
            return '45 minutes';
        default:
            return '';
    }
};

function formatDateString(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

const TeacherLessonRequests = () => {
    const [lessonRequests, setLessonRequests] = useState<BookingDto[]>([]);
    const [loading, setLoading] = useState(true); // Start loading as true
    const [userRole, setUserRole] = useState<string | null>(null); 
    const router = useRouter();


    const handleAction = async (bookingId: string, accepted: boolean) => {
        try {
            const response = await api.put(`/tutor/bookings/${bookingId}`, null, {
                params: {
                    accepted: accepted,
                }
            });
    
            if (response.status === 200) {
                setLessonRequests((prev) =>
                    prev.map((lesson) =>
                        lesson.id === bookingId
                            ? { ...lesson, status: accepted ? StatusEnum.CONFIRMED : StatusEnum.DECLINED }
                            : lesson
                    )
                );
            } else {
                console.error('Failed to update lesson status', response);
            }
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error updating lesson status:', error);
        }
    };

    const handleCancelBooking = async (bookingId: string) => {
        try {
            await cancelBooking(bookingId); // Call the API to cancel the booking
            setLessonRequests((prev) => prev.filter((lesson) => lesson.id !== bookingId)); // Remove canceled lesson from the list
        } catch (error) {
            console.error('Error canceling booking:', error);
        }
    };

    useEffect(() => {

        const fetchAndSetBookings = async () => {
            try {
                const startTime = new Date().toISOString();
                const finishTime = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
                const bookings = await fetchBookings(startTime, finishTime, userRole);
                setLessonRequests(bookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false); // Ensure loading is set to false after fetching
            }
        };


        const role = sessionStorage.getItem('role');
        setUserRole(role);

        if (role !== 'TUTOR' && role !== 'STUDENT') {
            router.push('/not-authorized');
            return;
        }

        fetchAndSetBookings();
    }, [router, userRole]);

    if (loading) {
        return <Typography>Loading...</Typography>; // Display loading state
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">
                {userRole === 'TUTOR' ? 'Pending Lesson Approvals' : 'My Bookings'}
            </Typography>
            {lessonRequests.length === 0 ? (
                <Typography>No lessons found.</Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{userRole === 'TUTOR' ? 'Student Name' : 'Tutor Name'}</TableCell>
                            <TableCell>Course Name</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lessonRequests.map((lesson) => (
                            <TableRow key={lesson.id}>
                                <TableCell>{lesson.enrollmentDto.bookingEnrollmentStudentDto.firstName} {lesson.enrollmentDto.bookingEnrollmentStudentDto.lastName}</TableCell>
                                <TableCell>{lesson.enrollmentDto.bookingEnrollmentStudentDto.userDto.email}</TableCell>
                                <TableCell>{formatDateString(lesson.time)}</TableCell>
                                <TableCell>{getDurationText(lesson.bookingDuration)}</TableCell>
                                <TableCell>{lesson.status}</TableCell>
                                <TableCell>{lesson.type}</TableCell>
                                <TableCell>
                                    {userRole === 'TUTOR' && lesson.status === StatusEnum.WAITING && (
                                        <>
                                            <Button variant="contained" color="primary" onClick={() => handleAction(lesson.id, true)}>
                                                Confirm
                                            </Button>
                                            <Button variant="outlined" color="secondary" onClick={() => handleAction(lesson.id, false)} style={{ marginLeft: '8px' }}>
                                                Decline
                                            </Button>
                                        </>
                                    )}
                                    {userRole === 'STUDENT' && lesson.status === StatusEnum.CONFIRMED && (
                                        <Button variant="outlined" color="secondary" onClick={() => handleCancelBooking(lesson.id)}>
                                            Cancel
                                        </Button>
                                    )}
                                    {lesson.status === StatusEnum.CONFIRMED && userRole === 'TUTOR' && <Typography>-</Typography>}
                                    {lesson.status === StatusEnum.DECLINED && <Typography>-</Typography>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Box>
    );
};

export default TeacherLessonRequests;
