// components/RegistrationPart.tsx

'use client';

import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import React from 'react';
import { UserRoleEnum } from '@/lib/enums';
import { AuthFormTitle } from '../AuthFormTitle';
import { RegistrationPartForm_1 } from '@/components/parts/auth/signup/RegistrationPartForm_1';
import { RegistrationPartForm_2 } from '@/components/parts/auth/signup/RegistrationPartForm_2';
import Button from '@mui/material/Button';
import api from '@/lib/apiConfig';
import { LoginResponse } from '@/lib/types/dtoTypes';
import CustomAlert from '@/components/CustomAlert';
import { useAlert } from '@/lib/hooks/useAlert';
import { ApiErrorsResponse } from '@/lib/types/dtoTypes';
import axios from 'axios';

export const UserRoleOptions = [
    {
        id: UserRoleEnum.STUDENT,
        label: 'Student'
    },
    {
        id: UserRoleEnum.TUTOR,
        label: 'Tutor'
    }
];

export default function RegistrationPart() {

    const [page, setPage] = React.useState(0);
    const [data, setData] = React.useState<any>({});
    const { open, message, severity, showAlert, hideAlert } = useAlert();

    const router = useRouter();

    async function sendRequest(data: any) {
        const email = sessionStorage.getItem('email');
        if (email === null) {
            showAlert("Email is null", 'error');
            return;
        }

        try {
            const response = await api.post<LoginResponse>('/users/register', {
                email: email,
                password: data.password,
                confirmPassword: data.confirm_password,
                firstName: data.first_name,
                lastName: data.last_name,
                country: data.country,
                timezone: data.timezone,
                role: data.role,
            });

            if (response.ok) {
                const responseData = response.data;
                sessionStorage.setItem("accessToken", responseData.accessToken);
                localStorage.setItem("refreshToken", responseData.refreshToken);
                sessionStorage.setItem("role", responseData.role);
                sessionStorage.setItem("id", responseData.id);
                showAlert('Registration successful!', 'success');
                // Redirect based on the user role
                if (data.role === UserRoleEnum.TUTOR) {
                    router.push("/tutor-signup");
                } else {
                    router.push("/");
                }
            }
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                const errorResponse = e.response?.data as ApiErrorsResponse;
                if (errorResponse?.errors) {
                    errorResponse.errors.forEach(error => {
                        showAlert(error.message, 'error');
                    });
                }
            } else {
                showAlert("An unexpected error occurred", 'error');
            }
        }
    }

    const handleSubmit = async (secondFormData: any) => {
        await sendRequest({ ...data, ...secondFormData });
    };

    return (
        <>
            <Stack
                direction='column'
                justifyContent="center"
                alignItems="center"
                spacing={3}
            >
                <AuthFormTitle title={"Sign Up"} />

                {page == 0 &&
                    <RegistrationPartForm_1 onSuccess={(formData) => {
                        setData(formData);
                        setPage(1);
                    }} />}
                {page == 1 &&
                    <RegistrationPartForm_2 onSuccess={handleSubmit} />}
                {page == 1 && <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    onClick={() => {
                        if (page == 1) setPage(0);
                    }} fullWidth>
                    Back
                </Button>}
            </Stack>

            <CustomAlert
                open={open}
                message={message}
                severity={severity}
                onClose={hideAlert}
            />
        </>
    );
};
