"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Link, useMediaQuery } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Teacher } from "@/lib/types/clientTypes";
import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation';
import MobileTeacherCard from './MobileTeacherCard';
import SendMessageToTutor from '../SendMessageToTutor';

interface TeacherCardProps {
    teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
    const router = useRouter();
    const [expandedTeachers, setExpandedTeachers] = useState<{ [key: string]: boolean }>({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [sendMessageDialogOpen, setSendMessageDialogOpen] = useState(false);

    const isMobile = useMediaQuery('(max-width:600px)');  // Check if it's mobile view

    const imageInBase64 = teacher.image;
    const image = imageInBase64 ? `data:image/png;base64,${imageInBase64}` : "man.jpg";

    // Initialize the expanded state for the specific teacher
    useEffect(() => {
        setExpandedTeachers((prevState) => ({
            ...prevState,
            [teacher.userId]: false, // Ensure every teacher starts with `expanded` set to false
        }));
    }, [teacher.userId]);

    const handleToggle = (teacherId: string) => {
        setExpandedTeachers((prevState) => ({
            ...prevState,
            [teacherId]: !prevState[teacherId], // Toggle the expanded state only for this teacher
        }));
    };

    // Fixing the language access
    const formattedLanguages = teacher.languages
        .map(lang => `${lang.languageDto.languageName} (${lang.level})`) // Corrected access
        .join(', ');

    const handleBookTrialClick = () => {
        router.push(`/tutor/${teacher.userId}#schedule`);
    };

    const handleMouseEnter = () => {
        setIsPlaying(true);
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
    };

    const handleSendMessageClick = () => {
        setSendMessageDialogOpen(true);
    };

    if (isMobile) {
        return <MobileTeacherCard teacher={teacher} />;
    }

    return (
        <div
            className="relative flex mb-4 group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-full md:w-3/4 p-4">
                <Card
                    className="w-full flex flex-col group-hover:border-black group-hover:border-2 transition duration-300"
                    sx={{
                        borderRadius: '16px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.02)',
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 2 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 150, height: 150, borderRadius: '10%' }}
                            image={image}
                            alt={teacher.name}
                        />
                        <Box sx={{ flex: 1, ml: 2 }}>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                            >
                                {teacher.name}
                                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                    <StarIcon color="primary" />
                                    <Typography sx={{ ml: 1 }}>{teacher.rating}</Typography>
                                    <AttachMoneyIcon sx={{ ml: 2 }} />
                                    <Typography sx={{ ml: 1 }}>{teacher.hourlyRate}</Typography>
                                </Box>
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1, color: 'text.secondary' }}>
                                Languages: {formattedLanguages}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, overflow: 'auto', maxHeight: 100 }}>
                                {expandedTeachers[teacher.userId]
                                    ? teacher.shortDescription + " " + teacher.fullDescription
                                    : `${teacher.shortDescription}...`}
                                <Link
                                    onClick={() => handleToggle(teacher.userId)}
                                    sx={{ cursor: 'pointer', display: 'block', mt: 1, color: 'primary.main' }}
                                >
                                    {expandedTeachers[teacher.userId] ? 'Show less' : 'Read more'}
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <Button variant="contained" onClick={handleBookTrialClick} sx={{ mr: 1 }}>Book a trial lesson</Button>
                        <Button variant="outlined" onClick={handleSendMessageClick}>Send Message</Button>
                    </Box>
                </Card>
            </div>
            <div className="absolute right-0 top-0 w-1/4 h-full hidden group-hover:flex p-4">
                <Card
                    className="w-full"
                    sx={{
                        borderRadius: '16px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <CardContent>
                        <ReactPlayer
                            url={"https://vimeo.com/990607090"}
                            width="100%"
                            height="192px"
                            controls={true}
                            playing={isPlaying}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<PlayArrowIcon />}
                            href={`https://www.youtube.com/watch?v=${teacher.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ mt: 1, width: '100%', justifyContent: 'space-between' }}
                        >
                            Watch full program
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <SendMessageToTutor open={sendMessageDialogOpen} handleClose={() => setSendMessageDialogOpen(false)} recipientId={teacher.userId}/>
        </div>
    );
};

export default TeacherCard;
