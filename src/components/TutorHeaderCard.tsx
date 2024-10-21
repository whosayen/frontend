'use client';
import React, { useState, useEffect } from 'react';
import { Card, Typography, Avatar, Box, Stack, Rating, Button } from '@mui/material';
import { fetchPublicUserData, fetchUserData } from "@/lib/api";
import { FullUserDto } from "@/lib/types/dtoTypes";
import defaultProfileImage from "@/assets/blank-profile-picture.png";
import { FullUserSearchDto } from '@/lib/types/dtoTypes';
interface TutorHeaderCardProps {
    tutorUserId: string;
}

const mockTutorData = {
    name: "John Doe",
    profilePicture: "https://cdn.pixabay.com/photo/2016/01/25/19/48/man-1161337_1280.jpg",
    rating: 4.5,
    rate: "30/hr",
    country: "USA",
    totalStudents: 150,
    totalLectures: 200,
    languages: [
        { language: "English", level: "Fluent", proficiency: 90 },
        { language: "Spanish", level: "Intermediate", proficiency: 60 },
    ],
    coverImage: "https://cdn.pixabay.com/photo/2020/09/14/08/31/letters-5570359_960_720.jpg",
};

export default function TutorHeaderCard({ tutorUserId }: TutorHeaderCardProps): JSX.Element {
    const [tutorData, setTutorData] = useState<FullUserSearchDto>();

    const defaultTutorImage = defaultProfileImage.src;
    const tutorImageBase64 = tutorData?.userSettingsSearchDto.image;
    const tutorImage = tutorImageBase64 ? `data:image/png;base64,${tutorImageBase64}` : defaultTutorImage;

    const fetchTutorData = async () => {
        const data = await fetchPublicUserData(tutorUserId);
        setTutorData(data);
    };

    useEffect(() => {
        fetchTutorData();
    }, []);

    if (!tutorData) {
        return <Typography variant="body1">Loading...</Typography>;
    }


    return (
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Box
                sx={{
                    backgroundImage: `url(${mockTutorData.coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "200px",
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                }}
            />
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ p: 3 }}>
                <Avatar
                    src={tutorImage}
                    sx={{ width: 100, height: 100, border: "4px solid white", mt: { xs: -6, md: -12 } }}
                />
                <Box flexGrow={1}>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        {tutorData.userSettingsSearchDto.firstName} {tutorData.userSettingsSearchDto.lastName}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Rating name="read-only" value={tutorData.tutorSearchDto.avgRate} readOnly />
                        <Typography variant="body2">{tutorData.tutorSearchDto.avgRate}</Typography>
                    </Stack>
                    <Typography variant="body2" color="textSecondary">
                        Country: {tutorData.userSettingsSearchDto.countryDto.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Total Students: {tutorData.tutorSearchDto.enrollmentDtos.length}
                    </Typography>
                    <Stack direction="column" spacing={1} mt={1}>
                        {tutorData.tutorSearchDto?.languageLevelDtos?.map((lang, index) => (
                            <Box key={index}>
                                <Typography variant="body2">{`${lang.languageDto.languageName} (${lang.level})`}</Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </Card>
    );
}
