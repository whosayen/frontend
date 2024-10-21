import { UserRoleEnum } from "../enums";
import { FullUserSearchDto, Role, ScheduleSettingsRequest } from "./dtoTypes"

export function isRole(value: any): value is Role {
    return value in UserRoleEnum;
}

export const isScheduleSettingsRequest = (arg: any): arg is ScheduleSettingsRequest => {
    const obj = arg as ScheduleSettingsRequest;

    return obj.mondayAvailableTimes !== undefined
        && obj.tuesdayAvailableTimes !== undefined
        && obj.wednesdayAvailableTimes !== undefined
        && obj.thursdayAvailableTimes !== undefined
        && obj.fridayAvailableTimes !== undefined
        && obj.saturdayAvailableTimes !== undefined
        && obj.sundayAvailableTimes !== undefined;
};

// export type FullUserSearchDto = {
//     userSearchDto: UserSearchDto;
//     userSettingsSearchDto: UserSettingsSearchDto;
//     tutorSearchDto: TutorSearchDto;
// }
export const isFullUserSearchDto = (arg: any): arg is FullUserSearchDto => {
    const obj = arg as FullUserSearchDto;

    return obj.userSearchDto !== undefined
        && obj.userSettingsSearchDto !== undefined
        && obj.tutorSearchDto !== undefined;
}
