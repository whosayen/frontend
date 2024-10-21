'use client';

import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { PersonSearch, EventAvailable, Laptop, Verified } from '@mui/icons-material';

const steps = [
  {
    icon: PersonSearch,
    title: 'Find a tutor and get in touch',
    description: 'Browse tutors and see their background, experience and student feedback. Message a tutor and let them know your needs.',
  },
  {
    icon: EventAvailable,
    title: 'Choose a time and book a class',
    description: "Once you've bought a lesson, choose a time slot and book your class. Cancel or reschedule up to 12 hours before your class.",
  },
  {
    icon: Laptop,
    title: 'Learn when you want, from where you want',
    description: "Take the lesson anywhere you want with your mobile device or computer. When it's time for your lesson, load your class via Zoom and start learning!",
  },
];

const StepsSection: React.FC = () => {
  return (
    <Container className="bg-white text-center py-12"> {/* Reduced padding */}
      <Typography variant="h4" className="mb-6"> {/* Reduced margin */}
        How it works
      </Typography>
      <Box className="relative bg-white rounded-lg shadow-md p-6 mt-6 mb-12"> {/* Reduced padding */}
        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box className="flex flex-col items-center p-4 mb-8"> {/* Reduced padding and margin */}
                <Typography variant="subtitle1" className="absolute top-0 text-gray-500">
                  STEP {index + 1}
                </Typography>
                <Box className="flex justify-center mb-3 mt-6"> {/* Reduced margin */}
                  <step.icon color="primary" style={{ fontSize: 64 }} />
                </Box>
                <Typography variant="h6" className="mt-3 font-bold"> {/* Adjusted margin */}
                  {step.title}
                </Typography>
                <Typography variant="body2" className="mt-2"> {/* Adjusted margin */}
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box className="relative flex justify-center items-center mt-12 mb-6"> {/* Reduced margin */}
        <Box className="border-t border-dotted border-green-600 absolute w-full" style={{ top: '50%' }}></Box>
        <Box className="relative flex flex-col items-center bg-white px-4">
          <Verified color="primary" style={{ fontSize: 64 }} />
          <Typography variant="h6" className="font-bold mt-3"> {/* Adjusted margin */}
            100% Satisfaction Guarantee
          </Typography>
          <Typography variant="body2" className="mt-2 text-center"> {/* Adjusted margin */}
            If you are not satisfied with your trial lesson, we will give you a free replacement with another tutor or a full refund.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default StepsSection;
