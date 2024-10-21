"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Link } from '@mui/material';
import { Teacher } from "@/lib/types/clientTypes";
import { useRouter } from 'next/navigation';

interface MobileTeacherCardProps {
    teacher: Teacher;
}

const MobileTeacherCard: React.FC<MobileTeacherCardProps> = ({ teacher }) => {
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);

    const imageInBase64 = teacher.image;
    const image = imageInBase64 ? `data:image/png;base64,${imageInBase64}` : "man.jpg";

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const formattedLanguages = teacher.languages.map(
        lang => `${lang.languageDto.languageName} (${lang.level})`).join(', ');

    const handleBookTrialClick = () => {
        router.push(`/tutor/${teacher.userId}#schedule`);
    };

    return (
        <div className="w-full p-2"> {/* Reduce padding to make card appear wider */}
            <Card
                className="w-full flex flex-col"
                sx={{
                    borderRadius: '16px',  // Rounded corners
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',  // Subtle shadow
                    width: '95%',  // Make the card wider in mobile view
                    margin: 'auto',
                }}
            >
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: 200, borderRadius: '10%' }}  // Adjust image size for mobile
                    image={image}
                    alt={teacher.name}
                />
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {teacher.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1, color: 'text.secondary' }}>
                        Languages: {formattedLanguages}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {expanded ? teacher.shortDescription + " " + teacher.fullDescription : `${teacher.shortDescription}...`}
                        <Link onClick={handleToggle} sx={{ cursor: 'pointer', display: 'block', mt: 1, color: 'primary.main' }}>
                            {expanded ? 'Show less' : 'Read more'}
                        </Link>
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleBookTrialClick}
                        sx={{
                            mt: 2,
                            width: '100%',
                            fontSize: '0.75rem', // Smaller font size for button text
                            padding: '6px 8px',  // Thinner button padding
                        }}
                    >
                        Book a trial lesson
                    </Button>
                    <Button
                        href="/chat"
                        variant="outlined"
                        sx={{
                            mt: 1,
                            width: '100%',
                            fontSize: '0.75rem',  // Smaller font size for button text
                            padding: '6px 8px',   // Thinner button padding
                        }}
                    >
                        Send Message
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default MobileTeacherCard;
