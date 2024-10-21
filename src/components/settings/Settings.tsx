'use client';
import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Container,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { fetchUserData, updateUserData } from '@/lib/api'; // Placeholder API functions
import PersonalInfoForm from './PersonalInfoForm';
import TeachingForm from './Teaching';
import AvailabilityForm from './Availablity';
import { useRouter } from 'next/navigation';
import { ChangeSettingsRequest, FullUserDto, Role, ScheduleDto } from "@/lib/types/dtoTypes";
import { convertScheduleDtoToSettingsRequest } from '@/lib/utils';
import { ScheduleSettingsRequest } from '@/lib/types/dtoTypes';
import { isRole } from '@/lib/types/guards';

const SettingsPage = () => {
    const [userData, setUserData] = useState<FullUserDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('personalInfo');
    const [scheduleSetting, setScheduleSetting] = useState<ScheduleSettingsRequest | null>(null);
    const [role, setRole] = useState<Role | null>(null); // Store role in state
    const router = useRouter();

    useEffect(() => {
        // Retrieve data from sessionStorage on the client side
        const accessToken = sessionStorage.getItem('accessToken');
        const id = sessionStorage.getItem('id');
        const stored_role = sessionStorage.getItem('role');
        if (isRole(stored_role)) {
            setRole(stored_role);
        }
        else {
            console.error('Invalid role found in session storage');
        }

        if (!accessToken) {
            // Redirect to login page if not logged in
            router.push('/auth/login');
            return;
        }

        const fetchData = async () => {
            if (!id) {
                console.error('No user ID found in session storage');
                setLoading(false);
                return;
            }

            try {
                const data = await fetchUserData(id); // Implement this function to fetch user data
                setUserData(data);
                console.log(data)
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    // Helper function to set nested properties
    const setNestedProperty = (obj: any, path: string, value: any) => {
        const keys = path.split('.');
        let tempObj = obj;

        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                // If it's the last key, set the value
                tempObj[key] = value;
            } else {
                // Continue traversing the object or create an empty object if undefined
                if (!tempObj[key]) {
                    tempObj[key] = {};
                }
                tempObj = tempObj[key];
            }
        });

        return obj;
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setUserData((prevData) => {
            if (!prevData) return null; // Handle case where prevData is null

            // Dynamically set the nested property
            const updatedData = { ...prevData }; // Create a copy of the state
            setNestedProperty(updatedData, name, value); // Use helper to set the property

            return updatedData;
        });
    };




    const handleScheduleChange = (schedule: ScheduleDto) => {
        if (!userData) {
            console.error('No user data found');
            return;
        }

        if (!userData.tutorDto) {
            console.error('No tutor data found');
            return;
        }

        const scheduleSettingsRequest: ScheduleSettingsRequest = convertScheduleDtoToSettingsRequest(schedule);
        setScheduleSetting(scheduleSettingsRequest);
    };

    // Updated `handleSave` function to submit the data in the desired format
    const handleSave = async () => {
        setSaving(true);
        const userId = sessionStorage.getItem('id'); // Ensure the userId is stored in sessionStorage
        if (!userId) {
            console.error('No user ID found in session storage');
            setSaving(false);
            return;
        }

        try {
            // Construct the request payload in the desired format
            const requestBody: ChangeSettingsRequest = {
                changeUserSettingsRequest: {
                    firstName: userData?.userSettingsDto?.firstName,
                    lastName: userData?.userSettingsDto?.lastName,
                    countryName: userData?.userSettingsDto?.country?.name,
                    city: userData?.userSettingsDto?.city,
                    phoneCode: userData?.userSettingsDto?.phoneCode,
                    phoneNumber: userData?.userSettingsDto?.phoneNumber,
                    timezone: userData?.userSettingsDto?.timezone,
                    dateOfBirth: userData?.userSettingsDto?.dateOfBirth // Ensure dateOfBirth is included if available
                },
                changeTutorSettingsRequest: role === 'TUTOR' ? {
                    hourlyRate: userData?.tutorDto?.hourlyRate,
                    shortDescription: userData?.tutorDto?.shortDescription,
                    description: userData?.tutorDto?.description,
                    videoUrl: userData?.tutorDto?.videoUrl
                } : undefined,
                changeUserRequest: undefined, // TODO add password change functionality
            };

            // Remove `undefined` entries from the request body (in case the user is not a tutor)
            if (!requestBody.changeTutorSettingsRequest) {
                delete requestBody.changeTutorSettingsRequest;
            }

            // Update user data with the formatted request body
            await updateUserData(userId, requestBody);

            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Failed to save user data:', error);
            alert('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!userData) {
        return <Typography variant="h4">User not found</Typography>;
    }

    if (!role) {
        return <Typography variant="h4">Role not found</Typography>;
    }

    if (role === 'TUTOR' && !userData.tutorDto) {
        return <Typography variant="h4">Tutor data not found</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>User Settings</Typography>
            <Box sx={{ display: 'flex' }}>
                {/* Sidebar Navigation */}
                <Box sx={{ width: '20%', mr: 4 }}>
                    <List component="nav">
                        <ListItem
                            button
                            selected={selectedCategory === 'personalInfo'}
                            onClick={() => setSelectedCategory('personalInfo')}
                        >
                            <ListItemText primary="Personal Info" />
                        </ListItem>
                        {role === 'TUTOR' && (
                            <>
                                <ListItem
                                    button
                                    selected={selectedCategory === 'teaching'}
                                    onClick={() => setSelectedCategory('teaching')}
                                >
                                    <ListItemText primary="Teaching" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={selectedCategory === 'availability'}
                                    onClick={() => setSelectedCategory('availability')}
                                >
                                    <ListItemText primary="Availability" />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>

                {/* Main Content Area */}
                <Box sx={{ flexGrow: 1 }}>
                    {selectedCategory === 'personalInfo' && (
                        <PersonalInfoForm
                            userData={userData.userSettingsDto}
                            email={userData.userDto.email} // Pass userDto as default values to the form
                            handleInputChange={handleInputChange}
                        />
                    )}
                    {selectedCategory === 'teaching' && role === 'TUTOR' && userData.tutorDto && (
                        <TeachingForm
                            userData={userData.tutorDto} // This is safe as tutorDto is checked to be non-null
                            handleInputChange={handleInputChange}
                        />
                    )}

                    {selectedCategory === 'availability' && role === 'TUTOR' && userData.tutorDto?.scheduleDto && (
                        <AvailabilityForm
                            userScheduleData={userData.tutorDto.scheduleDto}
                            onScheduleChange={handleScheduleChange}
                        />
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? <CircularProgress size={20} /> : 'Save'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default SettingsPage;
