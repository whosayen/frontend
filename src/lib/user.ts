// The following code is deprecated and should be removed in the future.
// It is only used for demonstration purposes.

import { LanguageLevelDto } from "./types/dtoTypes";
import { LanguageDto } from "./types/dtoTypes";
import { Availability } from "./types/dtoTypes";

/**
 * @deprecated This type is deprecated. Use CountryDto from types/dtoTypes.ts instead.
 */
type Country = {
    id: number
    name: string
    code: string
}


/**
 * @deprecated This type is deprecated. Use UserSettingsDto from types/dtoTypes.ts instead.
 */
export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    country: Country;
    city: string;
    phoneCode: string;
    phoneNumber: string;
    timezone: string;
    dateOfBirth: string;
    age: number;
}

/**
 * @deprecated
 */
interface IStudent {
}

/**
 * @deprecated
 */
interface ITutor {
    language_level: LanguageLevelDto[];
    language: LanguageDto;
    hourly_rate: number;
    video_url: string;
    availabilities: Availability[];
    description: string;
    rating: number;
}

/**
 * @deprecated This type is deprecated. Use UserSettingsDto from types/dtoTypes.ts instead.
 */
export interface ITutorProfile extends IUser, ITutor {
}

/**
 * @deprecated
 */
export interface IStudentProfile extends IUser, IStudent {
}

/**
 * @deprecated
 */
const isTutor = (obj: unknown): obj is ITutor => {
    return (obj as ITutor).language_level !== undefined;
}

/**
 * @deprecated
 */
const isUser = (obj: unknown): obj is IUser => {
    return (obj as IUser).id !== undefined;
}

/**
 * @deprecated
 */
export const isTutorProfile = (obj: unknown): obj is ITutorProfile => {
    return (obj as ITutorProfile).language_level !== undefined;
}

/**
 * @deprecated
 */
export const isStudentProfile = (obj: unknown): obj is IStudentProfile => {
    return (obj as IStudentProfile).id !== undefined;
}

/**
 * @deprecated
 */
const getUserInformation = async (accessToken: string): Promise<IUser> => {
    const response = await fetch('http://localhost:8080/api/v1/profile/user-settings', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`, // Include the access token in the "Authorization" header
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const isApproved = await isUserApproved(response)
        if (!isApproved)
            window.location.href = "/tutor" // worked
        throw new Error('Failed to fetch user profile information');
    }

    const data: unknown = await response.json()
    if (!isUser(data)) {
        throw new Error('Data is not a user');
    }

    return data;
}

/**
 * @deprecated
 */
const getTutorInformation = async (accessToken: string): Promise<ITutor> => {
    const response = await fetch('http://localhost:8080/api/v1/profile/tutor', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`, // Include the access token in the "Authorization" header
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch tutor profile information');
    }

    const data: unknown = await response.json()
    console.log(data)
    if (!isTutor(data)) {
        throw new Error('Data is not a tutor');
    }
    return data;
}


/**
 * @deprecated
 */
export const getUserProfile = async (): Promise<ITutorProfile | IStudentProfile> => {
    const accessToken = sessionStorage.getItem('accessToken'); // get access token from session storage

    if (!accessToken) {
        throw new Error('Access token is missing');
    }

    const user = await getUserInformation(accessToken);

    if (!user) {
        throw new Error("User Information Cannot Fetch.")
    }
    try {
        const tutor = await getTutorInformation(accessToken);
        console.log(tutor)
        return {...user, ...tutor};
    } catch (e) { // TODO handle other errors
        console.log(e);
        return user as IStudentProfile;
    }
}


/**
 * @deprecated
 */
export const isUserApproved = async (response: Response): Promise<boolean> => {
    try {
        const accessToken = sessionStorage.getItem('accessToken'); // get access token from session storage

        if (!accessToken) {
            throw new Error('Access token is missing');
        }

        if (response.status == 403) {
            const response = await fetch('http://localhost:8080/api/v1/tutor/check-approved', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // Include the access token in the "Authorization" header
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const res = await response.json() as boolean
                return res
            }
        }
        return true;
    } catch (e) {
        return false
    }
}