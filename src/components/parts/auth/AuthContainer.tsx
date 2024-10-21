import React from 'react';
import {Box} from "@mui/system";

type AuthContainerParams = {
    children: React.ReactNode;
}

const AuthContainer = (props: AuthContainerParams) => {
    return (
        <Box display='flex' flexDirection={{xs: 'column', md: 'row'}} height='100vh'>
            {props.children}
        </Box>
    )
};

export default AuthContainer;