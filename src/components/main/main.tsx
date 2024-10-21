'use client';

import React from 'react';
import { Box, CssBaseline, Container } from '@mui/material';
import HeroSection from './Hero';
import PopularLanguagesSection from './PopularLanguages';
import ReasonsToLearnSection from './ReasonsToLearnLanguage';
import WhoCanLearnSection from './WhoCanLearn';
import StepsSection from './Steps';
import FindTutorSection from './FindTutors';

const MainPage: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ mt: 8, mb: 8 }}> {/* Adjusted top and bottom margin */}
        <HeroSection />
        <Container sx={{ px: { xs: 2, sm: 4, md: 8 } }}> {/* Added responsive padding */}
          <Box sx={{ my: 8 }}> {/* Consistent vertical margin for all sections */}
            <PopularLanguagesSection />
          </Box>
          <Box sx={{ my: 8 }}>
            <ReasonsToLearnSection />
          </Box>
          <Box sx={{ my: 8 }}>
            <WhoCanLearnSection />
          </Box>
          <Box sx={{ my: 8 }}>
            <StepsSection />
          </Box>
          <Box sx={{ my: 8 }}>
            <FindTutorSection />
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default MainPage;
