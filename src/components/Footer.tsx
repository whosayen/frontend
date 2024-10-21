import * as React from 'react';
import {Box, Container, Grid, IconButton, Link, Typography} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Replace these with your own social media URLs
const socialMediaLinks = {
    facebook: '#',
    twitter: '#',
    instagram: '#',
};

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                color: 'text.secondary',
                py: 3,
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth={false}>
                <Grid container spacing={2} justifyContent="space-between">

                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" color="text.primary" gutterBottom>
                            Language Teachers
                        </Typography>
                        <Link href="#" color="inherit" display="block">Features</Link>
                        <Link href="#" color="inherit" display="block">Integrations</Link>
                        <Link href="#" color="inherit" display="block">Pricing</Link>
                        <Link href="#" color="inherit" display="block">FAQ</Link>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" color="text.primary" gutterBottom>
                            Learn a Language
                        </Typography>
                        <Link href="#" color="inherit" display="block">About Us</Link>
                        <Link href="#" color="inherit" display="block">Careers</Link>
                        <Link href="#" color="inherit" display="block">Privacy Policy</Link>
                        <Link href="#" color="inherit" display="block">Terms of Service</Link>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" color="text.primary" gutterBottom>
                            Teachers
                        </Typography>
                        <Link href="#" color="inherit" display="block">Public API</Link>
                        <Link href="#" color="inherit" display="block">Documentation</Link>
                        <Link href="#" color="inherit" display="block">Guides</Link>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" color="text.primary" gutterBottom>
                            Follow Us
                        </Typography>
                        <IconButton aria-label="Facebook" color="inherit" component="a"
                                    href={socialMediaLinks.facebook}>
                            <FacebookIcon/>
                        </IconButton>
                        <IconButton aria-label="Twitter" color="inherit" component="a" href={socialMediaLinks.twitter}>
                            <TwitterIcon/>
                        </IconButton>
                        <IconButton aria-label="Instagram" color="inherit" component="a"
                                    href={socialMediaLinks.instagram}>
                            <InstagramIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Typography variant="body2" color="text.secondary" align="center" sx={{pt: 4}}>
                    © 2024 Lectorie Company Co. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;