import React from 'react';
import {Box} from "@mui/system";

const CenterVerticallyAndHorizontally = ({children}: { children: React.ReactNode }) => {
    return (
        <Box
            display='flex'
            justifyContent="center"
            alignItems="center"
            height='100%'
            width='100%'
        >
            {children}
        </Box>
    );
};

export default CenterVerticallyAndHorizontally;