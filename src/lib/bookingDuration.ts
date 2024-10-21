import { BookingDurationEnum } from "./enums";
import { BookingDurationLabel, BookingDuration } from "./types/dtoTypes";

export const bookingDurationLabel: BookingDurationLabel = {
    THIRTY_MINUTES: "30 minutes",
    FORTY_FIVE_MINUTES: "45 minutes",
    ONE_HOUR: "1 hour",
    ONE_AND_HALF_HOUR: "1.5 hours"
};

export const bookingDurations: BookingDuration[] = Object.keys(BookingDurationEnum) as BookingDuration[];