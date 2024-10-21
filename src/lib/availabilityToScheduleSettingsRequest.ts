import { TutorAvailability } from "./tutorAvailability";
import { ScheduleSettingsRequest } from "./types/dtoTypes";
import { isScheduleSettingsRequest } from "./types/guards";

export function availabilityStateToScheduleSettingsRequest(availabilityState: TutorAvailability.AvailabilityState): ScheduleSettingsRequest {
    console.log(availabilityState);

    const scheduleSettingsRequest: any = {};

    Object.keys(availabilityState.availability).forEach(day => {
        const dayAvailability = availabilityState.availability[day];
        console.log(availabilityState);
        if (dayAvailability.active) {
            scheduleSettingsRequest[`${day.toLowerCase()}AvailableTimes`] = dayAvailability.slots.map(slot => {
                return {
                    start: slot.from,
                    end: slot.to
                };
            });
        } else {
            scheduleSettingsRequest[`${day.toLowerCase()}AvailableTimes`] = [];
        }
    });

    if (isScheduleSettingsRequest(scheduleSettingsRequest)) {
        return scheduleSettingsRequest;
    } else {
        throw new Error('Invalid ScheduleSettingsRequest');
    }
}