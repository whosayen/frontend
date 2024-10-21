'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Image from 'next/image';
import { Search, VerifiedUser, School, AttachMoney } from '@mui/icons-material';

const ReasonsToLearnSection: React.FC = () => {
  return (
    <Box className="bg-white text-center py-12"> {/* Adjusted padding */}
      <Container>
        <Box className="flex justify-center space-x-4 mb-12 mt-8"> {/* Reduced margin */}
          <Box className="relative w-[400px] h-[300px] rounded-lg overflow-hidden"> {/* Adjusted image size */}
            <Image
              src="/man.jpg"
              alt="First Image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </Box>
          <Box className="relative w-[400px] h-[300px] rounded-lg overflow-hidden"> {/* Adjusted image size */}
            <Image
              src="/lady.jpeg"
              alt="Second Image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </Box>
        </Box>
        <Typography variant="h4" className="mb-6"> {/* Changed variant to h4 for larger text */}
          4 reasons to learn on <Typography variant='h4' component="span" color="primary">ULECTOR</Typography>
        </Typography>
        <Box className="p-6 rounded-lg shadow-md"> {/* Reduced padding */}
          <Box className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4"> {/* Reduced grid gap */}
            {[
              {
                Icon: Search,
                title: 'Find native speakers and certified private tutors',
              },
              {
                Icon: VerifiedUser,
                title: "We carefully check and confirm each tutor's profile",
              },
              {
                Icon: School,
                title: 'Take online lessons at the perfect time for your busy schedule',
              },
              {
                Icon: AttachMoney,
                title: 'Choose an experienced tutor that fits your budget',
              },
            ].map((reason, index) => (
              <Box key={index} className="p-4 flex flex-col items-center"> {/* Reduced padding */}
                <Box className="bg-white p-6 rounded-lg shadow-md mb-6"> {/* Reduced padding */}
                  <reason.Icon color="primary" style={{ fontSize: 50 }} /> {/* Reduced icon size */}
                </Box>
                <Typography variant="body1" className="mt-2"> {/* Changed to body1 for consistency */}
                  {reason.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ReasonsToLearnSection;
