import {LanguageLevelDto, Role, ScheduleDto, TimeIntervalType} from "@/lib/types/dtoTypes";

export type ScheduleData = {
    date: string;
    times: { time: string; type: TimeIntervalType | 'NOT_AVAILABLE', fullDateTime: string }[];
};

export type LecChatMessageData = {
    direction: 'incoming';
    content: string;
    senderName: string;
} | {
    direction: 'outgoing'
    content: string
}

export type LecComments = {
    name: string;
    rate: number | null;
    content: string | null;
    profilePicture: string | null;
}
export type LoginFormValues = {
    username: string;
    password: string;
};

export type SignupFormValues = {
    email: string;
    policy: boolean;
};

export type CodeVerificationFormValues = {
    otp: string;
};

export type RegisterFormValues = {
    password: string;
    role: Role;
    confirm_password: string;
    policy: boolean;
};export type LanguagesSpokenState = {
    spokenLanguages: LanguageLevelDto[];
    isValid: boolean;
};
export type Teacher = {
    tutorId: string;
    userId: string;
    name: string;
    languages: LanguageLevelDto[];
    primaryLanguage: string;
    hourlyRate: number;
    shortDescription: string;
    fullDescription: string;
    schedule: ScheduleDto;
    videoId: string;
    image?: string; // Assuming image is optional or not in the API response
    location: string;
    rating?: string; // Assuming rating might be optional or not in the API response
};


export type Filters = {
    languageLevel: string | undefined;
    minRate: string | undefined;
    maxRate: string | undefined;
    keyword: string | undefined;
    sortBy: keyof Teacher | undefined;
    knownLanguage: string | undefined;
    languageToTeach: string | undefined;
};

