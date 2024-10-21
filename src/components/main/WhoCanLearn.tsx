'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const WhoCanLearnSection: React.FC = () => {
  return (
    <Box className="bg-white text-center py-12"> {/* Reduced padding */}
      <Typography variant="h4" className="mb-8"> {/* Changed back to h4 for larger section title */}
        Who can learn languages on <Typography variant='h4' component="span" color="primary">ULECTOR</Typography>
      </Typography>

      {/* Added margin between the Typography and Box */}
      <Box sx={{ mt: 4 }} className="border-2 border-gray-200 rounded-lg p-6"> {/* Added margin-top of 4 */}
        <Box className="flex justify-center space-x-8">
          {[
            {
              image: '/woman.jpg',
              title: 'Adults & Professionals',
              description: 'Choose from over 60 languages and start learning for personal or professional growth',
            },
            {
              image: '/woman2.jpeg',
              title: 'Students',
              description: 'Develop language proficiency and confidence for exams, for studying abroad, or for fun',
            },
          ].map((category, index) => (
            <Box key={index} className="text-center max-w-xs">
              <Box className="flex justify-center mb-3">
                <Image src={category.image} alt={category.title} width={300} height={200} className="rounded-lg" />
              </Box>
              <Typography variant="h6" className="font-bold mt-2" color="primary"> {/* Use h6 for category titles */}
                {category.title}
              </Typography>
              <Typography variant="body1" className="mt-2"> {/* Use body1 for description text */}
                {category.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WhoCanLearnSection;
