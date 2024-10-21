'use client'

import {PasswordElement, TextFieldElement, useForm} from "react-hook-form-mui";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import { LoginFormValues } from "@/lib/types/clientTypes";
import {LoadingButton} from "@mui/lab";

type PropTypes = {
    onSubmit: (data: LoginFormValues) => void;
    onChange?: () => void;
    loading: boolean;
}

export function LoginForm(props: PropTypes) {
    const {control, handleSubmit,} = useForm<LoginFormValues>();

    return <form onSubmit={handleSubmit(props.onSubmit)} onChange={props.onChange} noValidate>
        <Stack
            direction="column"
            spacing={4}
        >
            <div>
                <TextFieldElement fullWidth name={"username"} label={"Email"} type={"email"} margin="dense"
                                  required control={control}/>
                <PasswordElement fullWidth name={"password"} label="Password" type="password" margin="dense" required
                                 control={control}/>
            </div>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={0}
            >
                <Typography component={Link} href={"/"}>Forgot password?</Typography>
            </Stack>
            <LoadingButton sx={{borderRadius: 10, fontSize: '15px',}} variant="contained" type="submit"
                           loading={props.loading}>
                Log in
            </LoadingButton>
        </Stack>
    </form>;
}