import React from "react";
import {FormContainer, PasswordElement, PasswordRepeatElement, SelectElement} from "react-hook-form-mui";
import Stack from "@mui/material/Stack";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {UserRoleOptions} from "@/components/parts/auth/signup/RegistrationPart";

export function RegistrationPartForm_1(props: {
    onSuccess: (data: any) => any,
}) {
    return <FormContainer onSuccess={props.onSuccess}>
        <Stack
            direction="column"
            spacing={4}

        >
            <Box
                sx={{
                    maxWidth: "100vw",
                }}
            >
                <PasswordElement fullWidth name={"password"} label="Password" type="password" margin="dense" required/>
                <PasswordRepeatElement passwordFieldName={"password"} fullWidth name={"confirm_password"}
                                       label="Password" type="password" margin="dense" required/>

                <SelectElement sx={{
                    width: "100%", mt: {
                        xs: 1, sm: 2,
                    },
                }} name={"role"} label={"Role"} options={UserRoleOptions}
                               fullWidth margin="dense" required/>

            </Box>

            <Button sx={{width: "100%"}} variant="contained" type="submit" fullWidth>
                Sign Up
            </Button>

        </Stack>
    </FormContainer>;
}