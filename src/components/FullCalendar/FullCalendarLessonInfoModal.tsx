import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { Rating } from "@mui/material";
import { TextField } from "@mui/material";
import { getDurationInMinutes } from "@/lib/fullCalendar";
import { BookingDto } from "@/lib/types/dtoTypes";
import { formatDateString } from "@/lib/utils";

interface FullCalendarLessonInfoDialogProps {
    open: boolean;
    lesson: BookingDto;
    onClose: () => void;
    onCancel: (id: string) => void;
    onUpdate: (lesson: any) => void;
    onSubmitFeedback: (lessonId: string, rating: number, comment: string, tutorId: string) => void;
    userRole: string | null;
}



export const FullCalendarLessonInfoModal: React.FC<FullCalendarLessonInfoDialogProps> = ({
    open,
    lesson,
    onClose,
    onCancel: onCancel,
    onUpdate,
    onSubmitFeedback,
    userRole,
}) => {
    const [rating, setRating] = useState<number | null>(0);
    const [comment, setComment] = useState<string>("");
    const [start, setStart] = useState<Date | null>(new Date(lesson.time));
    const [end, setEnd] = useState<Date | null>(
        new Date(new Date(lesson.time).getTime() + getDurationInMinutes(lesson.bookingDuration) * 60000)
    );

    console.log(lesson.time);

    const handleFeedbackSubmit = () => {
        if (rating !== null && comment.trim()) {
            console.log(lesson)
            onSubmitFeedback(lesson.enrollmentDto.id, rating, comment, lesson.enrollmentDto.bookingEnrollmentTutorDto.tutorId);
        }
    };

    const handleReschedule = () => {
        const updatedLesson = {
            ...lesson,
            time: start!.toISOString(),
            bookingDuration: { durationMinutes: (end!.getTime() - start!.getTime()) / 60000 },
        };
        onUpdate(updatedLesson);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        Lesson
                    </Box>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box marginTop={2}>
                    <p><strong>Student Name:</strong> {lesson.enrollmentDto.bookingEnrollmentStudentDto.firstName} {lesson.enrollmentDto.bookingEnrollmentStudentDto.lastName}</p>
                    <p><strong>Student Mail:</strong> {lesson.enrollmentDto.bookingEnrollmentStudentDto.userDto.email}</p>
                    <p><strong>Tutor Name:</strong> {lesson.enrollmentDto.bookingEnrollmentTutorDto.firstName} {lesson.enrollmentDto.bookingEnrollmentTutorDto.lastName}</p>
                    <p><strong>Date:</strong> {formatDateString(lesson.time)}</p>
                    <p><strong>Duration:</strong> {getDurationInMinutes(lesson.bookingDuration)} min. </p>
                    <p><strong>Status:</strong> {lesson.status}</p>

                    {userRole === "STUDENT" && lesson.status === "DONE" && (
                        <Box marginTop={2}>
                            <h4>Rate and Comment on This Lesson</h4>
                            <Rating
                                name="rating"
                                value={rating}
                                onChange={(event, newValue) => setRating(newValue)}
                            />
                            <TextField
                                label="Comment"
                                multiline
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <Button
                                onClick={handleFeedbackSubmit}
                                variant="contained"
                                color="primary"
                            >
                                Submit Feedback
                            </Button>
                        </Box>
                    )}

                    {/* {userRole === "TUTOR" && (
                        <Box marginTop={2}>
                            <h4>Reschedule Lesson</h4>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={2}>
                                    <DateTimePicker
                                        label="Start Time"
                                        value={start}
                                        onChange={(date) => setStart(date)}
                                    />
                                    <DateTimePicker
                                        label="End Time"
                                        value={end}
                                        onChange={(date) => setEnd(date)}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <Button
                                onClick={handleReschedule}
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: 2 }}
                            >
                                Save Reschedule
                            </Button>
                        </Box>
                    )} */}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onCancel(lesson.id)} color="secondary">
                    Cancel Lesson
                </Button>
            </DialogActions>
        </Dialog>
    );
};
