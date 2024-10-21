import { BookingDurationEnum, BookingTypeEnum, LevelEnum, StatusEnum, TimeIntervalTypeEnum, UserRoleEnum} from "../enums";

export type TimeIntervalType = keyof typeof TimeIntervalTypeEnum;

export type BookingStartTimeDto = {
    startTime: string; // ZonedDateTime can be represented as a string in ISO format
    type: TimeIntervalType;
}
export type CalendarDto = {
     bookingStartTimeDtoList: BookingStartTimeDto[]
}

export type AvailableIntervalDto = {
    start: string; // Assuming ISO 8601 or similar format
    end: string;   // Assuming ISO 8601 or similar format
}


export type TimeIntervalDto = {
    start: string; // Assuming ISO 8601 or similar format
    end: string;   // Assuming ISO 8601 or similar format
}

export type ScheduleSettingsRequest = {
    mondayAvailableTimes: AvailableIntervalDto[];
    tuesdayAvailableTimes: AvailableIntervalDto[];
    wednesdayAvailableTimes: AvailableIntervalDto[];
    thursdayAvailableTimes: AvailableIntervalDto[];
    fridayAvailableTimes: AvailableIntervalDto[];
    saturdayAvailableTimes: AvailableIntervalDto[];
    sundayAvailableTimes: AvailableIntervalDto[];
}

export type ChatMessageDto = {
    id: string;
    chatId: string;
    senderId: string;
    recipientId: string;
    senderName: string;
    recipientName: string;
    content: string;
    timestamp: Date;
}

export type UserLastMessageDto = {
    user: UserDto
    lastMessage: ChatMessageDto
}

export type ChatMessageRequest = {
    recipientId: string;
    content: string;
}

export type ChatNotification = {
    id: string;
    userDto: UserDto; // The user who sent the message
    chatUserSettingsDto: ChatUserSettingsDto;
    content: string;
}

type ChatUserSettingsDto = {
    id: string;
    firstName: string;
    lastName: string;
    country: CountryDto;
    city: string;
    phoneCode: string;
    phoneNumber: string;
    dateOfBirth: string;  // assuming LocalDate is represented as a string in ISO format
    age: number;
};


export type TutorApiResponse = {
    content: FullUserSearchDto[];
    totalPages: number;
    number: number;
}

export type FullUserSearchDto = {
    userSearchDto: UserSearchDto;
    userSettingsSearchDto: UserSettingsSearchDto;
    tutorSearchDto: TutorSearchDto;
}

export type UserSearchDto= {
    id: string;
    role: string;
}

export type UserSettingsSearchDto= {
    id: string;
    firstName: string;
    lastName: string;
    countryDto: CountryDto;
    city: string | null;
    timezone: string;
    age: number | null;
    image: string | null;
}

export type TutorSearchDto= {
    tutorId: string;
    languageLevelDtos: Array<LanguageLevelDto>;
    languageToTeach: LanguageDto;
    hourlyRate: number;
    shortDescription: string;
    description: string;
    videoUrl: string;
    schedule: ScheduleDto;
    allowedBookingDurations: Array<string>;
    avgRate: number | null;
    rateCount: number;
    enrollmentDtos: Array<EnrollmentDto>;
}

export type EnrollmentDto= {
    id: string;
    rate: number | null;
    comment: string | null;
    bookings: EnrollmentBookingDto[];
    tutorId: string;
    userSettings: UserSettingsSearchDto;
}

export type EnrollmentBookingDto= {
    id: string;
    status: Status;
    time: string; // ZonedDateTime can be converted to string in TypeScript (ISO string format)
    bookingDuration: BookingDuration;
    price: number;
}
export type BookingDto = {
    id: string;
    type: BookingType;
    status: Status;
    time: string;
    enrollmentDto: BookingEnrollmentDto;
    bookingDuration: BookingDuration;
    price: number
};

export type Role = keyof typeof UserRoleEnum;

export type UserDto= {
    id: string;
    role: Role;
    email: string;
    isEnabled: boolean;
    isCredentialsNonExpired: boolean;
    isAccountNonExpired: boolean;
    isAccountNonLocked: boolean;
    balance: number;
}

export type UserSettingsDto= {
    id: string;
    firstName: string;
    lastName: string;
    country: CountryDto;
    city: string;
    phoneCode: string;
    phoneNumber: string;
    timezone: string;
    dateOfBirth: string; // Assuming it's a string representing the date
    age: number;
    image: string; // base64 encoded image
}

export type LanguageDto ={
    languageName: string;
    code: string;
}

export type LanguageProficiencyLevel = keyof typeof LevelEnum;

export type LanguageLevelDto = {
    languageDto: LanguageDto;
    level: LanguageProficiencyLevel;
}

export type ScheduleDto= {
    monday: TimeIntervalDto[];
    tuesday: TimeIntervalDto[];
    wednesday: TimeIntervalDto[];
    thursday: TimeIntervalDto[];
    friday: TimeIntervalDto[];
    saturday: TimeIntervalDto[];
    sunday: TimeIntervalDto[];
}

export type TutorDto = {
    tutorId: string;
    languageLevelDtos: LanguageLevelDto[];
    languageToTeach: LanguageDto;
    hourlyRate: number;
    shortDescription: string;
    description: string;
    videoUrl: string;
    scheduleDto: ScheduleDto;
    isApproved: boolean;
    enrollmentDtos: EnrollmentDto[];
    allowedBookingDurations: BookingDuration[];
    avgRate: number;
    rateCount: number;
}

export type FullUserDto= {
    userDto: UserDto;
    userSettingsDto: UserSettingsDto;
    tutorDto: TutorDto | null;
}
export type Lesson = {
    id: string;
    studentName: string;
    startDate: string;
    endDate: string;
};
export type Student = {
    id: number;
    name: string;
};
export type BookingType = keyof typeof BookingTypeEnum;

export type Status = keyof typeof StatusEnum;

export type BookingEnrollmentTutorDto = {
    firstName: string;
    lastName: string;
    tutorId: string;
};

export type BookingEnrollmentStudentDto = {
    id: string;
    firstName: string;
    lastName: string;
    countryDto: CountryDto;
    phoneCode: string;
    phoneNumber: string;
    timezone: string;
    userDto: UserDto;
    age: number;
};

export type CountryDto = {
    id: string | undefined | null
    name: string;
    code: string;
};


export type BookingEnrollmentDto = {
    rate: number;
    comment: string;
    bookingEnrollmentTutorDto: BookingEnrollmentTutorDto;
    bookingEnrollmentStudentDto: BookingEnrollmentStudentDto;
    id: string;
};
export type Availability = {
    day: string;
    startTime: string;
    finishTime: string;
};
export type BookingDuration = keyof typeof BookingDurationEnum;

export type BookingDurationLabel = {
    [key in BookingDuration]: string;
};

export type ChangeUserSettingsRequest = { 
    firstName?: string;
    lastName?: string;
    countryName?: string;
    city?: string;
    phoneCode?: string;
    phoneNumber?: string;
    timezone?: string;
    dateOfBirth?: string; // Using string here as ISO date strings are easier in JSON.
}

export type ChangeTutorSettingsRequest = {
    languageDto?: LanguageDto;
    hourlyRate?: number;
    shortDescription?: string;
    description?: string;
    videoUrl?: string;
}

export type ChangeUserRequest = {
    password: string;
}

export type ChangeSettingsRequest = {
    changeUserSettingsRequest?: ChangeUserSettingsRequest;
    changeTutorSettingsRequest?: ChangeTutorSettingsRequest;
    changeUserRequest?: ChangeUserRequest;
}

export type TimezoneResponse = string[];

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    role: Role;
    id: string;
}

export interface ApiError {
    error: number;
    message: string;
}

export interface ApiErrorsResponse {
    errors: ApiError[];
}