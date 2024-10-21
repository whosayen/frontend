import Box from "@mui/material/Box";
import React from "react";
import {SxProps} from "@mui/system";

type AuthImageParams = {
    sx?: SxProps;
}

export default function AuthImage(props: AuthImageParams) {
    return <Box
        flex={{xs: 'none', md: 1}}
        borderRadius={{xs: '0', md: '0 25px 25px 0'}}
        boxShadow="0 0 25px 20px rgba(0, 0, 0, 0.25)"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={props.sx}
    />
}
