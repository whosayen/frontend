'use client';
import React, { useEffect, useState } from 'react';
import { Alert, Box, Card, CircularProgress, Typography } from '@mui/material';
import { fetchPublicUserData } from "@/lib/api";
import ReactPlayer from 'react-player';

interface TutorProfileProps {
    tutorUserId: string;
}

const mockTutorAbout = "John is a professional language tutor with over 10 years of experience...";

/**
 * @file TutorProfile.tsx
 * @description Combines the TutorAboutCard and TutorVideoCard side by side with a single edit modal.
 * @component
 * @param {TutorProfileProps} props - The properties of the component.
 * @returns {JSX.Element} A component displaying the tutor's about information and video side by side.
 */
export default function TutorProfile({ tutorUserId }: TutorProfileProps): JSX.Element {
    const [aboutText, setAboutText] = useState(mockTutorAbout);
    const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
    const [isValidVideo, setIsValidVideo] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const fetchTutorData = async () => {
        setLoading(true);
        try {
            const data = await fetchPublicUserData(tutorUserId);
            setAboutText(data.tutorSearchDto?.description || mockTutorAbout);

            const url = data.tutorSearchDto?.videoUrl;
            if (isValidUrl(url)) {
                setVideoUrl(url);
            } else {
                setIsValidVideo(false);
            }

        } catch (error) {
            setError(`Error fetching tutor profile data: ${error}`);
        }
        setLoading(false);
    };

    const isValidUrl = (urlString: string): boolean => {
        try {
            new URL(urlString);
            return true;
        } catch (e) {
            return false;
        }
    };

    useEffect(() => {
        fetchTutorData();
    }, []);

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (loading) {
        return (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!aboutText || !videoUrl) {
        return <Box sx={{ width: '100%' }}>
            <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3, position: 'relative' }}>
                <Alert severity="warning">No data found</Alert>
            </Card>
        </Box>
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3, position: 'relative' }}>
                <Box display="flex" gap={2}>
                    <Box flex={1} display="flex" flexDirection="column" minHeight="300px">
                        <Box sx={{ p: 3, flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>About the Tutor</Typography>
                            <Box mt={2}>
                                <Typography variant="body2">{aboutText}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box flex={1} display="flex" flexDirection="column" minHeight="300px">
                        <Box sx={{ p: 3, flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Introduction Video</Typography>
                            <Box
                                mt={2}
                                sx={{
                                    position: "relative",
                                    paddingBottom: "56.25%", // 16:9 aspect ratio
                                    height: 0,
                                }}
                            >
                                {isValidVideo ? (
                                    <ReactPlayer
                                        url={videoUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ position: "absolute", top: 0, left: 0 }}
                                        controls={true}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 8,
                                            backgroundColor: '#f0f0f0',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="body1" color="error">Not a valid video</Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}
