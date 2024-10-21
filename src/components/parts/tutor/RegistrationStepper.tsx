'use client'
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Photo from '@/components/parts/tutor/RegistrationSteps/Photo';
import ProfileDescription from '@/components/parts/tutor/RegistrationSteps/ProfileDescription';
import Video from '@/components/parts/tutor/RegistrationSteps/Video';
import Availability from '@/components/parts/tutor/RegistrationSteps/Availability';
import LanguagesSpoken from '@/components/parts/tutor/RegistrationSteps/LanguagesSpoken';
import { ITutorProfile } from '@/lib/user';
import SubjectTaught from '@/components/parts/tutor/RegistrationSteps/SubjectTaught';
import HourlyRate from '@/components/parts/tutor/RegistrationSteps/HourlyRate';
import { LanguagesSpokenState } from "@/lib/types/clientTypes";
import { LanguageDto } from "@/lib/types/dtoTypes";
import { useImmer } from "use-immer";
import { TutorAvailability } from "@/lib/tutorAvailability";
import Typography from "@mui/material/Typography";
import { ScheduleSettingsRequest } from '@/lib/types/dtoTypes';
import { isScheduleSettingsRequest } from "@/lib/types/guards";
import { th } from 'date-fns/locale';
import { availabilityStateToScheduleSettingsRequest } from '@/lib/availabilityToScheduleSettingsRequest';
import api from '@/lib/apiConfig';
import { useRouter } from 'next/navigation';


export type SubjectTaughtState = {
    selectedSubjects: LanguageDto[];
    isValid: boolean;
}

export type HourlyRateState = {
    rate: number;
    isValid: boolean;
}

export type PhotoState = {
    photoUrl: string;
    isValid: boolean;
}

export type ProfileDescriptionState = {
    shortIntro: string;
    aboutTutor: string;
    isValid: boolean;
}

export type VideoState = {
    videoLink: string;
    isValid: boolean;
}

type RegistrationStepperState = {
    languagesSpoken: LanguagesSpokenState;
    subjectTaught: SubjectTaughtState;
    hourlyRate: HourlyRateState;
    photo: PhotoState;
    profileDescription: ProfileDescriptionState;
    videoLink: VideoState;
    availability: TutorAvailability.AvailabilityState;
}


const initialState: RegistrationStepperState = {
    languagesSpoken: {
        spokenLanguages: [],
        isValid: true,
    },
    subjectTaught: {
        selectedSubjects: [],
        isValid: true,
    },
    hourlyRate: {
        rate: 0,
        isValid: true,
    },
    photo: {
        photoUrl: '',
        isValid: false,
    },
    profileDescription: {
        shortIntro: '',
        aboutTutor: '',
        isValid: true,
    },
    videoLink: {
        videoLink: '',
        isValid: true,
    },
    availability: TutorAvailability.initialAvailabilityState
};



const RegistrationStepper = () => {

    const stepNames = ['Languages Spoken', 'Subject Taught', 'Hourly Rate', 'Photo', 'Profile Description', 'Video', 'Availability'];
    const methods = useForm();
    const [activeStep, setActiveStep] = React.useState(0);
    const [stepperState, setStepperState] = useImmer<RegistrationStepperState>(initialState);
    const [isRegistrationComplete, setIsRegistrationComplete] = React.useState(false); // New state to track completion

    const router = useRouter();
    const steps = [
        <LanguagesSpoken
            state={stepperState.languagesSpoken}
            onChange={state => setStepperState(draft => {
                draft.languagesSpoken = state
            })}
            key={0} />,
        <SubjectTaught
            state={stepperState.subjectTaught}
            onChange={state => setStepperState(draft => {
                draft.subjectTaught = state
            })}
            key={1} />,
        <HourlyRate
            state={stepperState.hourlyRate}
            onChange={rate => setStepperState(draft => {
                draft.hourlyRate = rate
            })}
            key={2} />,
        <Photo
            state={stepperState.photo}
            onChange={state => setStepperState(draft => {
                draft.photo = state
            })}
            key={3} />,
        <ProfileDescription
            state={stepperState.profileDescription}
            onChange={state => setStepperState(draft => {
                draft.profileDescription = state
            })}
            key={4} />,
        <Video
            state={stepperState.videoLink}
            onVideoLinkChange={videoLink => setStepperState(draft => {
                draft.videoLink = videoLink
            })}
            key={5} />,
        <Availability
            initialAvailabilityState={stepperState.availability}
            onAvailabilityChange={availability => {
                setStepperState(draft => {
                    draft.availability = availability
                });
                console.log(availability)
            }}
            key={6} />
    ];


    const SaveStep = async (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                await SaveLanguagesSpoken(stepperState.languagesSpoken);
                break;
            case 1:
                await SaveSubjectTaught(stepperState.subjectTaught);
                break;
            case 2:
                await SaveHourlyRate(stepperState.hourlyRate);
                break;
            case 3:
                SavePhoto(stepperState.photo);
                break;
            case 4:
                await SaveProfileDescription(stepperState.profileDescription);
                break;
            case 5:
                await SaveVideo(stepperState.videoLink);
                break;
            case 6:
                await SaveAvailability(stepperState.availability);
                break;
        }
    }

    interface TutorResponse {
        // TODO Adjust based on the actual response structure from your backend
    }

    async function putData<T>(endpoint: string, data: T): Promise<TutorResponse> {
        console.log('putData:', JSON.stringify(data));
        try {
            const response = await api.put(endpoint, data);
            if (!response.ok) {
                console.error('Error saving data:', response.data);
                return {} as TutorResponse;
            }
            return response.data as TutorResponse;
        } catch (error) {
            console.error("Error saving data:", error);
            return {} as TutorResponse;
        }
    }

    const SaveLanguagesSpoken = async (state: LanguagesSpokenState) => {
        const language_level = state.spokenLanguages.map(spokenLanguage => ({
            language: {
                language_name: spokenLanguage.languageDto.languageName
            },
            level: spokenLanguage.level
        }));

        const data = { language_level };
        try {
            const response = await putData('tutor/change-spoken-language', data);
            console.log('SaveLanguagesSpoken Response:', response);
        } catch (error) {
            console.error('Error saving languages:', error);
        }
    };



    const SaveSubjectTaught = async (state: SubjectTaughtState) => {
        const selectedLanguage = state.selectedSubjects[0].languageName;
        const data = {
            language_name: selectedLanguage
        };
        try {
            const response = await putData('tutor/change-subject-taught', data);
            console.log('SaveSubjectTaught Response:', response);
        } catch (error) {
            console.error('Error saving subject taught:', error);
        }
    };




    const SaveHourlyRate = async (state: HourlyRateState) => {
        const data = { hourly_rate: state.rate };
        try {
            const response = await putData('tutor/change-hourly-rate', data);
            console.log('SaveHourlyRate Response:', response);
        } catch (error) {
            console.error('Error saving hourly rate:', error);
        }
    };


    const SavePhoto = (state: PhotoState) => {
        // TODO implement data saving
        console.log(`SavePhoto: ${state.photoUrl}`);
    }

    const SaveProfileDescription = async (state: ProfileDescriptionState) => {
        const data = {
            description: state.aboutTutor,
            short_description: state.shortIntro
        };
        try {
            const response = await putData('tutor/change-description', data);
            console.log('SaveProfileDescription Response:', response);
        } catch (error) {
            console.error('Error saving profile description:', error);
        }
    };



    const SaveVideo = async (state: VideoState) => {
        const data = { video_url: state.videoLink };
        try {
            const response = await putData('tutor/change-video', data);
            console.log('SaveVideo Response:', response);
        } catch (error) {
            console.error('Error saving video:', error);
        }
    }

    const SaveAvailability = async (state: TutorAvailability.AvailabilityState) => {
        const transformedData = availabilityStateToScheduleSettingsRequest(state);
        try {
            const response = await putData('tutor/change-availability', transformedData);
            setIsRegistrationComplete(true);
            console.log('SaveAvailability Response:', response);
        } catch (error) {
            console.error('Error saving availability:', error);
        }
    };


    const handleNext = async () => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        await SaveStep(activeStep);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    if (isRegistrationComplete) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h5" gutterBottom>
                    Registration Complete!
                </Typography>
                <Typography variant="subtitle1">
                    Thank you for completing the registration steps. We will review your information and get back to you soon.
                </Typography>
                <Button variant="contained" color="primary" onClick={() => {router.push('/')}}>
                    Go to Home
                </Button>
            </Box>
        );
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <FormProvider {...methods}>
                <Box
                    bgcolor="white"
                    p={{ xs: 4, md: 6 }}
                    borderRadius="16px"
                    boxShadow={3}
                    height={{ xs: '100%', md: '100%' }}
                    width={{ xs: '85%', md: '90%' }}
                    display="flex"
                    flexDirection="column"
                >
                    <Stepper activeStep={activeStep}>
                        {stepNames.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: { optional?: React.ReactNode } = {};

                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <Box sx={{ flex: '1 1 auto', overflowY: 'auto', padding: '16px' }}>
                        {steps[activeStep]}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: 2 }}>
                        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === stepNames.length - 1 ? 'Complete' : 'Next'}
                        </Button>
                    </Box>
                </Box>
            </FormProvider>
        </div>
    );

};

export default RegistrationStepper;
