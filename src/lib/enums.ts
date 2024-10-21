/* eslint-disable no-unused-vars */

export enum UserRoleEnum {
    STUDENT = "STUDENT",
    TUTOR = "TUTOR",
    ADMIN = "ADMIN"
}

export enum StatusEnum {
    CONFIRMED = 'CONFIRMED',
    WAITING = 'WAITING',
    DECLINED = 'DECLINED',
    RESCHEDULED = 'RESCHEDULED',
    DONE = 'DONE',
    NOT_DONE = 'NOT_DONE',
}

export enum BookingDurationEnum {
    THIRTY_MINUTES = "THIRTY_MINUTES",
    FORTY_FIVE_MINUTES = "FORTY_FIVE_MINUTES",
    ONE_HOUR = "ONE_HOUR",
    ONE_AND_HALF_HOUR = "ONE_AND_HALF_HOUR"
}

export enum BookingTypeEnum {
    UPCOMING = 'UPCOMING',
    FUTURE = 'FUTURE',
    PAST = 'PAST',
    DECLINED = 'DECLINED',
    UNKNOWN = 'UNKNOWN'
}

export enum LevelEnum {
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
    NATIVE = 'NATIVE'
};

export enum TimeIntervalTypeEnum {
    AVAILABLE = 'AVAILABLE',
    BOOKED = 'BOOKED',
    BOOKED_BY_YOU = 'BOOKED_BY_YOU',
    YOU_ARE_NOT_AVAILABLE = 'YOU_ARE_NOT_AVAILABLE',
    PASSED = 'PASSED'
}
