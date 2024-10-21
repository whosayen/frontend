import { BookingDuration } from "../types/dtoTypes";
import { useEffect, useState } from "react";
import { getWeeksUntilStartDate, convertBookingDataToScheduleData } from "@/lib/tutorSchedule";
import { CalendarDto } from "@/lib/types/dtoTypes";
import { ScheduleData } from "@/lib/types/clientTypes";
import api from "../apiConfig";
import { set } from "date-fns";

export const useTutorSchedule = (tutorId: string, duration: BookingDuration, startDate: Date) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
    const [error, setError] = useState<string | undefined>(undefined); // TODO delete unnecessary error state, you can use one state



    useEffect(() => {
        const fetchTutorData = async () => {
            setLoading(true); // Start loading
            setError(undefined); // Clear error

            const accessToken = sessionStorage.getItem("accessToken");

            if (!accessToken) {
                console.error("Access token not found");
                setLoading(false); // Stop loading on error
                return;
            }

            const weekToFetch = getWeeksUntilStartDate(startDate);

            try {
                // Using the axios instance to make the GET request
                const response = await api.get<CalendarDto>(`/calendar/${tutorId}/${weekToFetch}/${duration}`);

                if (response.status === 403) {
                    throw new Error("Forbidden: Tutor is not approved");
                }

                if (!response.data) {
                    throw new Error("Failed to fetch tutor data");
                }

                // Convert the booking data to schedule data
                const scheduleData = convertBookingDataToScheduleData(response.data.bookingStartTimeDtoList);

                // Convert the date to only keep year, month, and day
                const filteredScheduleData: ScheduleData[] = scheduleData.filter((entry) => {
                    const entryDate = new Date(entry.date);
                    return entryDate.setHours(0, 0, 0, 0) >= startDate.setHours(0, 0, 0, 0);
                });

                console.log("Filtered Schedule data:", filteredScheduleData);
                setScheduleData(filteredScheduleData);
            } catch (error) {
                console.error("Error fetching tutor data:", error);
                setError(`Error fetching tutor data: ${error}`);
            } finally {
                setLoading(false);
            }
        }

        fetchTutorData();
    }, [tutorId, duration, startDate]);

    return { loading, scheduleData, error};
}
