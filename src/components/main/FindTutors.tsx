'use client';

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Image from 'next/image';

const FindTutorSection: React.FC = () => {
  return (
    <Container className="relative flex flex-col justify-center items-center overflow-hidden py-12"> {/* Consistent padding */}
      <Box 
        className="relative w-full h-[40vh] md:h-[50vh] lg:h-[80vh] flex flex-col justify-center items-center overflow-hidden shadow-lg rounded-lg"
        sx={{ mb: 8 }} // Added margin at the bottom to align with other sections
      >
        <Image
          src="/tutor-background.jpg"
          alt="Find Tutor Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
        <Box className="absolute inset-0 bg-teal-800 opacity-70 rounded-lg"></Box>
        <Box className="relative z-10 flex flex-col items-center justify-center text-white text-center px-6"> {/* Consistent padding */}
          <Typography variant="h4" className="font-bold"> {/* Changed from h3 to h4 for consistency */}
            Don’t have time to find a tutor?
          </Typography>
          <Typography variant="body1" className="mt-3"> {/* Consistent typography variant */}
            Input your needs, and let us find you one!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="rounded-full px-6 py-2 shadow-lg"
            sx={{ mt: 3 }}
            style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)' }}
          >
            Get tutor matches
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FindTutorSection;
