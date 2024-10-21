import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { allTimes } from "@/lib/tutorSchedule";
import { ScheduleData } from "@/lib/types/clientTypes";
import { TimeIntervalType } from "@/lib/types/dtoTypes";
import TutorScheduleTimeButton from "@/components/TutorScheduleTimeButton";
import { BookingDuration } from "@/lib/types/dtoTypes";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from "@mui/material";
import { getDurationInMinutes } from "@/lib/fullCalendar";
import { fetchUserData } from "@/lib/api";
import { FullUserDto } from "@/lib/types/dtoTypes";
import api from "@/lib/apiConfig";

type TutorScheduleAllTimeButtonsProps = {
    bookingDuration: BookingDuration;
    scheduleData: ScheduleData[] | undefined;
    date: Date;
    tutorId: string;
    price: number;
};

const handleBookingClick = async (tutorId: string, startTime: string, bookingDuration: string) => {
    try {
        // Log the data being sent
        console.log(
            JSON.stringify({
                tutorId: tutorId,
                startTime: startTime,
                bookingDuration: bookingDuration
            })
        );

        // Use the axios instance for the PUT request
        const response = await api.put('/enrollment/book', {
            tutorId: tutorId,
            startTime: startTime,
            bookingDuration: bookingDuration
        });

        if (response.status === 200) {
            const paymentResponse = response.data;
            console.log(paymentResponse);

            // Open payment URL in a new tab if it exists
            if (paymentResponse.payment_url) {
                window.open(paymentResponse.payment_url, "_blank");
            } else {
                console.log("Booking successful without payment.");
            }
        } else {
            console.error("Failed to book a session.", response);
        }
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
    }
}

export default function TutorScheduleAllTimeButtons({
    bookingDuration,
    scheduleData,
    date,
    price,
    tutorId
}: TutorScheduleAllTimeButtonsProps) {
    const [open, setOpen] = useState(false); // State to control dialog visibility
    const [selectedTime, setSelectedTime] = useState<string | null>(null); // Store the selected booking time
    const [userData, setUserData] = useState<FullUserDto | null>(null);

    useEffect(() => {
        if (!open) return;

        const fetchData = async () => {
            const userId = sessionStorage.getItem("id");
            if (!userId) throw new Error("User ID is missing");
            try {
                const response = await fetchUserData(userId);
                setUserData(response);
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        fetchData();
    }, [open]);

    const handleClickOpen = (startTime: string | null) => {
        setSelectedTime(startTime); // Store the selected time to use in the confirmation dialog
        setOpen(true); // Open the confirmation dialog
    };

    const handleClose = () => {
        setOpen(false); // Close the dialog without confirming
    };

    const handleConfirm = () => {
        if (selectedTime) {
            handleBookingClick(tutorId, selectedTime, bookingDuration); // Confirm the booking
        }
        setOpen(false); // Close the dialog
    };


    return (
        <>
            {allTimes.map((time, index) => {
                const schedule = scheduleData?.find(
                    (schedule) => schedule.date === format(date, "yyyy-MM-dd")
                );
                const booking = schedule?.times.find((t) => t.time === time);
                const isAvailable = booking?.type === "AVAILABLE";

                const handleClick = () => {
                    if (!isAvailable) return;
                    console.log("booking is", booking);
                    const startTime = booking?.fullDateTime;
                    handleClickOpen(startTime); // Trigger the confirmation dialog
                };

                if (!booking) {
                    return <div key={index}></div>;
                }

                return (
                    <TutorScheduleTimeButton
                        key={index}
                        bookingType={booking.type}
                        time={time}
                        onClick={handleClick} // Attach the handleClick function to the button's onClick
                    />
                );
            })}

            {/* Confirmation Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="confirmation-dialog-title"
                aria-describedby="confirmation-dialog-description"
            >
                <DialogTitle id="confirmation-dialog-title">Confirm Booking</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirmation-dialog-description">
                        Are you sure you want to book this session?
                        <br />
                        <strong>Hourly Rate:</strong> ${price}
                        <br />
                        <strong>Total Price:</strong> ${price * getDurationInMinutes(bookingDuration) / 60}
                        {userData && (
                            <>
                                <br />
                                <strong>User Balance:</strong> ${userData.userDto.balance}
                                <br />
                                <strong>Remaining Balance:</strong> ${userData.userDto.balance - price * getDurationInMinutes(bookingDuration) / 60}
                                {userData.userDto.balance - price * getDurationInMinutes(bookingDuration) / 60 < 0 ? (
                                    <div style={{ color: "red" }}>
                                        Insufficient balance. You will be redirected to Stripe for payment.
                                    </div>
                                ) : (
                                    ""
                                )}                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
