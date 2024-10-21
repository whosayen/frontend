import React, { useEffect } from "react";
import {FormContainer, SelectElement, SelectElementProps, TextFieldElement} from "react-hook-form-mui";
import Stack from "@mui/material/Stack";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import CountryComboBox from "@/components/common/CountryComboBox";
import { getAllTimezones } from "@/lib/api";
import { convertToTimezoneOptions } from "@/lib/utils";


export function RegistrationPartForm_2(props: {
    onSuccess: (data: any) => Promise<void>,
}) {
    const [timezoneOptions, setTimezoneOptions] = React.useState<SelectElementProps['options']>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            const timezones = await getAllTimezones();
            const timezone_options = convertToTimezoneOptions(timezones);
            setTimezoneOptions(timezone_options);
        };

        fetchOptions();
    }, []);

    return <>
        <FormContainer onSuccess={props.onSuccess}>
            <Stack direction="column" spacing={4}>
                <Box sx={{maxWidth: "100vw"}}>
                    <TextFieldElement name={'first_name'} label={'First Name'} type={'text'} margin='dense' required
                                      fullWidth/>
                    <TextFieldElement name={'last_name'} label={'Last Name'} type={'text'} margin='dense' required
                                      fullWidth/>

                    <SelectElement sx={{
                        width: "100%",
                        mt: {xs: 1, sm: 2},
                        mb: 2 // Add margin-bottom here
                    }} name={"timezone"} label={"Time Zone"} options={timezoneOptions}
                                   fullWidth margin="dense" required/>

                    <CountryComboBox/>
                </Box>

                <Button sx={{width: "100%"}} variant="contained" type="submit" fullWidth>
                    Sign Up
                </Button>

            </Stack>
        </FormContainer>
    </>;
}