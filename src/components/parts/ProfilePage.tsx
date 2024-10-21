'use client';
import { IUser } from "@/lib/user";
import { Box, Container, styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import TutorProfileContent from '../TutorProfileContent';
import api from "@/lib/apiConfig";

type props = {
    data: IUser;
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function ProfilePage(props: props) {
    const [profileImage, setProfileImage] = useState<any>({});

    const getProfileImage = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token is missing');
            }
    
            // Use the axios instance to make the GET request
            const response = await api.get('/profile/picture', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                responseType: 'arraybuffer' // Set the response type to arraybuffer to handle binary data
            });
    
            if (response.status !== 200) {
                const error = response.data;
                console.log(error);
                throw new Error('Failed to fetch profile image');
            }
    
            // Convert the array buffer to a blob
            const imageArrayBuffer = response.data;
            const imageData = new Uint8Array(imageArrayBuffer);
            const imageBlob = new Blob([imageData], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(imageBlob);
    
            // Set the image URL
            setProfileImage(imageUrl);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getProfileImage();
        };

        fetchData();
    }, []);

    return (
        <>
            <div style={{ position: 'relative', marginBottom: 30 }}>
                <img
                    src="/image.png"
                    alt="Header Image"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
            </div>
            <Container>
                <Box
                    bgcolor="white"
                    p={{ xs: 4, md: 6 }}
                    borderRadius="16px"
                    boxShadow={3}
                    height={{ xs: '100%', md: '100%' }}
                    width={{ xs: '100%', md: '70%' }}
                    margin="0 auto"
                    position="relative"
                >
                    <div style={{ display: 'flex', marginTop: 20, alignItems: 'center' }}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        >
                            <Avatar alt="Profile Picture" src={profileImage} sx={{ width: 120, height: 120 }} />
                        </Badge>
                        <div style={{ marginLeft: 20 }}>
                            <Typography variant="h4">
                                {props.data.firstName} {props.data.lastName}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                From Turkey, flnfln
                            </Typography>
                            <Typography variant="h5" sx={{ mt: 2 }}>
                                About Me
                            </Typography>
                            <Typography variant="body1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet, diam sit amet ultricies fermentum,
                                ligula sapien consequat mauris.
                            </Typography>
                        </div>
                    </div>
                    <TutorProfileContent />
                </Box>
            </Container>
        </>
    );
}

export default ProfilePage;
