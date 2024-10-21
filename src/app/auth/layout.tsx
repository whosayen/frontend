import React from 'react'
import backgroundImage from "../../../src/assets/login-image.jpeg"
import AuthImage from "@/components/parts/auth/AuthImage";
import {SxProps} from "@mui/system";
import AuthContainer from "@/components/parts/auth/AuthContainer";
import {AuthFormContainer} from "@/components/parts/auth/AuthFormContainer";

export default function Login({
                                  children,
                              }: {
    children: React.ReactNode
}) {
    const backgroundImageStyle: SxProps = {
        background: `url(${backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right center',
    };
    return (
        <AuthContainer>
            <AuthImage sx={backgroundImageStyle}/>
            <AuthFormContainer>
                {children}
            </AuthFormContainer>
        </AuthContainer>
    )
}