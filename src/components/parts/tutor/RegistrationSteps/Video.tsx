import React, {useEffect, useState} from 'react';
import {Box, Grid, Link, List, ListItem, ListItemIcon, ListItemText, TextField, Typography} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {VideoState} from "@/components/parts/tutor/RegistrationStepper"; // Import the icon you want to use

interface VideoProps {
    state: VideoState;
    onVideoLinkChange: (link: VideoState) => void;
}

const Video: React.FC<VideoProps> = ({ state, onVideoLinkChange }) => {
    const [videoLink, setVideoLink] = useState('');

    useEffect(() => {
        setVideoLink(state.videoLink);
    }, [state]);

    const handleVideoLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLink = event.target.value;
        setVideoLink(newLink);
        onVideoLinkChange({ videoLink: newLink, isValid: true });
    };

    const isYouTubeLink = (link: string) => {
        const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return pattern.test(link);
    };

    const extractYouTubeID = (link: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = link.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const tips = [
        'Keep your video under 2 minutes',
        'Record in a horizontal mode',
        'Position the camera at eye level',
        'Use neutral lighting and background',
        'Your face and eyes are fully visible (except for religious reasons)',
        'No logos, links or contact details',
        'No slideshows or presentations',
        'The recommended aspect ratio is vertical (9:16)',
        'You can add a link from Youtube or Vimeo',
        'Video should be recorded in languages you want to teach.'
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                    Please take some time to read the{' '}
                    <Link href="#" underline="hover">
                        video requirements
                    </Link>{' '}
                    before you upload your video.
                </Typography>
                <TextField
                    fullWidth
                    label="Paste a link to your video"
                    value={videoLink}
                    onChange={handleVideoLinkChange}
                    variant="outlined"
                    margin="normal"
                />
                <Typography variant="caption" display="block" gutterBottom>
                    By submitting your video to ULECTOR, you acknowledge that you agree to the Terms of Service.
                    Please be sure not to violate others&apos; copyright or privacy rights.
                </Typography>
                {isYouTubeLink(videoLink) && (
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${extractYouTubeID(videoLink)}?rel=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{
                    maxWidth: 500,
                    border: 1,
                    borderRadius: 2,
                    p: 2,
                    borderColor: 'primary.main',
                    ml: 'auto',
                    mr: 'auto'
                }}>
                    <Typography variant="h6" gutterBottom>
                        Tips for a great video
                    </Typography>
                    <List dense>
                        {tips.map((tip, index) => (
                            <ListItem key={index}>
                                <ListItemIcon sx={{minWidth: 36}}>
                                    <CheckCircleOutlineIcon fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText primary={tip} primaryTypographyProps={{variant: 'body2'}}/>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Video;
