import { ChangeSettingsRequest, CountryDto, TimezoneResponse } from "./types/dtoTypes";
import axios, { AxiosResponse } from 'axios';
import { BookingDto } from "./types/dtoTypes";
import { FullUserDto, TutorDto } from "./types/dtoTypes";
import { ChatMessageDto, FullUserSearchDto, ScheduleSettingsRequest, UserLastMessageDto } from "./types/dtoTypes";
import api, { BASE_URL_API } from "./apiConfig";
import { isFullUserSearchDto } from "./types/guards";


export const getAllCountries = async (): Promise<CountryDto[]> => {
    try {
        // Use the axios instance to make the GET request
        const response = await api.get('/country/all'); // Endpoint path should be relative to your base URL

        // If the response is successful, return the data
        if (response.status === 200) {
            return response.data as CountryDto[];
        }

        // Handle non-OK responses by logging the error and returning an empty array
        const errorArr = response.data.errors || [];
        console.error("HTTP error occurred: ", `status=${response.status} `, `message=${errorArr}`);
        return [];
    } catch (error) {
        // Handle runtime errors
        console.error('Error fetching API countries (Runtime):', error);
        return [];
    }
};

export const fetchBookings = async (
    startTime: string,
    finishTime: string,
    userRole: string | null
): Promise<BookingDto[]> => {

    // Determine the API URL based on user role
    const API_URL = userRole === 'TUTOR'
        ? '/tutor/bookings'
        : '/profile/my-bookings';

    try {
        // Send GET request using the axios instance
        const response = await api.get(API_URL, {
            params: {
                startTime,
                finishTime,
            },
        });

        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
};


export const fetchUserData = async (userId: string): Promise<FullUserDto> => {
    try {
        const response = await api.get(`/users/${userId}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

/**
 * Fetches the public user data for a given user ID. This data is available to all users.
 * This function is used in server-side rendering (SSR) to fetch public user data.
 * @param userId The user ID to fetch public data for
 * @returns The public user data
 * @throws An error if the request fails
 **/
export const fetchPublicUserData = async (userId: string): Promise<FullUserSearchDto> => {
    try {
        // Construct the URL for the request
        const url = `${BASE_URL_API}/users/public/${userId}`;

        // Make the fetch request
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response status is not OK (200-299)
        if (!response.ok) {
            throw new Error(`Error fetching public user data: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();

        if (!data) {
            throw new Error('Failed to fetch public user data');
        }

        if (!isFullUserSearchDto(data)) {
            throw new Error('Invalid public user data');
        }

        return data;
    } catch (error) {
        console.error('Error fetching public user data:', error);
        throw error;
    }
};


export const getLastMessages = async (): Promise<UserLastMessageDto[]> => {
    try {
        const response = await api.get<UserLastMessageDto[]>('/last/messages');

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
            throw new Error(`Failed to fetch messages: ${error.response?.data?.message || error.message}`);
        } else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred');
        }
    }
};

export const findChatMessages = async (senderId: string, recipientId: string): Promise<ChatMessageDto[]> => {
    try {
        // Construct the relative API URL
        const API_URL = `/${senderId}/${recipientId}`;
        console.log('API_URL:', API_URL);

        // Use the axios instance to make the GET request
        const response = await api.get<ChatMessageDto[]>(API_URL);

        return response.data;
    } catch (error) {
        // Handle different types of errors
        if (axios.isAxiosError(error)) {
            // Axios-specific error
            console.error('Axios error:', error.response?.data || error.message);
            throw new Error(`Failed to fetch chat messages: ${error.response?.data?.message || error.message}`);
        } else {
            // Generic error
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred');
        }
    }
};

export const updateUserData = async (
    userId: string,
    data: ChangeSettingsRequest
): Promise<FullUserDto> => {
    try {
        const response = await api.put<FullUserDto>(`/users/change`, data, {
            headers: {
                'Content-Type': 'application/json', // Optional: Axios defaults to 'application/json' for JSON requests
            }
        });

        if (!response.data) {
            throw new Error('Failed to update user data');
        }

        console.log(data);

        return response.data;
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};



// TODO add the type for the image
export const editProfileImage = async (image: any): Promise<any> => {
    try {
        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token is missing');
        }

        const formData = new FormData();
        formData.append('image', image);

        const response = await api.put('/profile/picture', formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading profile image:', error);
        throw error;
    }
};


export const changeProfileAvailabilitySettings = async (
    scheduleSettings: ScheduleSettingsRequest
): Promise<TutorDto> => {
    try {
        const response: AxiosResponse<TutorDto> = await api.put(
            '/tutor/change-availability',
            scheduleSettings
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};

export const cancelBooking = async (bookingId: string): Promise<void> => {
    try {
        await api.delete(`/enrollment/cancel-booking/${bookingId}`);
    } catch (error) {
        console.error('Error canceling booking:', error);
        throw new Error('Failed to cancel booking.');
    }
};

/**
 * Fetch all timezones from the backend API.
 * 
 * @returns A promise that resolves to an array of time zone strings.
 */
export const getAllTimezones = async (): Promise<TimezoneResponse> => {
    try {
        const response = await api.get<TimezoneResponse>('time/timezones', {
            skipAuth: true,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch timezones:', error);
        throw new Error('Could not fetch timezones. Please try again later.');
    }
};