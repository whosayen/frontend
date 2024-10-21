import { Availability } from "./types/dtoTypes";
import { ScheduleDto, TimeIntervalDto } from "./types/dtoTypes";
import { TutorAvailability } from "./tutorAvailability";
import { AvailableIntervalDto, ScheduleSettingsRequest } from "./types/dtoTypes";
import { ChatMessageDto } from "./types/dtoTypes";
import { LecChatMessageData } from "./types/clientTypes";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

export type day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
export const days: day[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export type AvailabilityObject = {
    [key in day]: {
        startTime: string;
        finishTime: string;
    } | null;
}

export function toAvailableObject(availability: Availability[]) {
    const availableObject: any = {}; // TODO use strict type

    availability.forEach((item) => {
        availableObject[item.day] = {
            startTime: item.startTime,
            finishTime: item.finishTime
        }
    });

    return availableObject;
}

export function toAvailabilityArray(availableObject: any) {
    const availability: Availability[] = [];
    days.forEach((day) => {
        if (availableObject[day]) {
            availability.push({
                day: day,
                startTime: availableObject[day].start_time,
                finishTime: availableObject[day].finish_time
            });
        }
    });
    return availability;
}

export function saveAuthorizationTokens(token: { accessToken: string, refresh_token: string, role: string, id: string }) {
    sessionStorage.setItem("accessToken", token.accessToken);
    localStorage.setItem("refreshToken", token.refresh_token);
    sessionStorage.setItem("role", token.role);
    sessionStorage.setItem("id", token.id);
}

export function scheduleDtoToAvailabilityState(scheduleDto: ScheduleDto) {
    // Create a deep copy of the initial availability state
    const availabilityState: TutorAvailability.AvailabilityState = JSON.parse(JSON.stringify(TutorAvailability.initialAvailabilityState));

    const days: (keyof ScheduleDto)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    days.forEach((day) => {
        scheduleDto[day].forEach((timeInterval) => {
            // 15:00:00 -> 15:00
            const from = timeInterval.start.slice(0, -3);
            const to = timeInterval.end.slice(0, -3);
            const availabilityDay = day.charAt(0).toUpperCase() + day.slice(1);

            // Ensure slots is an array
            if (!availabilityState.availability[availabilityDay].slots) {
                availabilityState.availability[availabilityDay].slots = [];
            }

            const id = availabilityState.availability[availabilityDay].slots.length;
            console.log(availabilityState.availability[availabilityDay].slots);

            // Directly push into the mutable array
            availabilityState.availability[availabilityDay].slots.push({ id, from, to });

            availabilityState.availability[availabilityDay].active = true;
        });
    });

    return availabilityState;
}


export function availabilityStateToScheduleDto(availabilityState: TutorAvailability.AvailabilityState) {
    const scheduleDto: ScheduleDto = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    };

    const days: (keyof ScheduleDto)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach((day) => {
        const availabilityDay = day.charAt(0).toUpperCase() + day.slice(1);
        availabilityState.availability[availabilityDay].slots.forEach((slot) => {
            const start = slot.from + ':00';
            const end = slot.to + ':00';
            scheduleDto[day].push({ start, end });
        });
    });

    return scheduleDto;
}

export function convertScheduleDtoToSettingsRequest(scheduleDto: ScheduleDto): ScheduleSettingsRequest {
    const convertTimeIntervalToAvailableInterval = (timeIntervals: TimeIntervalDto[]): AvailableIntervalDto[] => {
        return timeIntervals.map(timeInterval => ({
            start: timeInterval.start,
            end: timeInterval.end,
        }));
    };

    return {
        mondayAvailableTimes: convertTimeIntervalToAvailableInterval(scheduleDto.monday),
        tuesdayAvailableTimes: convertTimeIntervalToAvailableInterval(scheduleDto.tuesday),
        wednesdayAvailableTimes: convertTimeIntervalToAvailableInterval(scheduleDto.wednesday),
        thursdayAvailableTimes: convertTimeIntervalToAvailableInterval(scheduleDto.thursday),
        fridayAvailableTimes: convertTimeIntervalToAvailableInterval(scheduleDto.friday),
        saturdayAvailableTimes: convertTimeIntervalToAvailableInterval(scheduleDto.saturday),
        sundayAvailableTimes: convertTimeIntervalToAvailableInterval(scheduleDto.sunday),
    };
}

export function convertToLecChatMessageData(message: ChatMessageDto): LecChatMessageData {
    return {
        direction: message.senderId === sessionStorage.getItem('id') ? 'outgoing' : 'incoming',
        content: message.content,
        senderName: message.senderName,
    }
}

// Written by Ismail Ulas Unal
export const formatDateString = (dateString: string) => {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [time] = timePart.split('+'); // Ignore the timezone offset
    const [hours, minutes] = time.split(':');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const formattedMonth = months[parseInt(month) - 1];

    return `${parseInt(day)} ${formattedMonth} ${year} ${hours}:${minutes}`;
};

export const dateStringWithoutTimezone = (dateString: string) => {
    return dateString.split('+')[0];
}

export function convertToTimezoneOptions(timezones: string[]): { id: string, label: string }[] {
    return timezones.map(timezone => {
        const label = timezone.split('/').pop() || timezone;
                return { id: timezone, label: label };
    });
}