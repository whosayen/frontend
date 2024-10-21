import { BookingStartTimeDto} from "@/lib/types/dtoTypes";
import { ScheduleData } from "@/lib/types/clientTypes";
import { addDays, differenceInDays, format } from "date-fns";

export const convertBookingDataToScheduleData = (bookings: BookingStartTimeDto[]): ScheduleData[] => {
    const dateMap: { [key: string]: ScheduleData['times'] } = {};

    bookings.forEach(booking => {
        const [date, time] = booking.startTime.split('T');
        const formattedTime = time.split('+')[0].slice(0, 5); // Extract the time in HH:MM format
        const fullDateTime = booking.startTime;

        if (!dateMap[date]) {
            dateMap[date] = [];
        }
        dateMap[date].push({ time: formattedTime, type: booking.type, fullDateTime });
    });

    // Determine the date range
    const allDates = Object.keys(dateMap);
    const minDate = new Date();
    const maxDate = new Date(Math.max(...allDates.map(date => new Date(date).getTime())));

    // Generate all dates between minDate and maxDate
    const allGeneratedDates = Array.from({ length: differenceInDays(maxDate, minDate) + 2 }, (_, i) =>
        format(addDays(minDate, i), 'yyyy-MM-dd')
    );

    const defaultIntervalType = 'NOT_AVAILABLE';

    // Map through the generated dates and fill missing days
    return allGeneratedDates.map(date => ({
        date,
        times: allTimes.map(time => {
            const booking = dateMap[date]?.find(t => t.time === time);
            return {
                time,
                type: booking?.type || defaultIntervalType,
                fullDateTime: booking?.fullDateTime || ""
            };
        })
    }));
};


/**
 * Calculates the number of weeks remaining from the given start date to today.
 * 
 * @param {Date} currentStartDate - The start date to calculate the week difference from.
 * @returns {number} - The number of weeks between the current date and the provided start date.
 */
export const getWeeksUntilStartDate = (currentStartDate: Date): number => {
    const today = new Date();
    const diffInTime = currentStartDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return Math.floor(diffInDays / 7);
}


const generateTimes = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            times.push(`${formattedHour}:${formattedMinute}`);
        }
    }
    return times;
};

export const allTimes = generateTimes();