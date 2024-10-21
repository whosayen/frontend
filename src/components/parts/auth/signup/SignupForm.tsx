'use client'

import React, { useState } from 'react'
import Stack from "@mui/material/Stack";
import { AuthFormTitle } from "@/components/parts/auth/AuthFormTitle";
import { CheckboxElement, TextFieldElement, useForm } from "react-hook-form-mui";
import Typography from "@mui/material/Typography";
import { Box, Link, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useCreateOTP } from "@/lib/hooks/useCreateOTP";
import { SignupFormValues } from "@/lib/types/clientTypes";
import ErrorAlertGroup from "@/components/common/error-handling/ErrorAlertGroup";
import { LoadingButton } from "@mui/lab";

const SignupForm = () => {
    const { control, handleSubmit } = useForm<SignupFormValues>();
    const { createOTP, reset, errors, loading } = useCreateOTP();
    const [termsOpen, setTermsOpen] = useState(false);

    const handleTermsOpen = () => {
        setTermsOpen(true);
    };

    const handleTermsClose = () => {
        setTermsOpen(false);
    };

    return (
        <Stack
            direction='column'
            justifyContent="center"
            alignItems="center"
            spacing={4}
        >
            <ErrorAlertGroup messageList={errors} />
            <AuthFormTitle title={"Sign Up"} />
            <form onSubmit={handleSubmit(createOTP)} onChange={reset} noValidate>
                <Stack
                    direction="column"
                    spacing={3}
                >
                    <TextFieldElement
                        control={control}
                        name={'email'}
                        label={'Email'}
                        type={'email'}
                        margin='dense'
                        required
                        fullWidth
                    />
                    <CheckboxElement
                        control={control}
                        name="policy"
                        label={
                            <Typography variant="body2">
                                Creating an account means you are okay with our{' '}
                                <Link component="button" variant="body2" onClick={handleTermsOpen}>
                                    Terms of Service
                                </Link>
                                , Privacy Policy, and default Notification Settings.
                            </Typography>
                        }
                        required
                    />
                    <LoadingButton variant="contained" type="submit" fullWidth loading={loading}>
                        <span>Sign Up</span>
                    </LoadingButton>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1">
                            Already have an account? Login <a href="/auth/login"><span
                                style={{ color: '#148e87' }}>here</span></a>!
                        </Typography>
                    </Box>
                </Stack>
            </form>

            {/* Terms of Service Modal */}
            <Dialog open={termsOpen} onClose={handleTermsClose}>
                <DialogTitle>Terms of Service</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                        {/* Replace this text with your actual terms of service */}
                        Here are the terms and conditions...
                        Bla bla bla
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTermsClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}

export default SignupForm;
