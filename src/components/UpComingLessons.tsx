import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

interface Lesson {
    id: number;
    title: string;
    date: string;
    description: string;
    platform: "zoom" | "googleMeet" | "microsoftTeams" | "skype" | "lectorie" | "other" | "inPerson";
    length: number;
    startTime: string;
    willEarn: number;
    confirmation: boolean;
    cancelled: boolean;
    rescheduled: boolean;
    type: "private" | "group";
}

function UpComingLessons() {
    const data: Lesson[] = [
        { id: 1, title: "Introduction to Calculus", date: "2024-05-01", description: "Basic concepts of derivatives and integrals.", platform: "zoom", length: 90, startTime: "10:00", willEarn: 30, confirmation: true, cancelled: false, rescheduled: false, type: "group" },
        { id: 2, title: "Advanced Photography", date: "2024-05-02", description: "Mastering lighting and angles.", platform: "googleMeet", length: 120, startTime: "12:00", willEarn: 50, confirmation: true, cancelled: false, rescheduled: false, type: "private" },
        // Add more lessons as needed
    ];

    return (
        <TableContainer component={Paper}>
            <Table aria-label="upcoming lessons">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Start Time</TableCell>
                        <TableCell align="right">Platform</TableCell>
                        <TableCell align="right">Length (min)</TableCell>
                        <TableCell align="right">Earnings</TableCell>
                        <TableCell align="right">Confirmed</TableCell>
                        <TableCell align="right">Cancelled</TableCell>
                        <TableCell align="right">Rescheduled</TableCell>
                        <TableCell align="right">Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((lesson) => (
                        <TableRow key={lesson.id}>
                            <TableCell component="th" scope="row">
                                {lesson.title}
                            </TableCell>
                            <TableCell align="right">{lesson.date}</TableCell>
                            <TableCell align="right">{lesson.startTime}</TableCell>
                            <TableCell align="right">{lesson.platform}</TableCell>
                            <TableCell align="right">{lesson.length}</TableCell>
                            <TableCell align="right">${lesson.willEarn}</TableCell>
                            <TableCell align="right">{lesson.confirmation ? "Yes" : "No"}</TableCell>
                            <TableCell align="right">{lesson.cancelled ? "Yes" : "No"}</TableCell>
                            <TableCell align="right">{lesson.rescheduled ? "Yes" : "No"}</TableCell>
                            <TableCell align="right">{lesson.type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UpComingLessons;
