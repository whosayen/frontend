'use client'

import React from 'react'
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {AuthFormTitle} from "@/components/parts/auth/AuthFormTitle";
import ErrorAlertGroup from "@/components/common/error-handling/ErrorAlertGroup";
import {LoginForm} from "@/components/parts/auth/login/LoginForm";
import {useLogin} from "@/lib/hooks/useLogin";

const LoginPart = () => {
    const {errors, login, loading, reset} = useLogin()
    return (
        <Stack
            direction='column'
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <AuthFormTitle title="Login"/>
            <ErrorAlertGroup messageList={errors}/>
            <LoginForm onSubmit={login} loading={loading} onChange={reset}/>
            <Typography variant="body1">
                Don&apos;t have an account? Signup <a href="/auth/signup"><span
                style={{color: '#148e87'}}>here</span></a>!
            </Typography>

        </Stack>
    );
}
export default LoginPart

